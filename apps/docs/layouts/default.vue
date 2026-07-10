<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleDark = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

const route = useRoute()
const navLinks = [
  { to: '/icons', label: 'Icons' },
  { to: '/docs/getting-started', label: 'Docs' },
]
</script>

<template>
  <div class="site">
    <header class="nav">
      <div class="container nav-inner">
        <NuxtLink to="/" class="logo" aria-label="Rivo Icons home">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M12 2L15 8.5L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L9 8.5Z" />
          </svg>
          <span class="logo-text">Rivo Icons</span>
        </NuxtLink>

        <nav class="nav-links" aria-label="Main navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ active: route.path.startsWith(link.to) }"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            href="https://github.com/RongMarin99/rivo-icon"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link nav-github"
            aria-label="GitHub repository"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.31 3.435 9.818 8.205 11.408.6.113.82-.258.82-.577
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755
                -1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305
                3.492.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38
                1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399
                3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24
                2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81
                1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.316
                24 17.81 24 12.5 24 5.87 18.627.5 12 .5z" />
            </svg>
            <span class="nav-github-label">GitHub</span>
          </a>
        </nav>

        <button class="theme-toggle" @click="toggleDark" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </header>

    <main class="page-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <NuxtLink to="/" class="logo logo-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 2L15 8.5L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L9 8.5Z" />
            </svg>
            <span>Rivo Icons</span>
          </NuxtLink>
          <p class="footer-tagline">Free, open-source icons for web developers.</p>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <div class="footer-col">
            <h3 class="footer-heading">Product</h3>
            <NuxtLink to="/icons" class="footer-link">Browse Icons</NuxtLink>
            <NuxtLink to="/docs/getting-started" class="footer-link">Documentation</NuxtLink>
          </div>
          <div class="footer-col">
            <h3 class="footer-heading">Frameworks</h3>
            <NuxtLink to="/docs/react" class="footer-link">React</NuxtLink>
            <NuxtLink to="/docs/vue" class="footer-link">Vue</NuxtLink>
            <NuxtLink to="/docs/nuxt" class="footer-link">Nuxt</NuxtLink>
            <NuxtLink to="/docs/svelte" class="footer-link">Svelte</NuxtLink>
            <NuxtLink to="/docs/solid" class="footer-link">Solid</NuxtLink>
          </div>
          <div class="footer-col">
            <h3 class="footer-heading">Open Source</h3>
            <a href="https://github.com/RongMarin99/rivo-icon" target="_blank" rel="noopener" class="footer-link">GitHub</a>
            <a href="https://github.com/RongMarin99/rivo-icon/blob/main/LICENSE" target="_blank" rel="noopener" class="footer-link">MIT License</a>
          </div>
        </nav>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <span>© {{ new Date().getFullYear() }} Rivo Icons — MIT License</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ── Navigation ── */
.nav {
  position: sticky;
  top: 0;
  z-index: 200;
  height: var(--nav-h);
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.nav-inner {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
  flex-shrink: 0;
}
.logo svg { color: var(--accent); }
.logo-sm { font-size: 14px; }
.logo-text { letter-spacing: -0.01em; }

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-2);
  transition: all 0.15s;
}
.nav-link:hover { background: var(--bg-muted); color: var(--text); }
.nav-link.active { color: var(--accent); background: var(--accent-soft); }

.nav-github-label { display: none; }
@media (min-width: 640px) { .nav-github-label { display: inline; } }

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--text-2);
  background: var(--bg-soft);
  transition: all 0.15s;
  margin-left: 6px;
  flex-shrink: 0;
}
.theme-toggle:hover { color: var(--text); border-color: var(--text-3); }

/* ── Page content ── */
.page-content { flex: 1; }

/* ── Footer ── */
.footer {
  border-top: 1px solid var(--border);
  background: var(--bg-soft);
  margin-top: auto;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  padding-top: 48px;
  padding-bottom: 48px;
}
@media (max-width: 768px) {
  .footer-inner { grid-template-columns: 1fr; gap: 32px; }
}

.footer-brand { max-width: 240px; }
.footer-tagline { font-size: 13px; color: var(--text-2); margin-top: 8px; line-height: 1.5; }

.footer-nav { display: flex; gap: 48px; }
@media (max-width: 480px) { .footer-nav { gap: 28px; } }

.footer-col { display: flex; flex-direction: column; gap: 8px; }
.footer-heading { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); margin-bottom: 4px; }
.footer-link { font-size: 13px; color: var(--text-2); transition: color 0.15s; }
.footer-link:hover { color: var(--accent); }

.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 16px 0;
  font-size: 12px;
  color: var(--text-3);
}
</style>
