export default defineEventHandler(async () => {
  return useStorage('assets:icons').getItem('icons.json')
})
