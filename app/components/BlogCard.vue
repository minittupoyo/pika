<script setup lang="ts">
defineProps<{
    post: {
        path: string
        emoji: string
        date: string | Date
        title: string
        description: string
    }
}>()
</script>

<template>
    <ULink :to="post.path"
        class="flex flex-row items-center justify-start border border-muted gap-4 p-4 rounded-md group transition-all duration-150 hover:border-primary">
        <div class="w-12 h-12 flex items-center justify-center text-2xl">
            {{ post.emoji }}
        </div>
        <div class="flex flex-col shrink items-start text-left">
            <p class="text-sm text-dimmed">
                {{ new Date(post.date).toLocaleDateString("ja-jp", {
                    year: "numeric", month: "2-digit", day: "2-digit"
                }) }}
            </p>
            <h2 class="text-xl font-bold line-clamp-2">{{ post.title }}</h2>
            <p class="text-base text-muted line-clamp-1">{{ post.description }}</p>
        </div>
    </ULink>
</template>
