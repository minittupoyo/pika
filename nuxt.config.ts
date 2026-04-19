import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-icons',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    'nuxt-og-image'
  ],
  css: ["./app/assets/css/main.css"],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: {
    serverAppConfig: false
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  fonts: {
    families: [
      {
        name: "Geist",
        provider: "google",
        global: true,
        preload: true,
        weights: [400,500,700]
      },
      {
        name: "Noto Sans JP",
        provider: "google",
        global: true,
        preload: true,
        weight: "100 900"
      },
      {
        name: "Noto Sans JP OG",
        src: "/fonts/NotoSansJP-Bold.ttf",
        weight: 700,
        global: true,
        preload: true
      },
      {
        name: "Noto Sans JP OG",
        src: "/fonts/NotoSansJP-Medium.ttf",
        weight: 500,
        global: true,
        preload: true
      }
    ]
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-breaks': {},
          'remark-link-card-plus': {
            cache: true,
            shortenUrl: true,
            thumbnailPosition: "right",
          }
        }
      }
    }
  },
  ogImage: {
    zeroRuntime: true
  }
})