<script setup lang="ts">
useSeoMeta({
  title: 'Rivo Icons — Free SVG Icons for Web Developers',
  description: 'Free, open-source SVG icons for React, Vue, Nuxt, Svelte, and Solid. 46 beautiful hand-crafted icons with currentColor support.',
  ogTitle: 'Rivo Icons — Free SVG Icons for Web Developers',
  ogDescription: 'Free, open-source SVG icons for React, Vue, Nuxt, Svelte, and Solid. 46 beautiful icons.',
  ogUrl: 'https://rivo-icon.rongmarin.info',
  twitterTitle: 'Rivo Icons — Free SVG Icons',
  twitterDescription: 'Free, open-source SVG icons for React, Vue, Nuxt, Svelte, and Solid.',
})

interface IconEntry {
  name: string
  kebabName: string
  variant: 'outline' | 'filled' | 'brand'
  svg: string
}

const { data: allIcons } = await useAsyncData('icons-home', () =>
  $fetch<IconEntry[]>('/api/icons')
)

// Show a curated subset of outline icons in the hero preview
const previewIcons = computed(() =>
  (allIcons.value ?? []).filter(i => i.variant === 'outline').slice(0, 20)
)
const totalIcons = computed(() => (allIcons.value ?? []).length)

type Framework = 'react' | 'vue' | 'nuxt' | 'svelte' | 'solid'

const activeFramework = ref<Framework>('react')
const installCopied = ref(false)

const CLOSE_SCRIPT = '</' + 'script>'

const frameworks: { key: Framework; label: string; color: string }[] = [
  { key: 'react', label: 'React', color: '#61dafb' },
  { key: 'vue', label: 'Vue', color: '#42b883' },
  { key: 'nuxt', label: 'Nuxt', color: '#00dc82' },
  { key: 'svelte', label: 'Svelte', color: '#ff3e00' },
  { key: 'solid', label: 'Solid', color: '#4388d6' },
]

const installSnippets: Record<Framework, string> = {
  react: 'npm install @rivo-icons/react',
  vue: 'npm install @rivo-icons/vue',
  nuxt: 'npm install @rivo-icons/nuxt',
  svelte: 'npm install @rivo-icons/svelte',
  solid: 'npm install @rivo-icons/solid',
}

const usageSnippets: Record<Framework, string> = {
  react: `import { Setting, Dollar, Clock } from '@rivo-icons/react'

export default function App() {
  return <Setting size={24} />
}`,
  vue: `${CLOSE_SCRIPT}
<script setup>
import { Setting, Dollar, Clock } from '@rivo-icons/vue'
</s` + `cript>

<template>
  <Setting :size="24" />
</template>`,
  nuxt: `<!-- auto-imported by @rivo-icons/nuxt -->
<template>
  <IconSetting />
  <IconDollar />
</template>`,
  svelte: `<script>
  import { Setting } from '@rivo-icons/svelte'
</${CLOSE_SCRIPT}

<Setting size={24} />`,
  solid: `import { Setting } from '@rivo-icons/solid'

export default function App() {
  return <Setting size={24} />
}`,
}

async function copyInstall() {
  try {
    await navigator.clipboard.writeText(installSnippets[activeFramework.value])
    installCopied.value = true
    setTimeout(() => { installCopied.value = false }, 1800)
  } catch {}
}

const features = [
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
    title: 'currentColor',
    desc: 'Every icon uses currentColor — set size and color with CSS like any other text.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title: 'TypeScript',
    desc: 'Full type definitions included. Props are fully typed with IntelliSense support.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    title: 'Tree-shakeable',
    desc: 'Import only what you use. No bloat — each icon is an independent export.',
  },
  {
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>`,
    title: 'SSR-safe',
    desc: 'Works with server-side rendering in Nuxt, Next.js, SvelteKit, and more.',
  },
]
</script>

<template>
  <div>
    <!-- ── Hero ── -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true" />
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="badge">Open Source · MIT License</div>
          <h1 class="hero-title">Beautiful icons<br />for modern apps</h1>
          <p class="hero-subtitle">
            {{ totalIcons }} free, hand-crafted SVG icons for React, Vue, Nuxt,
            Svelte, and Solid. Fully customizable. Zero dependencies.
          </p>
          <div class="hero-actions">
            <NuxtLink to="/icons" class="btn btn-hero-primary">
              Browse {{ totalIcons }} Icons
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </NuxtLink>
            <a
              href="https://github.com/RongMarin99/rivo-icon"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-hero-ghost"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.31 3.435 9.818 8.205 11.408.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.316 24 17.81 24 12.5 24 5.87 18.627.5 12 .5z"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        <div class="hero-icons" aria-hidden="true">
          <div class="icon-mosaic">
            <div
              v-for="icon in previewIcons"
              :key="icon.name"
              class="mosaic-card"
            >
              <div class="mosaic-icon" v-html="icon.svg" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Stats ── -->
    <section class="stats">
      <div class="container stats-inner">
        <div class="stat">
          <span class="stat-num">{{ totalIcons }}</span>
          <span class="stat-label">Icons</span>
        </div>
        <div class="stat-divider" aria-hidden="true" />
        <div class="stat">
          <span class="stat-num">5</span>
          <span class="stat-label">Frameworks</span>
        </div>
        <div class="stat-divider" aria-hidden="true" />
        <div class="stat">
          <span class="stat-num">24</span>
          <span class="stat-label">px Canvas</span>
        </div>
        <div class="stat-divider" aria-hidden="true" />
        <div class="stat">
          <span class="stat-num">MIT</span>
          <span class="stat-label">License</span>
        </div>
      </div>
    </section>

    <!-- ── Install ── -->
    <section class="install-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Works with your framework</h2>
          <p class="section-desc">One package per framework. No monolithic imports, no config required.</p>
        </div>

        <div class="install-card">
          <div class="fw-tabs">
            <button
              v-for="fw in frameworks"
              :key="fw.key"
              class="fw-tab"
              :class="{ active: activeFramework === fw.key }"
              @click="activeFramework = fw.key"
            >
              {{ fw.label }}
            </button>
          </div>

          <div class="install-body">
            <div class="install-row">
              <span class="install-label">Install</span>
              <div class="code-block install-code">
                <pre><code>{{ installSnippets[activeFramework] }}</code></pre>
                <button
                  class="copy-btn"
                  :class="{ success: installCopied }"
                  @click="copyInstall"
                >{{ installCopied ? '✓ Copied' : 'Copy' }}</button>
              </div>
            </div>

            <div class="install-row">
              <span class="install-label">Usage</span>
              <div class="code-block usage-code">
                <pre><code>{{ usageSnippets[activeFramework] }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Features ── -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Built for developers</h2>
          <p class="section-desc">Everything you'd expect from a modern icon library.</p>
        </div>
        <div class="features-grid">
          <div v-for="feat in features" :key="feat.title" class="feature-card">
            <div class="feature-icon" v-html="feat.icon" />
            <h3 class="feature-title">{{ feat.title }}</h3>
            <p class="feature-desc">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="cta-section">
      <div class="container cta-inner">
        <h2 class="cta-title">Start using Rivo Icons</h2>
        <p class="cta-desc">Open source. Free forever. No account required.</p>
        <div class="cta-actions">
          <NuxtLink to="/docs/getting-started" class="btn btn-primary">
            Read the Docs
          </NuxtLink>
          <NuxtLink to="/icons" class="btn btn-outline">
            Browse Icons
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ── Hero ── */
.hero {
  position: relative;
  overflow: hidden;
  padding: 80px 0 72px;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 80% at 70% 50%, rgba(139, 92, 246, 0.25), transparent),
    radial-gradient(ellipse 40% 60% at 20% 80%, rgba(99, 102, 241, 0.2), transparent);
  pointer-events: none;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hero-icons { display: none; }
}

.hero-content { max-width: 520px; }
.hero-content .badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 20px;
}

.hero-title {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: rgba(255,255,255,0.7);
  margin-bottom: 32px;
}

.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 600;
  background: #ffffff;
  color: #1e1b4b;
  border: none;
  transition: all 0.15s;
}
.btn-hero-primary:hover { background: #f1f5f9; transform: translateY(-1px); }

.btn-hero-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border-radius: 9px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.85);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.15s;
}
.btn-hero-ghost:hover { background: rgba(255,255,255,0.18); }

/* ── Icon mosaic ── */
.hero-icons { display: flex; align-items: center; justify-content: center; }

.icon-mosaic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.mosaic-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  border-radius: 14px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(4px);
  transition: transform 0.2s, background 0.2s;
}
.mosaic-card:hover { background: rgba(255,255,255,0.14); transform: scale(1.08); }

.mosaic-icon :deep(svg) {
  width: 28px;
  height: 28px;
  color: rgba(255,255,255,0.85);
}

/* ── Stats ── */
.stats {
  border-bottom: 1px solid var(--border);
  background: var(--bg-soft);
}
.stats-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  padding-block: 0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 28px 40px;
}
.stat-num { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; color: var(--text); }
.stat-label { font-size: 12px; color: var(--text-2); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-divider { width: 1px; height: 40px; background: var(--border); }

@media (max-width: 560px) {
  .stats-inner { gap: 0; }
  .stat { padding: 20px 20px; }
  .stat-divider:nth-child(4) { display: none; }
}

/* ── Section headers ── */
.section-header { text-align: center; margin-bottom: 40px; }
.section-title { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: var(--text); margin-bottom: 8px; }
.section-desc { font-size: 15px; color: var(--text-2); max-width: 480px; margin-inline: auto; }

/* ── Install section ── */
.install-section {
  padding: 80px 0;
  background: var(--bg);
}

.install-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  max-width: 780px;
  margin-inline: auto;
  background: var(--bg-soft);
}

.fw-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--bg-muted);
  padding: 12px 16px 0;
  gap: 4px;
}
.fw-tab {
  padding: 7px 16px;
  border-radius: 7px 7px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  transition: all 0.12s;
  cursor: pointer;
}
.fw-tab:hover { color: var(--text); }
.fw-tab.active {
  background: var(--bg-soft);
  color: var(--accent);
  border-color: var(--border);
  border-bottom: 1px solid var(--bg-soft);
  margin-bottom: -1px;
}

.install-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.install-row { display: flex; flex-direction: column; gap: 8px; }
.install-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); }

.install-code pre { padding: 14px 16px; }
.usage-code pre { padding: 14px 16px; }

.code-block { position: relative; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); }
.code-block pre { overflow-x: auto; font-size: 13px; line-height: 1.7; color: var(--text); }
.code-block code { font-family: 'Fira Code', 'Cascadia Code', Consolas, monospace; white-space: pre; }
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-soft);
  color: var(--text-2);
  font-size: 11px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.12s;
}
.copy-btn:hover { border-color: var(--accent); color: var(--accent); }
.copy-btn.success { background: var(--success); border-color: var(--success); color: #fff; }

/* ── Features ── */
.features-section {
  padding: 80px 0;
  background: var(--bg-soft);
  border-top: 1px solid var(--border);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
@media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .features-grid { grid-template-columns: 1fr; } }

.feature-card {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg);
}
.feature-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
  margin-bottom: 14px;
}
.feature-title { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.feature-desc { font-size: 13px; line-height: 1.6; color: var(--text-2); }

/* ── CTA ── */
.cta-section {
  padding: 80px 0;
  border-top: 1px solid var(--border);
  background: var(--bg);
}
.cta-inner { text-align: center; }
.cta-title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; color: var(--text); margin-bottom: 10px; }
.cta-desc { font-size: 15px; color: var(--text-2); margin-bottom: 28px; }
.cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
</style>
