# @rivo-icons/svelte

> Free, open-source SVG icons for Svelte and SvelteKit. 46 hand-crafted icons with `currentColor` support and TypeScript types.

[![npm](https://img.shields.io/npm/v/@rivo-icons/svelte?color=ff3e00)](https://www.npmjs.com/package/@rivo-icons/svelte)
[![License: MIT](https://img.shields.io/badge/license-MIT-ff3e00)](LICENSE)

## Install

```bash
npm install @rivo-icons/svelte
# or
pnpm add @rivo-icons/svelte
# or
yarn add @rivo-icons/svelte
```

## Usage

```svelte
<script>
  import { Setting, Dollar, Clock } from '@rivo-icons/svelte'
</script>

<Setting size={24} />
<Dollar size={32} />
<Clock size={20} color="#6366f1" />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `24` | Width and height in px |
| `color` | `string` | `currentColor` | SVG stroke / fill color |
| `strokeWidth` | `number \| string` | `1.5` | Stroke width (outline icons) |
| `class` | `string` | — | CSS class attribute |

## Links

- [Browse all icons](https://rivo-icon.rongmarin.info/icons)
- [Documentation](https://rivo-icon.rongmarin.info/docs/svelte)
- [GitHub](https://github.com/RongMarin99/rivo-icon)

## License

MIT
