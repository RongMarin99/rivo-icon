<script setup lang="ts">
definePageMeta({ layout: 'docs' })

useSeoMeta({
  title: 'Getting Started',
  description: 'Install and use Rivo Icons in React, Vue, Nuxt, Svelte, or Solid in minutes.',
  ogTitle: 'Getting Started — Rivo Icons',
  ogDescription: 'Install and use Rivo Icons in React, Vue, Nuxt, Svelte, or Solid in minutes.',
})

const CLOSE_SCRIPT = '</' + 'script>'
const copied = ref(null as string | null)

async function copy(id: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = id
    setTimeout(() => { copied.value = null }, 1800)
  } catch {}
}
</script>

<template>
  <div class="prose">
    <span class="badge" style="margin-bottom: 12px">Getting Started</span>
    <h1>Introduction</h1>
    <p>
      Rivo Icons is a collection of free, open-source SVG icons designed for modern web apps.
      Every icon is hand-crafted to a 24×24px canvas with a consistent 1.5px stroke weight.
    </p>
    <p>
      Icons use <code>currentColor</code> for both fill and stroke, so they adapt automatically
      to your text color. All packages include TypeScript type definitions.
    </p>

    <hr />

    <h2>React</h2>
    <h3>Install</h3>
    <div class="code-block">
      <pre><code>npm install @rivo-icons/react</code></pre>
      <button class="copy-btn" :class="{ success: copied === 'react-install' }" @click="copy('react-install', 'npm install @rivo-icons/react')">
        {{ copied === 'react-install' ? '✓' : 'Copy' }}
      </button>
    </div>

    <h3>Usage</h3>
    <div class="code-block">
      <pre><code>import { Setting, Dollar, Clock } from '@rivo-icons/react'

export default function App() {
  return (
    &lt;div&gt;
      &lt;Setting size={24} /&gt;
      &lt;Dollar size={20} color="green" /&gt;
    &lt;/div&gt;
  )
}</code></pre>
    </div>

    <hr />

    <h2>Vue</h2>
    <h3>Install</h3>
    <div class="code-block">
      <pre><code>npm install @rivo-icons/vue</code></pre>
      <button class="copy-btn" :class="{ success: copied === 'vue-install' }" @click="copy('vue-install', 'npm install @rivo-icons/vue')">
        {{ copied === 'vue-install' ? '✓' : 'Copy' }}
      </button>
    </div>

    <h3>Usage</h3>
    <div class="code-block">
      <pre><code>&lt;script setup&gt;
import { Setting, Dollar } from '@rivo-icons/vue'
{{ CLOSE_SCRIPT }}

&lt;template&gt;
  &lt;Setting :size="24" /&gt;
  &lt;Dollar :size="20" color="green" /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <hr />

    <h2>Nuxt</h2>
    <h3>Install</h3>
    <div class="code-block">
      <pre><code>npm install @rivo-icons/nuxt</code></pre>
      <button class="copy-btn" :class="{ success: copied === 'nuxt-install' }" @click="copy('nuxt-install', 'npm install @rivo-icons/nuxt')">
        {{ copied === 'nuxt-install' ? '✓' : 'Copy' }}
      </button>
    </div>

    <h3>nuxt.config.ts</h3>
    <div class="code-block">
      <pre><code>export default defineNuxtConfig({
  modules: ['@rivo-icons/nuxt'],
})</code></pre>
    </div>

    <h3>Usage</h3>
    <p>Icons are <strong>auto-imported</strong> — no import statement needed:</p>
    <div class="code-block">
      <pre><code>&lt;template&gt;
  &lt;IconSetting /&gt;
  &lt;IconDollar /&gt;
&lt;/template&gt;</code></pre>
    </div>

    <hr />

    <h2>Svelte</h2>
    <h3>Install</h3>
    <div class="code-block">
      <pre><code>npm install @rivo-icons/svelte</code></pre>
    </div>

    <h3>Usage</h3>
    <div class="code-block">
      <pre><code>&lt;script&gt;
  import { Setting } from '@rivo-icons/svelte'
&lt;/script&gt;

&lt;Setting size={24} /&gt;</code></pre>
    </div>

    <hr />

    <h2>Solid</h2>
    <h3>Install</h3>
    <div class="code-block">
      <pre><code>npm install @rivo-icons/solid</code></pre>
    </div>

    <h3>Usage</h3>
    <div class="code-block">
      <pre><code>import { Setting } from '@rivo-icons/solid'

export default function App() {
  return &lt;Setting size={24} /&gt;
}</code></pre>
    </div>

    <hr />

    <h2>Icon Props</h2>
    <p>All icons across every framework accept the same props:</p>

    <table class="props-table">
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>size</code></td><td><code>number | string</code></td><td><code>24</code></td><td>Width and height in px</td></tr>
        <tr><td><code>color</code></td><td><code>string</code></td><td><code>currentColor</code></td><td>SVG stroke / fill color</td></tr>
        <tr><td><code>strokeWidth</code></td><td><code>number | string</code></td><td><code>1.5</code></td><td>Stroke width (outline icons)</td></tr>
        <tr><td><code>className</code></td><td><code>string</code></td><td>—</td><td>CSS class (React / Solid)</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>Raw SVG</h2>
    <p>You can always use the raw SVG directly. Download icons or copy SVG code from the <NuxtLink to="/icons">Icon Browser</NuxtLink>.</p>
  </div>
</template>

<style scoped>
.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin: 16px 0;
}
.props-table th, .props-table td {
  padding: 10px 14px;
  border: 1px solid var(--border);
  text-align: left;
}
.props-table th {
  background: var(--bg-soft);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-3);
}
.props-table td { color: var(--text-2); }
.props-table td code { background: var(--bg-muted); padding: 1px 5px; border-radius: 3px; font-size: 12px; color: var(--text); }
</style>
