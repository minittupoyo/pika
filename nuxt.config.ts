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
    'nuxt-og-image',
    "@nuxt/image"
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
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/blog/'
      ]
    }
  },
  fonts: {
    families: [
      {
        name: "Geist",
        provider: "fontsource",
        global: true,
        preload: true,
        weights: [400, 500, 700]
      },
      {
        name: "Noto Sans JP",
        provider: "fontsource",
        global: true,
        preload: true,
        weight: "100 900",
        subsets: ["latin", "japanese"]
      },
      {
        name: "LINE Seed JP",
        src: "/fonts/LINESeedJP_OTF_Rg.otf",
        weight: 400,
        global: true,
        subsets: ["latin","japanese"],
        preload: true
      },
      {
        name: "LINE Seed JP",
        src: "/fonts/LINESeedJP_OTF_Bd.otf",
        weight: 800,
        global: true,
        subsets: ["latin","japanese"],
        preload: true
      },
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
        },
        highlight: {
          theme: {
            default: 'catppuccin-frappe',
            light: 'catppuccin-latte',
            dark: 'catppuccin-macchiato'
          },
          langs: [
            "shell","json","jsonc","yaml","yml","astro","js","ts","python","vue"
          ]
        }
      }
    }
  },
  ogImage: {
    zeroRuntime: true,
    buildCache: false,
    fontSubsets: ["latin","japanese","japanese-ext"]
  }
})