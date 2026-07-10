import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import {
  findSvgFiles,
  readSvg,
  extractSvgInner,
  toPascalCase,
  getIconName,
  getIconVariant,
  svgInnerToJsx,
} from './utils.js';

const ICONS_DIR = join(process.cwd(), 'icons');
const ROOT = process.cwd();

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

function generateReactComponent(pascalName: string, jsxInner: string): string {
  return `import { createIcon } from '../createIcon.js';

export const ${pascalName} = createIcon(
  <>${jsxInner}</>,
  '${pascalName}',
);
`;
}

function generateVueComponent(pascalName: string, svgInner: string): string {
  return `import { createIcon } from '../createIcon.js';

export const ${pascalName} = createIcon(
  ${JSON.stringify(svgInner)},
  '${pascalName}',
);
`;
}

function generateSolidComponent(pascalName: string, svgInner: string): string {
  return `import { createIcon } from '../createIcon.js';

export const ${pascalName} = createIcon(
  ${JSON.stringify(svgInner)},
  '${pascalName}',
);
`;
}

function generateSvelteComponent(svgInner: string): string {
  return `<script lang="ts">
  export let size: number | string = 24;
  export let color: string = 'currentColor';
  export let strokeWidth: number | string = 2;
  let className: string = '';
  export { className as class };
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
>
  {@html ${JSON.stringify(svgInner)}}
</svg>
`;
}

async function generate(): Promise<void> {
  const files = await findSvgFiles(ICONS_DIR);

  if (files.length === 0) {
    console.log('No SVG files found in icons/ — nothing to generate.');
    return;
  }

  const reactDir = join(ROOT, 'packages/react/src/icons');
  const vueDir = join(ROOT, 'packages/vue/src/icons');
  const solidDir = join(ROOT, 'packages/solid/src/icons');
  const svelteDir = join(ROOT, 'packages/svelte/src');

  await Promise.all([
    ensureDir(reactDir),
    ensureDir(vueDir),
    ensureDir(solidDir),
    ensureDir(svelteDir),
  ]);

  const seen = new Set<string>();
  const metadata: Array<{ name: string; kebabName: string; variant: string; svg: string }> = [];

  for (const file of files) {
    const raw = await readSvg(file);
    const name = getIconName(file);
    const variant = getIconVariant(file);
    const baseName = toPascalCase(name);
    const suffix = variant === 'filled' ? 'Filled' : variant === 'brand' ? 'Brand' : '';
    const pascalName = `${baseName}${suffix}`;

    if (seen.has(pascalName)) continue;
    seen.add(pascalName);

    const svgInner = extractSvgInner(raw);
    const jsxInner = svgInnerToJsx(svgInner);

    metadata.push({ name: pascalName, kebabName: name, variant, svg: raw.trim() });

    await Promise.all([
      writeFile(join(reactDir, `${pascalName}.tsx`), generateReactComponent(pascalName, jsxInner), 'utf-8'),
      writeFile(join(vueDir, `${pascalName}.ts`), generateVueComponent(pascalName, svgInner), 'utf-8'),
      writeFile(join(solidDir, `${pascalName}.tsx`), generateSolidComponent(pascalName, svgInner), 'utf-8'),
      writeFile(join(svelteDir, `${pascalName}.svelte`), generateSvelteComponent(svgInner), 'utf-8'),
    ]);
  }

  const iconNames = [...seen];
  const exports = iconNames.map((n) => `export { ${n} } from './icons/${n}.js';`).join('\n');
  const docsPublicDir = join(ROOT, 'apps/docs/public');

  await Promise.all([
    writeFile(
      join(ROOT, 'packages/react/src/index.ts'),
      `export { createIcon } from './createIcon.js';\nexport type { IconProps } from '@rivo-icons/shared';\n\n${exports}\n`,
      'utf-8',
    ),
    writeFile(
      join(ROOT, 'packages/vue/src/index.ts'),
      `export { createIcon } from './createIcon.js';\nexport type { IconProps } from '@rivo-icons/shared';\n\n${exports}\n`,
      'utf-8',
    ),
    writeFile(
      join(ROOT, 'packages/solid/src/index.ts'),
      `export { createIcon } from './createIcon.js';\nexport type { IconProps } from '@rivo-icons/shared';\n\n${exports}\n`,
      'utf-8',
    ),
    writeFile(
      join(ROOT, 'packages/svelte/src/index.ts'),
      `export type { IconProps } from '@rivo-icons/shared';\n\n${iconNames.map((n) => `export { default as ${n} } from './${n}.svelte';`).join('\n')}\n`,
      'utf-8',
    ),
    ensureDir(docsPublicDir).then(() =>
      writeFile(join(docsPublicDir, 'icons.json'), JSON.stringify(metadata, null, 2), 'utf-8'),
    ),
  ]);

  console.log(`Generated ${iconNames.length} icon(s) for React, Vue, Solid, Svelte.`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
