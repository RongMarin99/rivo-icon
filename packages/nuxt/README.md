# @rivo-icons/nuxt

> Nuxt module for Rivo Icons. 46 hand-crafted SVG icons auto-imported as global components — no import needed anywhere.

[![npm](https://img.shields.io/npm/v/@rivo-icons/nuxt?color=00dc82)](https://www.npmjs.com/package/@rivo-icons/nuxt)
[![License: MIT](https://img.shields.io/badge/license-MIT-00dc82)](LICENSE)

## Install

```bash
npm install @rivo-icons/nuxt
# or
pnpm add @rivo-icons/nuxt
# or
yarn add @rivo-icons/nuxt
```

## Setup

Add the module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@rivo-icons/nuxt'],
})
```

## Usage

Icons are **auto-imported** as global components. No `import` statement needed:

```vue
<template>
  <IconSetting />
  <IconDollar :size="32" />
  <IconClock :size="20" color="#6366f1" />
</template>
```

All icons are prefixed with `Icon`. Example: `Setting` → `<IconSetting />`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `24` | Width and height in px |
| `color` | `string` | `currentColor` | SVG stroke / fill color |
| `strokeWidth` | `number \| string` | `1.5` | Stroke width (outline icons) |
| `class` | `string` | — | CSS class attribute |

## Links

- [Browse all icons](https://rivo-icon.rongmarin.info/icons)
- [Documentation](https://rivo-icon.rongmarin.info/docs/nuxt)
- [GitHub](https://github.com/RongMarin99/rivo-icon)

## License

MIT
