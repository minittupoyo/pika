<script setup lang="ts">
useSeoMeta({
  title: "mnittu",
  description: "超個人用備忘録"
})

useHead({
  htmlAttrs: {
    lang: "ja"
  }
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
