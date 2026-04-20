<script setup lang="ts">
useSeoMeta({
  title: "pika",
  description: "Nuxtの勉強のために作ったブログ"
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
