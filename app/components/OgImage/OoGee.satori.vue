<script setup lang="ts">
const { title = "pika", description = "Nuxtの勉強のために作ったブログ" } = defineProps<{
    title?: string
    description?: string
}>();
</script>

<template>
    <div class="w-full h-screen flex flex-col justify-center items-center p-16 bg-white relative"
        style="font-family: 'LINE Seed JP' !important;">
        <div class="flex flex-col items-center text-center">
            <h1 class="text-6xl font-extrabold" style="line-clamp: 3; font-weight: 800;">{{ title }}</h1>
            <p class="text-3xl font-normal mt-6" :style="{ lineClamp: 2 }">{{ description }}</p>
        </div>
        <div class="absolute bottom-16 left-16">
            <p class="text-2xl font-normal text-slate-700">pika</p>
        </div>
    </div>
</template>