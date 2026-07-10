export default defineEventHandler(async () => {
  // Bundled server assets (production / Vercel serverless)
  const data = await useStorage('assets:icons').getItem('icons.json')
  if (data) return data

  // Fallback: direct filesystem read (dev / node-server)
  const { readFileSync } = await import('node:fs')
  const { resolve } = await import('node:path')
  try {
    return JSON.parse(readFileSync(resolve(process.cwd(), 'public/icons.json'), 'utf-8'))
  } catch {
    return []
  }
})
