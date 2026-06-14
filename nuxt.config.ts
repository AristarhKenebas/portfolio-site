// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark',
  },
  app: {
    head: {
      title: 'Aristarh Kenebas',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Monaspace+Neon:wght@400;700&family=Inter:wght@300;400;500&display=swap'
        }
      ],
      meta: [
        { name: 'description', content: 'Junior Developer from Ukraine' }
      ]
    }
  }
})
