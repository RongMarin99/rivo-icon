# @rivo-icons/vue

> Free, open-source SVG icons for Vue 3. 46 hand-crafted icons with `currentColor` support, TypeScript types, and tree-shaking.

[![npm](https://img.shields.io/npm/v/@rivo-icons/vue?color=42b883)](https://www.npmjs.com/package/@rivo-icons/vue)
[![License: MIT](https://img.shields.io/badge/license-MIT-42b883)](LICENSE)

## Install

```bash
npm install @rivo-icons/vue
# or
pnpm add @rivo-icons/vue
# or
yarn add @rivo-icons/vue
```

## Usage

```vue
<script setup>
import { Setting, Dollar, Clock } from '@rivo-icons/vue'
</script>

<template>
  <Setting />
  <Dollar :size="32" />
  <Clock :size="20" color="#6366f1" />
</template>
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
- [Documentation](https://rivo-icon.rongmarin.info/docs/vue)
- [GitHub](https://github.com/RongMarin99/rivo-icon)

## License

MIT
