// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import tailwindcss from "eslint-plugin-tailwindcss"

export default withNuxt(
  // Your custom configs here
  tailwindcss.configs["flat/recommended"]
)