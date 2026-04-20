<script setup lang="ts">
const { title = "pika", description = "Nuxtの勉強のために作ったブログ" } = defineProps<{
    title?: string
    description?: string
}>();
</script>

<template>
    <div class="w-full h-screen flex flex-col justify-center items-center p-16 bg-white relative"
        style="font-family: 'Noto Sans JP OG',sans-serif;">
        <div class="flex flex-col items-center text-center">
            <h1 class="text-6xl font-bold" style="line-clamp: 3; font-weight: 700;">{{ title }}</h1>
            <p class="text-3xl font-medium mt-6" :style="{ lineClamp: 2 }">{{ description }}</p>
        </div>
        <div class="absolute bottom-16 left-16">
            <p class="text-2xl font-medium text-slate-700">pika</p>
        </div>
    </div>
</template>