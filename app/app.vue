<script setup lang="ts">
import "@fontsource-variable/geist";
import "@fontsource-variable/noto-sans-jp";
import "@fontsource-variable/geist-mono";

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
