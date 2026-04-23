import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    'nuxt-icons',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
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
            "shell", "json", "jsonc", "yaml", "yml", "astro", "js", "ts", "python", "vue"
          ]
        }
      }
    }
  },
  icon: {
    customCollections: [{
      prefix: "custom",
      dir: "./app/assets/icons"
    }]
  }
})