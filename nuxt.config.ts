import tailwindcss from '@tailwindcss/vite'
import { prerenderRoutes } from './app/content/routes'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },

  // Génération statique : toutes les pages sont pré-rendues au build.
  ssr: true,

  css: ['~/assets/css/main.css'],

  // Les composants sont auto-importés par leur seul nom de fichier
  // (ex. components/slides/SlideText.vue → <SlideText />).
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Formation Web',
      meta: [
        { name: 'description', content: 'Supports de cours de la formation développement web.' },
        // Support réservé aux étudiants de la formation : pas d'indexation.
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'theme-color', content: '#0b0d12' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
      script: [
        {
          // Applique le thème avant le premier rendu pour éviter un flash.
          innerHTML:
            "(function(){try{var t=localStorage.getItem('fw-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()",
          tagPosition: 'head',
        },
      ],
    },
    pageTransition: false,
  },

  nitro: {
    // On force le preset statique : la sortie est toujours .output/public,
    // y compris lorsque le build tourne sur Netlify (qui détecterait sinon
    // son propre preset).
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', ...prerenderRoutes()],
      failOnError: true,
    },
  },

  typescript: {
    strict: true,
  },
})
