import { optimize } from 'svgo';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { findSvgFiles, readSvg } from './utils.js';

const ICONS_DIR = join(process.cwd(), 'icons');
const TARGET = 24;

const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          convertColors: { currentColor: false },
        },
      },
    },
    { name: 'removeXMLNS' },
    { name: 'sortAttrs' },
  ],
};

// ─── Path endpoint tracer ────────────────────────────────────────────────────

function tracePathEndpoints(d: string): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) ?? [];
  let cx = 0, cy = 0;
  let mx = 0, my = 0;

  for (const token of tokens) {
    const cmd = token[0];
    const nums = (token.slice(1).match(/-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/g) ?? []).map(Number);

    switch (cmd) {
      case 'M': for (let i = 0; i + 1 < nums.length; i += 2) { cx = nums[i]; cy = nums[i + 1]; if (i === 0) { mx = cx; my = cy; } points.push({ x: cx, y: cy }); } break;
      case 'm': for (let i = 0; i + 1 < nums.length; i += 2) { cx += nums[i]; cy += nums[i + 1]; if (i === 0) { mx = cx; my = cy; } points.push({ x: cx, y: cy }); } break;
      case 'L': for (let i = 0; i + 1 < nums.length; i += 2) { cx = nums[i]; cy = nums[i + 1]; points.push({ x: cx, y: cy }); } break;
      case 'l': for (let i = 0; i + 1 < nums.length; i += 2) { cx += nums[i]; cy += nums[i + 1]; points.push({ x: cx, y: cy }); } break;
      case 'H': for (const n of nums) { cx = n; points.push({ x: cx, y: cy }); } break;
      case 'h': for (const n of nums) { cx += n; points.push({ x: cx, y: cy }); } break;
      case 'V': for (const n of nums) { cy = n; points.push({ x: cx, y: cy }); } break;
      case 'v': for (const n of nums) { cy += n; points.push({ x: cx, y: cy }); } break;
      case 'C': for (let i = 0; i + 5 < nums.length; i += 6) { cx = nums[i + 4]; cy = nums[i + 5]; points.push({ x: cx, y: cy }); } break;
      case 'c': for (let i = 0; i + 5 < nums.length; i += 6) { cx += nums[i + 4]; cy += nums[i + 5]; points.push({ x: cx, y: cy }); } break;
      case 'S': for (let i = 0; i + 3 < nums.length; i += 4) { cx = nums[i + 2]; cy = nums[i + 3]; points.push({ x: cx, y: cy }); } break;
      case 's': for (let i = 0; i + 3 < nums.length; i += 4) { cx += nums[i + 2]; cy += nums[i + 3]; points.push({ x: cx, y: cy }); } break;
      case 'Q': for (let i = 0; i + 3 < nums.length; i += 4) { cx = nums[i + 2]; cy = nums[i + 3]; points.push({ x: cx, y: cy }); } break;
      case 'q': for (let i = 0; i + 3 < nums.length; i += 4) { cx += nums[i + 2]; cy += nums[i + 3]; points.push({ x: cx, y: cy }); } break;
      case 'A': for (let i = 0; i + 6 < nums.length; i += 7) { cx = nums[i + 5]; cy = nums[i + 6]; points.push({ x: cx, y: cy }); } break;
      case 'a': for (let i = 0; i + 6 < nums.length; i += 7) { cx += nums[i + 5]; cy += nums[i + 6]; points.push({ x: cx, y: cy }); } break;
      case 'Z': case 'z': cx = mx; cy = my; break;
    }
  }

  return points;
}

function estimateContentBounds(content: string): { x: number; y: number; w: number; h: number } | null {
  const allPoints: Array<{ x: number; y: number }> = [];

  // Circles contribute as bounding-box corner points (no priority — combined with paths)
  for (const cm of content.matchAll(/<circle\b([^>]*)>/g)) {
    const attrs = cm[1];
    const cxm = attrs.match(/\bcx="([\d.]+)"/);
    const cym = attrs.match(/\bcy="([\d.]+)"/);
    const rm  = attrs.match(/\br="([\d.]+)"/);
    if (!cxm || !cym || !rm) continue;
    const cx = +cxm[1], cy = +cym[1], r = +rm[1];
    allPoints.push({ x: cx - r, y: cy - r }, { x: cx + r, y: cy + r });
  }

  // Path endpoints, applying per-element matrix transforms for visual (world-space) positions
  for (const m of content.matchAll(/<path\b[^>]*>/g)) {
    const tag = m[0];
    const dm = tag.match(/\bd="([^"]+)"/);
    if (!dm) continue;

    const localPts = tracePathEndpoints(dm[1]);
    const matrixMatch = tag.match(/\btransform="matrix\(([^)]+)\)"/);

    if (matrixMatch) {
      const nums = matrixMatch[1].trim().split(/[\s,]+/).map(Number);
      if (nums.length === 6) {
        const [a, b, c, d, e, f] = nums;
        for (const p of localPts) {
          allPoints.push({ x: a * p.x + c * p.y + e, y: b * p.x + d * p.y + f });
        }
      }
    } else {
      allPoints.push(...localPts);
    }
  }

  if (allPoints.length === 0) return null;
  const valid = allPoints.filter(p => isFinite(p.x) && isFinite(p.y));
  if (valid.length === 0) return null;
  const xs = valid.map(p => p.x), ys = valid.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const pad = 1.5;
  return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
}

// ─── Bad-normalization fixers ────────────────────────────────────────────────

/**
 * Old pipeline added <g transform="scale(S)"> with S < 0.5.
 * Unwrap it and set the viewBox to the content bounds.
 */
function fixBadNormalization(svg: string): string {
  const scaleMatch = svg.match(/<g\b([^>]*)\btransform="scale\(([0-9]*\.[0-9]+)\)"([^>]*)>([\s\S]*?)<\/g>/i);
  if (!scaleMatch) return svg;

  const S = +scaleMatch[2];
  if (S >= 0.5) return svg;

  const innerContent = scaleMatch[4].trim();
  const bounds = estimateContentBounds(innerContent);
  if (!bounds) return svg;

  // Preserve non-transform group attrs (e.g. stroke="currentColor") without the bad scale
  const groupAttrs = (scaleMatch[1] + scaleMatch[3]).replace(/\s+/g, ' ').trim();
  const wrappedContent = groupAttrs ? `<g ${groupAttrs}>${innerContent}</g>` : innerContent;
  let result = svg.replace(scaleMatch[0], wrappedContent);
  result = result.replace(/\bviewBox="[^"]*"/,
    `viewBox="${+bounds.x.toFixed(3)} ${+bounds.y.toFixed(3)} ${+bounds.w.toFixed(3)} ${+bounds.h.toFixed(3)}"`);
  return result;
}

/**
 * Design tools sometimes export a <g transform="translate(tx ty)scale(S)"> that maps
 * the real 0-24 content far outside the viewport (e.g. translate(-212,-316)scale(18.74)).
 * Detect by checking whether the visual transform result lands outside -10…40, then strip.
 */
function fixGroupTranslateScale(svg: string): string {
  if (!/\bviewBox="0 0 24 24"/.test(svg)) return svg;

  const m = svg.match(
    /<g\b([^>]*)\btransform="translate\(\s*(-?[\d.]+)[,\s]+\s*(-?[\d.]+)\s*\)\s*scale\(\s*([\d.]+)\s*\)"([^>]*)>([\s\S]*?)<\/g>/i
  );
  if (!m) return svg;

  const tx = +m[2], ty = +m[3], S = +m[4];
  const innerContent = m[6].trim();
  const bounds = estimateContentBounds(innerContent);
  if (!bounds) return svg;

  // If visual result is within normal range, the transform is legitimate — leave it
  const visMinX = S * bounds.x + tx;
  const visMinY = S * bounds.y + ty;
  const visMaxX = S * (bounds.x + bounds.w) + tx;
  const visMaxY = S * (bounds.y + bounds.h) + ty;
  if (visMinX > -10 && visMinY > -10 && visMaxX < 40 && visMaxY < 40) return svg;

  // Strip the bogus transform; preserve any other group attrs
  const groupAttrs = (m[1] + m[5]).replace(/\s+/g, ' ').trim();
  const wrapped = groupAttrs ? `<g ${groupAttrs}>${innerContent}</g>` : innerContent;
  return svg.replace(m[0], wrapped);
}

/**
 * SVGO sometimes bakes a scale transform into individual element coordinates,
 * leaving behind a tiny stroke-width (e.g. stroke-width=".231" = 1 × 0.23077).
 * Detect this, compute the icon frame, and set the viewBox to scale everything back up.
 */
function fixBakedScaleCoordinates(svg: string): string {
  const swMatch = svg.match(/\bstroke-width="([0-9]*\.[0-9]+)"/);
  if (!swMatch) return svg;

  const sw = +swMatch[1];
  if (sw >= 0.3) return svg;

  const bounds = estimateContentBounds(svg);
  if (!bounds) return svg;

  // Original icon was 24×24 px; the baked frame size = 24 × sw
  const frameSize = 24 * sw;
  const centerX = bounds.x + bounds.w / 2;
  const centerY = bounds.y + bounds.h / 2;
  const vx = centerX - frameSize / 2;
  const vy = centerY - frameSize / 2;

  return svg.replace(/\bviewBox="[^"]*"/,
    `viewBox="${+vx.toFixed(3)} ${+vy.toFixed(3)} ${+frameSize.toFixed(3)} ${+frameSize.toFixed(3)}"`);
}

/**
 * After SVGO bakes element-level transforms, content may land outside the
 * 0-24 viewport (coords > 24) or be extremely tiny (fill-only icon baked at
 * ~0.23077 scale with no stroke-width to detect it).
 * Sets viewBox to content bounds so normalizeViewBox can scale to 24×24.
 */
function fixContentFit(svg: string): string {
  if (!/\bviewBox="0 0 24 24"/.test(svg)) return svg;

  // If a group has a transform, its children are in local space — bounds would
  // be wrong (e.g. a circle at cx=52,cy=52 inside a scale group). Skip; the
  // wrapper normalizeViewBox produces will be handled by SVGO on the next run.
  if (/<g\b[^>]*\btransform="[^"]*"/.test(svg)) return svg;

  const bounds = estimateContentBounds(svg);
  if (!bounds) return svg;

  // Strip pad to get raw content extent for threshold check (pad is 1.5 on each side)
  const cMinX = bounds.x + 1.5, cMinY = bounds.y + 1.5;
  const cMaxX = bounds.x + bounds.w - 1.5, cMaxY = bounds.y + bounds.h - 1.5;

  // Content outside viewport (allow 2px tolerance; use padded bounds for the new viewBox)
  if (cMinX < -2 || cMinY < -2 || cMaxX > 26 || cMaxY > 26) {
    return svg.replace(/\bviewBox="[^"]*"/,
      `viewBox="${+bounds.x.toFixed(3)} ${+bounds.y.toFixed(3)} ${+bounds.w.toFixed(3)} ${+bounds.h.toFixed(3)}"`);
  }

  // Tiny fill-only content (baked scale=0.23077, no stroke-width marker)
  // contentW/H = bounds minus the 1.5px pad applied on each side
  const contentW = bounds.w - 3;
  const contentH = bounds.h - 3;
  if (contentW < 5 && contentH < 5) {
    const frameSize = 5.544; // 24 × 0.23077
    const centerX = bounds.x + bounds.w / 2;
    const centerY = bounds.y + bounds.h / 2;
    const vx = centerX - frameSize / 2;
    const vy = centerY - frameSize / 2;
    return svg.replace(/\bviewBox="[^"]*"/,
      `viewBox="${+vx.toFixed(3)} ${+vy.toFixed(3)} ${+frameSize.toFixed(3)} ${+frameSize.toFixed(3)}"`);
  }

  return svg;
}

// ─── Design-tool artifact cleaner ───────────────────────────────────────────

/**
 * Design tools add a white background rect that marks the actual icon frame
 * (e.g. a 24×24 rect at position 40,40 inside a 104×104 canvas).
 * Read its bounds BEFORE removing it so we can set the correct viewBox.
 */
function detectContentFrame(svg: string): { x: number; y: number; w: number; h: number } | null {
  const bgMatch = svg.match(/<(?:path|rect)\b([^>]*)fill="(?:#[Ff]{3,6}|white)"([^>]*)\/>/);
  if (!bgMatch) return null;
  const elAttrs = bgMatch[1] + bgMatch[2];

  // <rect x y width height>
  const xm = elAttrs.match(/\bx="([\d.]+)"/);
  const ym = elAttrs.match(/\by="([\d.]+)"/);
  const wm = elAttrs.match(/\bwidth="([\d.]+)"/);
  const hm = elAttrs.match(/\bheight="([\d.]+)"/);
  if (xm && ym && wm && hm) {
    return { x: +xm[1], y: +ym[1], w: +wm[1], h: +hm[1] };
  }

  // <path d="M{mx} {my}a{cr}...h{iw}...v{ih}"> (rounded-rect path)
  const dAttr = elAttrs.match(/\bd="([^"]+)"/);
  if (dAttr) {
    const d = dAttr[1];
    const mCoords = d.match(/^M\s*([\d.]+)\s+([\d.]+)/);
    const arcRx = d.match(/a([\d.]+)/);
    const hCmd = d.match(/h([\d.]+)/);
    const vCmd = d.match(/v([\d.]+)/);
    if (mCoords && hCmd && vCmd) {
      const mx = +mCoords[1], my = +mCoords[2], cr = arcRx ? +arcRx[1] : 0;
      return { x: mx, y: my - cr, w: +hCmd[1] + 2 * cr, h: +vCmd[1] + 2 * cr };
    }
  }

  return null;
}

function cleanDesignToolArtifacts(svg: string): string {
  let result = svg;

  // Detect content frame BEFORE removing the background element
  const frame = detectContentFrame(result);
  if (frame) {
    result = result.replace(/\bviewBox="[^"]*"/, `viewBox="${frame.x} ${frame.y} ${frame.w} ${frame.h}"`);
  }

  // Remove background elements (white fill)
  result = result.replace(/<(?:path|rect)\b[^>]*\bfill="(?:#[Ff]{3,6}|white)"[^>]*\/>/g, '');
  // Remove shadow/overlay elements (fill-opacity attribute)
  result = result.replace(/<(?:path|rect)\b[^>]*\bfill-opacity="[^"]*"[^>]*\/>/g, '');
  // Replace ALL remaining hardcoded hex fills/strokes with currentColor
  result = result.replace(/\bfill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"');
  result = result.replace(/\bstroke="#[0-9a-fA-F]{3,6}"/g, 'stroke="currentColor"');
  result = result.replace(/\bfill="black"/gi, 'fill="currentColor"');
  result = result.replace(/\bstroke="black"/gi, 'stroke="currentColor"');
  // Remove leftover empty <g> wrappers
  result = result.replace(/<g[^>]*>\s*<\/g>/g, '');

  return result;
}

// ─── ViewBox normalizer ──────────────────────────────────────────────────────

function normalizeViewBox(svg: string): string {
  const vbMatch = svg.match(/viewBox="([^"]+)"/);
  if (!vbMatch) return svg;

  const parts = vbMatch[1].trim().split(/\s+/).map(Number);
  if (parts.length < 4) return svg;
  const [vx, vy, vw, vh] = parts;

  const firstClose = svg.indexOf('>');
  const lastOpen = svg.lastIndexOf('</svg>');
  if (firstClose < 0 || lastOpen < 0) return svg;

  const openTag = svg.slice(0, firstClose + 1);
  const inner = svg.slice(firstClose + 1, lastOpen).trim();
  const closeTag = svg.slice(lastOpen);

  function applyRootAttrs(tag: string): string {
    return tag
      .replace(/viewBox="[^"]*"/, `viewBox="0 0 ${TARGET} ${TARGET}"`)
      .replace(/\bwidth="[^"]*"/, `width="${TARGET}"`)
      .replace(/\bheight="[^"]*"/, `height="${TARGET}"`);
  }

  // Already 24×24 at origin — just fix attrs
  if (Math.abs(vx) < 0.5 && Math.abs(vy) < 0.5 && Math.abs(vw - TARGET) < 0.5 && Math.abs(vh - TARGET) < 0.5) {
    return applyRootAttrs(openTag) + inner + closeTag;
  }

  // 24×24 but non-zero origin (from frame detection) — translate content to 0,0
  if (Math.abs(vw - TARGET) < 0.5 && Math.abs(vh - TARGET) < 0.5) {
    const wrapped = `<g transform="translate(${-vx},${-vy})">${inner}</g>`;
    return applyRootAttrs(openTag) + wrapped + closeTag;
  }

  // Different canvas size — scale to fit 24×24
  const scale = Math.min(TARGET / vw, TARGET / vh);
  const tx = (TARGET - vw * scale) / 2 - vx * scale;
  const ty = (TARGET - vh * scale) / 2 - vy * scale;

  const tParts: string[] = [];
  if (Math.abs(tx) > 0.01 || Math.abs(ty) > 0.01) {
    tParts.push(`translate(${+tx.toFixed(3)},${+ty.toFixed(3)})`);
  }
  tParts.push(`scale(${+scale.toFixed(5)})`);

  const wrapped = `<g transform="${tParts.join(' ')}">${inner}</g>`;
  return applyRootAttrs(openTag) + wrapped + closeTag;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function optimizeIcons(): Promise<void> {
  const files = await findSvgFiles(ICONS_DIR);

  if (files.length === 0) {
    console.log('No SVG files found in icons/');
    return;
  }

  let normalized = 0;

  for (const file of files) {
    const raw = await readSvg(file);

    // Clean artifacts, fix known bad patterns, detect misplaced/tiny content.
    // All fixes run PRE-SVGO so the single SVGO pass bakes the resulting
    // translate+scale wrapper into path coordinates — idempotent on next run.
    let svg = cleanDesignToolArtifacts(raw);
    svg = fixBadNormalization(svg);
    svg = fixGroupTranslateScale(svg);
    svg = fixBakedScaleCoordinates(svg);
    svg = fixContentFit(svg);
    const beforeNorm = svg;
    svg = normalizeViewBox(svg);
    if (svg !== beforeNorm) normalized++;

    const svgoResult = optimize(svg, { ...svgoConfig, path: file });
    await writeFile(file, svgoResult.data, 'utf-8');
  }

  console.log(`Optimized ${files.length} icon(s)${normalized > 0 ? `, auto-normalized ${normalized} to ${TARGET}×${TARGET}` : ''}.`);
}

optimizeIcons().catch((err) => {
  console.error(err);
  process.exit(1);
});
