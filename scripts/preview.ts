/**
 * Generates .github/preview.svg — a grid of all icons for the README.
 * Run: tsx scripts/preview.ts
 */
import { writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { findSvgFiles, readSvg, getIconName, getIconVariant } from './utils.js'

const ICONS_DIR  = join(process.cwd(), 'icons')
const OUT_FILE   = join(process.cwd(), '.github', 'preview.svg')

// Grid settings
const COLS       = 10
const CELL_W     = 72
const CELL_H     = 80
const ICON_SIZE  = 28
const PAD        = 24
const FONT       = 'system-ui, -apple-system, sans-serif'
const LABEL_SIZE = 7.5
const LABEL_Y    = 62   // y offset for text below icon (relative to cell top)

// Replace currentColor with a fixed color so it renders correctly
// in standalone SVG (img tag / GitHub preview)
const ICON_COLOR = '#1e293b'

function colorize(svg: string): string {
  return svg
    .replace(/stroke="currentColor"/g, `stroke="${ICON_COLOR}"`)
    .replace(/fill="currentColor"/g,   `fill="${ICON_COLOR}"`)
}

function extractInner(svg: string): string {
  return svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)?.[1]?.trim() ?? ''
}

interface IconCell {
  name: string
  variant: string
  inner: string
}

async function main() {
  const files = await findSvgFiles(ICONS_DIR)

  // Outline first, then filled
  const sorted = files.sort((a, b) => {
    const va = getIconVariant(a), vb = getIconVariant(b)
    if (va !== vb) return va === 'outline' ? -1 : 1
    return getIconName(a).localeCompare(getIconName(b))
  })

  const cells: IconCell[] = []
  for (const file of sorted) {
    const raw   = await readSvg(file)
    const fixed = colorize(raw)
    cells.push({
      name:    getIconName(file),
      variant: getIconVariant(file),
      inner:   extractInner(fixed),
    })
  }

  const rows     = Math.ceil(cells.length / COLS)
  const gridW    = COLS   * CELL_W
  const gridH    = rows   * CELL_H
  const totalW   = gridW  + PAD * 2
  const totalH   = gridH  + PAD * 2 + 56  // extra for header

  const header = `
  <!-- header -->
  <text x="${totalW / 2}" y="36"
    font-family="${FONT}" font-size="18" font-weight="700"
    fill="#0f172a" text-anchor="middle" letter-spacing="-0.4">✦ Rivo Icons</text>
  <text x="${totalW / 2}" y="54"
    font-family="${FONT}" font-size="11" fill="#64748b" text-anchor="middle">
    ${cells.length} open-source SVG icons for React · Vue · Nuxt · Svelte · Solid
  </text>`

  const iconCells = cells.map((cell, i) => {
    const col  = i % COLS
    const row  = Math.floor(i / COLS)
    const x    = PAD + col * CELL_W
    const y    = PAD + 56 + row * CELL_H

    // Center the icon within the cell
    const iconX = x + (CELL_W - ICON_SIZE) / 2
    const iconY = y + 12

    // Truncate long names
    const label = cell.name.length > 11
      ? cell.name.slice(0, 10) + '…'
      : cell.name

    return `
  <!-- ${cell.name} -->
  <g transform="translate(${iconX}, ${iconY})">
    <svg width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 24 24">
      ${cell.inner}
    </svg>
  </g>
  <text x="${x + CELL_W / 2}" y="${y + LABEL_Y}"
    font-family="${FONT}" font-size="${LABEL_SIZE}" fill="#64748b"
    text-anchor="middle">${label}</text>`
  }).join('')

  // Subtle column/row dividers
  const dividers: string[] = []
  for (let c = 1; c < COLS; c++) {
    const dx = PAD + c * CELL_W
    dividers.push(`<line x1="${dx}" y1="${PAD + 56}" x2="${dx}" y2="${PAD + 56 + gridH}" stroke="#f1f5f9" stroke-width="1"/>`)
  }
  for (let r = 1; r < rows; r++) {
    const dy = PAD + 56 + r * CELL_H
    dividers.push(`<line x1="${PAD}" y1="${dy}" x2="${PAD + gridW}" y2="${dy}" stroke="#f1f5f9" stroke-width="1"/>`)
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg"
  width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">

  <!-- background -->
  <rect width="${totalW}" height="${totalH}" fill="#ffffff" rx="12"/>

  <!-- header divider -->
  <line x1="${PAD}" y1="${PAD + 60}" x2="${PAD + gridW}" y2="${PAD + 60}" stroke="#e2e8f0" stroke-width="1"/>

  <!-- grid border -->
  <rect x="${PAD}" y="${PAD + 56}" width="${gridW}" height="${gridH}"
    fill="none" stroke="#e2e8f0" stroke-width="1" rx="4"/>

${header}

  <!-- grid lines -->
${dividers.join('\n')}

  <!-- icons -->
${iconCells}
</svg>`

  await mkdir(dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, svg, 'utf-8')
  console.log(`Generated ${OUT_FILE}  (${cells.length} icons, ${COLS}×${rows} grid)`)
}

main().catch(err => { console.error(err); process.exit(1) })
