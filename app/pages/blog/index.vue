<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
const { data: posts } = await useAsyncData(() => {
    let query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    return query.order("date", "DESC").all()
})

const links = ref<ButtonProps[]>([
    {
        label: "メインブログ",
        to: "https://blog.minittu.net/",
        icon: 'i-tabler-brand-astro'
    }
])

useSeoMeta({
    title: `ブログ | pika`,
    description: "投稿されている記事"
})
</script>

<template>
    <UContainer>
        <UPage>
            <UPageHeader title="Blog" description="記事一覧" />
            <UPageBody>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a v-for="post in posts" :href="post.path"
                        class="flex flex-row items-center justify-start border border-slate-200 gap-4 p-4 rounded-md group transition-all duration-150 hover:border-primary">
                        <div class="w-12 h-12 flex items-center justify-center text-2xl">
                            {{ post.emoji }}
                        </div>
                        <div class="flex flex-col shrink items-start">
                            <p class="text-sm text-slate-500">{{ new Date(post.date).toLocaleDateString("ja-jp", {
                                year:
                                    "numeric", month: "2-digit", day: "2-digit"
                                }) }}</p>
                            <h2 class="text-xl font-bold line-clamp-2">{{ post.title }}</h2>
                            <p class="text-base text-slate-700 line-clamp-1">{{ post.description }}</p>
                        </div>
                    </a>
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>