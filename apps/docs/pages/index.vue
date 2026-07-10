<script setup lang="ts">
interface IconEntry {
  name: string
  kebabName: string
  variant: 'outline' | 'filled' | 'brand'
  svg: string
}

type Framework = 'react' | 'vue' | 'nuxt' | 'svelte' | 'solid' | 'svg'
type Tab = 'all' | 'outline' | 'filled' | 'brand'

const VARIANT_TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'outline', label: 'Outline' },
  { key: 'filled', label: 'Filled' },
  { key: 'brands', label: 'Brands' },
]

const FRAMEWORKS: { key: Framework; label: string }[] = [
  { key: 'react', label: 'React' },
  { key: 'vue', label: 'Vue' },
  { key: 'nuxt', label: 'Nuxt' },
  { key: 'svelte', label: 'Svelte' },
  { key: 'solid', label: 'Solid' },
  { key: 'svg', label: 'SVG' },
]

const CLOSE_SCRIPT = '</' + 'script>'

const iconsRaw = await import('../public/icons.json')
const icons = ref(iconsRaw.default as IconEntry[])

const search = ref('')
const activeTab = ref<Tab>('all')
const selected = ref<IconEntry | null>(null)
const activeFramework = ref<Framework>('react')
const previewSize = ref(24)
const isDark = ref(false)
const copied = ref(false)

const tabCounts = computed(() => ({
  all: icons.value.length,
  outline: icons.value.filter(i => i.variant === 'outline').length,
  filled: icons.value.filter(i => i.variant === 'filled').length,
  brands: icons.value.filter(i => i.variant === 'brand').length,
}))

const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return icons.value.filter(icon => {
    const matchSearch = !q || icon.name.toLowerCase().includes(q) || icon.kebabName.includes(q)
    const matchTab = activeTab.value === 'all' || icon.variant === activeTab.value
    return matchSearch && matchTab
  })
})

function baseName(icon: IconEntry) {
  return icon.name.replace(/Filled$|Brand$/, '')
}

function getSnippet(icon: IconEntry, fw: Framework): string {
  const n = icon.name
  const base = baseName(icon)
  if (fw === 'react') return `import { ${n} } from '@rivo-icons/react';\n\n<${n} size={24} />`
  if (fw === 'vue') return `<script setup>\nimport { ${n} } from '@rivo-icons/vue';\n${CLOSE_SCRIPT}\n\n<template>\n  <${n} :size="24" />\n</template>`
  if (fw === 'nuxt') return `<!-- @rivo-icons/nuxt auto-imports icons -->\n<template>\n  <Icon${base} />\n</template>`
  if (fw === 'svelte') return `<script>\n  import { ${n} } from '@rivo-icons/svelte';\n${CLOSE_SCRIPT}\n\n<${n} size={24} />`
  if (fw === 'solid') return `import { ${n} } from '@rivo-icons/solid';\n\n<${n} size={24} />`
  return icon.svg
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch {}
}

function selectIcon(icon: IconEntry) {
  selected.value = icon
  activeFramework.value = 'react'
  previewSize.value = 24
}

function resizeSvg(svg: string, size: number): string {
  return svg
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`)
}
</script>

<template>
  <div class="app" :class="{ dark: isDark }">

    <header class="header">
      <div class="header-left">
        <span class="logo">✦</span>
        <span class="title">Rivo Icons</span>
        <span class="badge">{{ tabCounts.all }} icons</span>
      </div>
      <div class="header-center">
        <input v-model="search" class="search" type="text" placeholder="Search icons..." />
      </div>
      <div class="header-right">
        <button class="theme-btn" @click="isDark = !isDark">{{ isDark ? '☀' : '🌙' }}</button>
      </div>
    </header>

    <div class="tabs">
      <button
        v-for="tab in VARIANT_TABS"
        :key="tab.key"
        class="tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span class="tab-count">{{ tabCounts[tab.key] }}</span>
      </button>
    </div>

    <div class="layout" :class="{ 'has-panel': selected }">

      <main class="grid">
        <button
          v-for="icon in filtered"
          :key="icon.name"
          class="icon-card"
          :class="{ active: selected?.name === icon.name }"
          @click="selectIcon(icon)"
        >
          <div class="icon-preview" v-html="icon.svg" />
          <span class="icon-label">{{ icon.name }}</span>
          <span class="icon-variant">{{ icon.variant }}</span>
        </button>

        <div v-if="filtered.length === 0" class="empty">
          <p>No icons match <strong>{{ search }}</strong></p>
        </div>
      </main>

      <Transition name="panel">
        <aside v-if="selected" class="panel">

          <div class="panel-header">
            <div>
              <h2 class="panel-name">{{ selected.name }}</h2>
              <span class="panel-variant">{{ selected.variant }}</span>
            </div>
            <button class="close-btn" @click="selected = null">✕</button>
          </div>

          <div class="panel-preview-section">
            <div class="size-row">
              <button
                v-for="s in [16, 20, 24, 32, 48]"
                :key="s"
                class="size-btn"
                :class="{ active: previewSize === s }"
                @click="previewSize = s"
              >{{ s }}</button>
            </div>
            <div class="preview-box">
              <div v-html="resizeSvg(selected.svg, previewSize)" />
            </div>
          </div>

          <div class="panel-snippets">
            <div class="fw-tabs">
              <button
                v-for="fw in FRAMEWORKS"
                :key="fw.key"
                class="fw-tab"
                :class="{ active: activeFramework === fw.key }"
                @click="activeFramework = fw.key"
              >{{ fw.label }}</button>
            </div>
            <div class="code-block">
              <pre><code>{{ getSnippet(selected, activeFramework) }}</code></pre>
              <button class="copy-btn" :class="{ success: copied }" @click="copy(getSnippet(selected, activeFramework))">
                {{ copied ? '✓ Copied' : 'Copy' }}
              </button>
            </div>
          </div>

          <div class="panel-quick-copy">
            <p class="quick-title">Quick copy</p>
            <div class="quick-grid">
              <button v-for="fw in FRAMEWORKS" :key="fw.key" class="quick-btn" @click="copy(getSnippet(selected, fw.key))">
                {{ fw.label }}
              </button>
            </div>
          </div>

        </aside>
      </Transition>
    </div>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
</style>

<style scoped>
.app {
  --bg: #ffffff;
  --bg2: #f8f9fa;
  --bg3: #f1f3f5;
  --border: #e9ecef;
  --text: #1a1a2e;
  --text2: #6c757d;
  --accent: #4f46e5;
  --radius: 10px;
  --panel-w: 380px;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}
.app.dark {
  --bg: #0f172a;
  --bg2: #1e293b;
  --bg3: #273549;
  --border: #334155;
  --text: #f1f5f9;
  --text2: #94a3b8;
  --accent: #818cf8;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.header-center { flex: 1; max-width: 400px; }
.header-right { flex-shrink: 0; }

.logo { font-size: 20px; color: var(--accent); }
.title { font-size: 18px; font-weight: 700; }
.badge { font-size: 11px; padding: 2px 8px; background: var(--bg3); color: var(--text2); border-radius: 20px; }

.search {
  width: 100%;
  padding: 8px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg2);
  color: var(--text);
  font-size: 14px;
  outline: none;
}
.search:focus { border-color: var(--accent); }
.search::placeholder { color: var(--text2); }

.theme-btn {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg2);
  cursor: pointer;
  font-size: 16px;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 12px 24px;
  border-bottom: 1px solid var(--border);
}
.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--text2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.tab:hover { background: var(--bg2); color: var(--text); }
.tab.active { background: var(--accent); color: #fff; }
.tab-count { font-size: 11px; padding: 1px 6px; border-radius: 10px; background: rgba(255,255,255,0.25); }
.tab:not(.active) .tab-count { background: var(--bg3); color: var(--text2); }

.layout { display: grid; grid-template-columns: 1fr; }
.layout.has-panel { grid-template-columns: 1fr var(--panel-w); }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 4px;
  padding: 20px 24px;
  align-content: start;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px 10px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  text-align: center;
}
.icon-card:hover { background: var(--bg2); border-color: var(--border); }
.icon-card.active { background: var(--bg2); border-color: var(--accent); }

.icon-preview { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
.icon-preview :deep(svg) { width: 32px; height: 32px; }
.icon-label { font-size: 11px; font-weight: 500; word-break: break-word; line-height: 1.3; max-width: 84px; }
.icon-variant { font-size: 10px; color: var(--text2); text-transform: capitalize; }

.empty { grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: var(--text2); font-size: 14px; }

.panel {
  width: var(--panel-w);
  border-left: 1px solid var(--border);
  height: calc(100vh - 113px);
  position: sticky;
  top: 113px;
  overflow-y: auto;
  background: var(--bg);
  display: flex;
  flex-direction: column;
}
.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid var(--border);
}
.panel-name { font-size: 17px; font-weight: 700; }
.panel-variant { font-size: 12px; color: var(--text2); text-transform: capitalize; margin-top: 2px; display: block; }
.close-btn {
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg2);
  color: var(--text2);
  cursor: pointer;
  font-size: 13px;
  flex-shrink: 0;
}

.panel-preview-section { padding: 20px; border-bottom: 1px solid var(--border); }
.size-row { display: flex; gap: 6px; margin-bottom: 16px; }
.size-btn {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg2);
  color: var(--text2);
  font-size: 12px;
  cursor: pointer;
}
.size-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.preview-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  min-height: 120px;
}

.panel-snippets { padding: 20px; border-bottom: 1px solid var(--border); }
.fw-tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
.fw-tab {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg2);
  color: var(--text2);
  font-size: 12px;
  cursor: pointer;
}
.fw-tab.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.code-block {
  position: relative;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.code-block pre { padding: 14px 14px 40px; overflow-x: auto; font-size: 12px; line-height: 1.6; }
.code-block code { font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace; color: var(--text); white-space: pre; }
.copy-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text2);
  font-size: 11px;
  cursor: pointer;
}
.copy-btn.success { background: #16a34a; color: #fff; border-color: #16a34a; }

.panel-quick-copy { padding: 20px; }
.quick-title { font-size: 11px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.quick-btn {
  padding: 8px 6px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg2);
  color: var(--text);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
.quick-btn:hover { border-color: var(--accent); color: var(--accent); }

.panel-enter-active, .panel-leave-active { transition: opacity 0.2s, transform 0.2s; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateX(20px); }
</style>
