import { join } from 'path';
import { findSvgFiles, readSvg, extractSvgViewBox, getSvgAttributes, getIconName, getIconVariant } from './utils.js';

const ICONS_DIR = join(process.cwd(), 'icons');
const EXPECTED_VIEWBOX = '0 0 24 24';
const HARDCODED_COLOR = /^(black|white|#[0-9a-fA-F]{3,6}|rgb\(|hsl\()/.source;
const HARDCODED_COLOR_RE = new RegExp(HARDCODED_COLOR);

interface ValidationError {
  file: string;
  variant: string;
  errors: string[];
}

function extractChildAttrs(svgContent: string): Array<Record<string, string>> {
  const results: Array<Record<string, string>> = [];
  const elementRe = /<(path|circle|rect|line|polyline|polygon|ellipse|g)\s([^>]*?)(?:\/>|>)/gi;
  const attrRe = /([\w-]+)="([^"]*)"/g;
  let el: RegExpExecArray | null;
  while ((el = elementRe.exec(svgContent)) !== null) {
    const attrs: Record<string, string> = { _tag: el[1] };
    let a: RegExpExecArray | null;
    while ((a = attrRe.exec(el[2])) !== null) {
      attrs[a[1]] = a[2];
    }
    results.push(attrs);
  }
  return results;
}

async function validate(): Promise<void> {
  const files = await findSvgFiles(ICONS_DIR);

  if (files.length === 0) {
    console.log('No SVG files found in icons/');
    return;
  }

  const failures: ValidationError[] = [];

  for (const file of files) {
    const content = await readSvg(file);
    const errors: string[] = [];
    const name = getIconName(file);
    const variant = getIconVariant(file);

    // — viewBox
    const viewBox = extractSvgViewBox(content);
    if (viewBox !== EXPECTED_VIEWBOX) {
      errors.push(
        `viewBox must be "${EXPECTED_VIEWBOX}", got "${viewBox}" — set your design tool frame to 24×24 px`,
      );
    }

    // — root <svg> attrs
    const rootAttrs = getSvgAttributes(content);
    if (rootAttrs['fill'] && rootAttrs['fill'] !== 'none') {
      errors.push(`root <svg> fill must be "none", got "${rootAttrs['fill']}"`);
    }

    // — child element attrs
    const children = extractChildAttrs(content);

    for (const attrs of children) {
      const tag = attrs['_tag'] ?? 'element';

      // hardcoded fill color
      const fill = attrs['fill'];
      if (fill && fill !== 'none' && fill !== 'currentColor' && HARDCODED_COLOR_RE.test(fill)) {
        errors.push(
          `<${tag}> fill="${fill}" is a hardcoded color — use "currentColor" or "none"`,
        );
      }

      // hardcoded stroke color
      const stroke = attrs['stroke'];
      if (stroke && stroke !== 'none' && stroke !== 'currentColor' && HARDCODED_COLOR_RE.test(stroke)) {
        errors.push(
          `<${tag}> stroke="${stroke}" is a hardcoded color — use "currentColor"`,
        );
      }

      // filled-specific: paths must use currentColor, not hardcoded
      if (variant === 'filled') {
        if (fill && fill !== 'none' && fill !== 'currentColor') {
          errors.push(
            `<${tag}> fill="${fill}" in filled/ icon — use fill="currentColor" so color prop works`,
          );
        }
      }
    }

    if (errors.length > 0) {
      failures.push({ file: name, variant, errors });
    }
  }

  if (failures.length > 0) {
    console.error(`\nValidation failed for ${failures.length} icon(s):\n`);
    for (const { file, variant, errors } of failures) {
      console.error(`  ${file} (${variant}):`);
      for (const err of errors) {
        console.error(`    ✗ ${err}`);
      }
    }
    console.error('');
    process.exit(1);
  }

  console.log(`Validated ${files.length} icon(s) — all passed.`);
}

validate().catch((err) => {
  console.error(err);
  process.exit(1);
});
