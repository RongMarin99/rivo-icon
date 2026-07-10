# @rivo-icons/solid

> Free, open-source SVG icons for Solid.js. 46 hand-crafted icons with `currentColor` support, TypeScript types, and tree-shaking.

[![npm](https://img.shields.io/npm/v/@rivo-icons/solid?color=4388d6)](https://www.npmjs.com/package/@rivo-icons/solid)
[![License: MIT](https://img.shields.io/badge/license-MIT-4388d6)](LICENSE)

## Install

```bash
npm install @rivo-icons/solid
# or
pnpm add @rivo-icons/solid
# or
yarn add @rivo-icons/solid
```

## Usage

```jsx
import { Setting, Dollar, Clock } from '@rivo-icons/solid'

export default function App() {
  return (
    <div>
      <Setting />
      <Dollar size={32} />
      <Clock size={20} color="#6366f1" />
    </div>
  )
}
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
- [Documentation](https://rivo-icon.rongmarin.info/docs/solid)
- [GitHub](https://github.com/RongMarin99/rivo-icon)

## License

MIT
