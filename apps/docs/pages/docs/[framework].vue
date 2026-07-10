<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const framework = computed(() => (route.params.framework as string).toLowerCase())

const CLOSE_SCRIPT = '</' + 'script>'

interface FrameworkDoc {
  name: string
  pkg: string
  color: string
  install: string
  config?: string
  configLang?: string
  usage: string
  importStyle: string
  autoImport?: boolean
}

const docs: Record<string, FrameworkDoc> = {
  react: {
    name: 'React',
    pkg: '@rivo-icons/react',
    color: '#61dafb',
    install: 'npm install @rivo-icons/react',
    usage: `import { Setting, Dollar, Clock, Plus } from '@rivo-icons/react'

export default function App() {
  return (
    <div>
      {/* Default size: 24px */}
      <Setting />

      {/* Custom size */}
      <Dollar size={32} />

      {/* Custom color */}
      <Clock size={20} color="#6366f1" />

      {/* CSS class */}
      <Plus className="my-icon" />
    </div>
  )
}`,
    importStyle: "import { IconName } from '@rivo-icons/react'",
  },
  vue: {
    name: 'Vue',
    pkg: '@rivo-icons/vue',
    color: '#42b883',
    install: 'npm install @rivo-icons/vue',
    usage: `<script setup>
import { Setting, Dollar, Clock } from '@rivo-icons/vue'
${CLOSE_SCRIPT}

<template>
  <!-- Default size: 24px -->
  <Setting />

  <!-- Custom size -->
  <Dollar :size="32" />

  <!-- Custom color -->
  <Clock :size="20" color="#6366f1" />
</template>`,
    importStyle: "import { IconName } from '@rivo-icons/vue'",
  },
  nuxt: {
    name: 'Nuxt',
    pkg: '@rivo-icons/nuxt',
    color: '#00dc82',
    install: 'npm install @rivo-icons/nuxt',
    config: `// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@rivo-icons/nuxt'],
})`,
    configLang: 'ts',
    usage: `<!-- No import needed — all icons are auto-imported -->
<template>
  <IconSetting />
  <IconDollar :size="32" />
  <IconClock :size="20" color="#6366f1" />
</template>`,
    importStyle: '<!-- prefix: Icon + PascalCaseName -->',
    autoImport: true,
  },
  svelte: {
    name: 'Svelte',
    pkg: '@rivo-icons/svelte',
    color: '#ff3e00',
    install: 'npm install @rivo-icons/svelte',
    usage: '<script>\n  import { Setting, Dollar, Clock } from \'@rivo-icons/svelte\'\n<' + '/script>\n\n<Setting size={24} />\n\n<Dollar size={32} />\n\n<Clock size={20} color="#6366f1" />',
    importStyle: "import { IconName } from '@rivo-icons/svelte'",
  },
  solid: {
    name: 'Solid',
    pkg: '@rivo-icons/solid',
    color: '#4388d6',
    install: 'npm install @rivo-icons/solid',
    usage: `import { Setting, Dollar, Clock } from '@rivo-icons/solid'

export default function App() {
  return (
    <div>
      <Setting />
      <Dollar size={32} />
      <Clock size={20} color="#6366f1" />
    </div>
  )
}`,
    importStyle: "import { IconName } from '@rivo-icons/solid'",
  },
}

const doc = computed(() => docs[framework.value])

useSeoMeta({
  title: computed(() => doc.value ? `${doc.value.name} — Rivo Icons` : 'Rivo Icons'),
  description: computed(() => doc.value ? `How to use Rivo Icons with ${doc.value.name}.` : ''),
})

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
  <div v-if="doc" class="prose">
    <div class="fw-header">
      <span class="fw-dot" :style="{ background: doc.color }" />
      <span class="badge">{{ doc.name }}</span>
    </div>

    <h1>{{ doc.name }}</h1>
    <p>Use Rivo Icons in your {{ doc.name }} project with <code>{{ doc.pkg }}</code>.</p>

    <hr />

    <h2>Installation</h2>
    <div class="code-block">
      <pre><code>{{ doc.install }}</code></pre>
      <button class="copy-btn" :class="{ success: copied === 'install' }" @click="copy('install', doc.install)">
        {{ copied === 'install' ? '✓' : 'Copy' }}
      </button>
    </div>

    <template v-if="doc.config">
      <h2>Configuration</h2>
      <div class="code-block">
        <pre><code>{{ doc.config }}</code></pre>
      </div>
    </template>

    <h2>Usage</h2>
    <template v-if="doc.autoImport">
      <p>
        The Nuxt module <strong>auto-imports all icons</strong> as global components.
        No <code>import</code> statement is needed anywhere.
        Icons are prefixed with <code>Icon</code>:
        e.g. <code>Setting</code> → <code>&lt;IconSetting /&gt;</code>.
      </p>
    </template>
    <template v-else>
      <p>Import individual icons by name — only what you use gets bundled:</p>
      <div class="code-block">
        <pre><code>{{ doc.importStyle }}</code></pre>
      </div>
    </template>

    <div class="code-block" style="margin-top: 12px">
      <pre><code>{{ doc.usage }}</code></pre>
      <button class="copy-btn" :class="{ success: copied === 'usage' }" @click="copy('usage', doc.usage)">
        {{ copied === 'usage' ? '✓' : 'Copy' }}
      </button>
    </div>

    <hr />

    <h2>Props</h2>
    <table class="props-table">
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>size</code></td><td><code>number | string</code></td><td><code>24</code></td><td>Width and height in px</td></tr>
        <tr><td><code>color</code></td><td><code>string</code></td><td><code>currentColor</code></td><td>Stroke / fill color</td></tr>
        <tr><td><code>strokeWidth</code></td><td><code>number | string</code></td><td><code>1.5</code></td><td>Stroke width (outline icons)</td></tr>
        <tr v-if="framework === 'react' || framework === 'solid'"><td><code>className</code></td><td><code>string</code></td><td>—</td><td>CSS class attribute</td></tr>
        <tr v-if="framework === 'vue' || framework === 'nuxt'"><td><code>class</code></td><td><code>string</code></td><td>—</td><td>CSS class attribute</td></tr>
      </tbody>
    </table>

    <hr />

    <h2>TypeScript</h2>
    <p>All props are fully typed. Icon components extend a shared <code>IconProps</code> interface:</p>
    <div class="code-block">
      <pre><code>interface IconProps {
  size?: number | string
  color?: string
  strokeWidth?: number | string
  className?: string  // React / Solid
}</code></pre>
    </div>

    <hr />

    <div class="next-links">
      <NuxtLink to="/icons" class="btn btn-primary">Browse All Icons →</NuxtLink>
      <NuxtLink to="/docs/getting-started" class="btn btn-outline">Back to Getting Started</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.fw-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.fw-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

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
.props-table td code {
  background: var(--bg-muted);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 12px;
  color: var(--text);
}

.next-links { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
</style>
