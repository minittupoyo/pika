<script setup lang="ts">
useSeoMeta({
  title: "minittu",
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
