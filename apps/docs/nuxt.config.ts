// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  modules: ['@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s — Rivo Icons',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'Free, open-source SVG icons for React, Vue, Nuxt, Svelte, and Solid. Fully customizable with currentColor, TypeScript types included.',
        },
        { property: 'og:site_name', content: 'Rivo Icons' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#6366f1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'node-server',
  },
})
