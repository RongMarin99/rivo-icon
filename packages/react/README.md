# @rivo-icons/react

> Free, open-source SVG icons for React. 46 hand-crafted icons with `currentColor` support, TypeScript types, and tree-shaking.

[![npm](https://img.shields.io/npm/v/@rivo-icons/react?color=6366f1)](https://www.npmjs.com/package/@rivo-icons/react)
[![License: MIT](https://img.shields.io/badge/license-MIT-6366f1)](LICENSE)

## Install

```bash
npm install @rivo-icons/react
# or
pnpm add @rivo-icons/react
# or
yarn add @rivo-icons/react
```

## Usage

```jsx
import { Setting, Dollar, Clock, Plus } from '@rivo-icons/react'

export default function App() {
  return (
    <div>
      <Setting />
      <Dollar size={32} />
      <Clock size={20} color="#6366f1" />
      <Plus className="my-icon" />
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
| `className` | `string` | — | CSS class attribute |

## Links

- [Browse all icons](https://rivo-icon.rongmarin.info/icons)
- [Documentation](https://rivo-icon.rongmarin.info/docs/react)
- [GitHub](https://github.com/RongMarin99/rivo-icon)

## License

MIT
