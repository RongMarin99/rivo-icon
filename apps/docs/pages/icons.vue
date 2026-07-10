<script setup lang="ts">
useSeoMeta({
  title: 'Icon Browser',
  description: 'Browse and search all Rivo Icons. Copy SVG, React, Vue, Nuxt, Svelte, and Solid code snippets.',
  ogTitle: 'Rivo Icons — Icon Browser',
  ogDescription: 'Browse and search 44 free, open-source SVG icons. Copy code for React, Vue, Nuxt, Svelte, and Solid.',
})

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
  { key: 'brand', label: 'Brands' },
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

const { data: iconsData } = await useAsyncData('icons-browser', () =>
  $fetch<IconEntry[]>('/icons.json')
)
const icons = computed(() => iconsData.value ?? [])

const search = ref('')
const activeTab = ref<Tab>('all')
const selected = ref<IconEntry | null>(null)
const activeFramework = ref<Framework>('react')
const previewSize = ref(24)
const copied = ref(null as string | null)

const tabCounts = computed(() => ({
  all: icons.value.length,
  outline: icons.value.filter(i => i.variant === 'outline').length,
  filled: icons.value.filter(i => i.variant === 'filled').length,
  brand: icons.value.filter(i => i.variant === 'brand').length,
}))

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
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
  if (fw === 'react') return `import { ${n} } from '@rivo-icons/react'\n\n<${n} size={24} />`
  if (fw === 'vue') return `<script setup>\nimport { ${n} } from '@rivo-icons/vue'\n${CLOSE_SCRIPT}\n\n<template>\n  <${n} :size="24" />\n</template>`
  if (fw === 'nuxt') return `<!-- auto-imported by @rivo-icons/nuxt -->\n<template>\n  <Icon${base} />\n</template>`
  if (fw === 'svelte') return '<script>\n  import { ' + n + ' } from \'@rivo-icons/svelte\'\n<' + '/script>\n\n<' + n + ' size={24} />'
  if (fw === 'solid') return `import { ${n} } from '@rivo-icons/solid'\n\n<${n} size={24} />`
  return icon.svg
}

async function copy(id: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = id
    setTimeout(() => { copied.value = null }, 1800)
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

if (import.meta.client) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') selected.value = null
  })
}
</script>

<template>
  <div class="browser">

    <!-- ── Left sidebar: search + filters ── -->
    <aside class="sidebar">
      <div class="sidebar-search">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="search"
          class="search-input"
          type="search"
          placeholder="Search icons…"
          aria-label="Search icons"
        />
        <button v-if="search" class="search-clear" @click="search = ''" aria-label="Clear">✕</button>
      </div>

      <nav class="filter-nav" aria-label="Filter by variant">
        <button
          v-for="tab in VARIANT_TABS"
          :key="tab.key"
          class="filter-tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <span class="filter-label">{{ tab.label }}</span>
          <span class="filter-count">{{ tabCounts[tab.key] }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <span class="results-info">
          {{ filtered.length }}<span v-if="search"> result{{ filtered.length !== 1 ? 's' : '' }}</span>
          <span v-else> icons</span>
        </span>
        <NuxtLink to="/docs/getting-started" class="sidebar-docs-link">
          Docs →
        </NuxtLink>
      </div>
    </aside>

    <!-- ── Main area: grid + panel ── -->
    <div class="browser-main">

      <!-- Icon grid -->
      <main class="icon-grid" aria-label="Icons">
        <template v-if="filtered.length > 0">
          <button
            v-for="icon in filtered"
            :key="icon.name"
            class="icon-card"
            :class="{ active: selected?.name === icon.name }"
            :title="icon.kebabName"
            @click="selectIcon(icon)"
          >
            <div class="icon-preview" v-html="icon.svg" />
            <span class="icon-label">{{ icon.kebabName }}</span>
          </button>
        </template>

        <div v-else class="empty-state" role="status">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <p>No results for <strong>"{{ search }}"</strong></p>
        </div>
      </main>

      <!-- Detail panel -->
      <Transition name="slide">
        <aside v-if="selected" class="panel" :key="selected.name">

          <div class="panel-header">
            <div>
              <h2 class="panel-name">{{ selected.name }}</h2>
              <span class="panel-variant">{{ selected.variant }}</span>
            </div>
            <button class="panel-close" @click="selected = null" aria-label="Close">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Preview + sizes -->
          <div class="panel-section">
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

          <!-- Code snippet -->
          <div class="panel-section">
            <div class="fw-tabs">
              <button
                v-for="fw in FRAMEWORKS"
                :key="fw.key"
                class="fw-tab"
                :class="{ active: activeFramework === fw.key }"
                @click="activeFramework = fw.key"
              >{{ fw.label }}</button>
            </div>
            <div class="snippet-block">
              <pre><code>{{ getSnippet(selected, activeFramework) }}</code></pre>
              <button
                class="snippet-copy"
                :class="{ success: copied === 'snippet' }"
                @click="copy('snippet', getSnippet(selected, activeFramework))"
              >{{ copied === 'snippet' ? '✓' : 'Copy' }}</button>
            </div>
          </div>

          <!-- Quick copy -->
          <div class="panel-section">
            <p class="quick-label">Quick copy</p>
            <div class="quick-row">
              <button
                v-for="fw in FRAMEWORKS"
                :key="fw.key"
                class="quick-btn"
                :class="{ success: copied === fw.key }"
                @click="copy(fw.key, getSnippet(selected, fw.key))"
              >{{ copied === fw.key ? '✓' : fw.label }}</button>
            </div>
          </div>

        </aside>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* ── Layout ── */
.browser {
  display: flex;
  height: calc(100vh - var(--nav-h));
  overflow: hidden;
  background: var(--bg);
  position: relative;
}

/* ── Sidebar ── */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 12px;
  overflow-y: auto;
  background:
    linear-gradient(180deg,
      color-mix(in srgb, var(--accent) 4%, var(--bg-soft)) 0%,
      var(--bg-soft) 100%);
}

.sidebar-search {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.search-icon {
  position: absolute;
  left: 9px;
  color: var(--text-3);
  pointer-events: none;
  flex-shrink: 0;
}
.search-input {
  width: 100%;
  padding: 7px 28px 7px 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  color: var(--text);
  font-size: 13px;
  outline: none;
  transition: border-color 0.12s;
}
.search-input:focus { border-color: var(--accent); }
.search-input::placeholder { color: var(--text-3); }
.search-input::-webkit-search-cancel-button { display: none; }
.search-clear {
  position: absolute;
  right: 7px;
  color: var(--text-3);
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px;
  line-height: 1;
  transition: color 0.12s;
}
.search-clear:hover { color: var(--text); }

/* Filter tabs */
.filter-nav {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.filter-tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  border-radius: 7px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
}
.filter-tab:hover { background: var(--bg-muted); color: var(--text); }
.filter-tab.active { background: var(--accent-soft); color: var(--accent); border-color: var(--accent-border); }
.filter-label { flex: 1; }
.filter-count {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  background: var(--bg-muted);
  color: var(--text-3);
  font-weight: 600;
}
.filter-tab.active .filter-count {
  background: var(--accent-border);
  color: var(--accent);
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.results-info { font-size: 11px; color: var(--text-3); }
.sidebar-docs-link { font-size: 11px; color: var(--accent); font-weight: 500; }
.sidebar-docs-link:hover { text-decoration: underline; }

/* ── Main area ── */
.browser-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  min-width: 0;
}

/* ── Icon grid ── */
.icon-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
  padding: 16px;
  overflow-y: auto;
  align-content: start;
  background:
    radial-gradient(ellipse 70% 50% at 85% 5%,  color-mix(in srgb, var(--accent) 7%, transparent)  0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 10% 90%, color-mix(in srgb, var(--accent) 5%, transparent)  0%, transparent 60%),
    var(--bg);
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 8px 14px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  background: transparent;
  color: var(--text);
  cursor: pointer;
  text-align: center;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.12s;
}
.icon-card:hover {
  background: color-mix(in srgb, var(--bg) 80%, var(--accent) 4%);
  border-color: var(--border);
  box-shadow: 0 2px 8px color-mix(in srgb, var(--accent) 8%, transparent);
  transform: translateY(-1px);
}
.icon-card.active {
  background: var(--accent-soft);
  border-color: var(--accent-border);
  box-shadow: 0 0 0 2px var(--accent-border), 0 4px 12px color-mix(in srgb, var(--accent) 15%, transparent);
}

.icon-preview { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
.icon-preview :deep(svg) { width: 32px; height: 32px; transition: transform 0.15s; }
.icon-card:hover .icon-preview :deep(svg) { transform: scale(1.12); }
.icon-card.active .icon-preview :deep(svg) { color: var(--accent); }

.icon-label {
  font-size: 10px;
  color: var(--text-2);
  word-break: break-word;
  line-height: 1.3;
  max-width: 88px;
}
.icon-card.active .icon-label { color: var(--accent); }

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 80px 20px;
  color: var(--text-3);
  font-size: 14px;
}
.empty-state strong { color: var(--text-2); }

/* ── Detail panel ── */
.panel {
  width: 360px;
  flex-shrink: 0;
  border-left: 1px solid var(--border);
  overflow-y: auto;
  background:
    radial-gradient(ellipse 100% 30% at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 100%),
    var(--bg);
  display: flex;
  flex-direction: column;
}

@media (max-width: 900px) {
  .sidebar { width: 180px; }
  .panel { width: 300px; }
}
@media (max-width: 640px) {
  .sidebar { display: none; }
  .panel { position: fixed; inset: var(--nav-h) 0 0 0; width: 100%; z-index: 300; }
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.panel-name { font-size: 15px; font-weight: 700; line-height: 1.2; }
.panel-variant {
  display: inline-block;
  margin-top: 4px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.03em;
  background: var(--bg-muted);
  color: var(--text-3);
}
.panel-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-3);
  background: var(--bg-soft);
  flex-shrink: 0;
  transition: all 0.12s;
}
.panel-close:hover { color: var(--text); }

.panel-section {
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.panel-section:last-child { border-bottom: none; }

.size-row { display: flex; gap: 5px; margin-bottom: 14px; }
.size-btn {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-soft);
  color: var(--text-2);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.12s;
}
.size-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.size-btn:hover:not(.active) { border-color: var(--text-3); }

.preview-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  border-radius: var(--radius);
  background: var(--bg-soft);
  border: 1px solid var(--border);
}

/* Framework tabs */
.fw-tabs { display: flex; flex-wrap: wrap; gap: 3px; margin-bottom: 10px; }
.fw-tab {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-soft);
  color: var(--text-2);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.12s;
}
.fw-tab.active { background: var(--accent); color: #fff; border-color: var(--accent); }

/* Snippet block */
.snippet-block {
  position: relative;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}
.snippet-block pre { padding: 12px 12px 38px; overflow-x: auto; font-size: 11.5px; line-height: 1.65; }
.snippet-block code { font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace; color: var(--text); white-space: pre; }
.snippet-copy {
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg);
  color: var(--text-2);
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.12s;
}
.snippet-copy:hover { border-color: var(--accent); color: var(--accent); }
.snippet-copy.success { background: var(--success); border-color: var(--success); color: #fff; }

/* Quick copy */
.quick-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); margin-bottom: 8px; }
.quick-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.quick-btn {
  padding: 8px 6px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-soft);
  color: var(--text);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.12s;
}
.quick-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.quick-btn.success { background: var(--success-soft); border-color: var(--success); color: var(--success); }

/* Slide transition */
.slide-enter-active, .slide-leave-active { transition: opacity 0.18s, transform 0.18s; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateX(16px); }
</style>
