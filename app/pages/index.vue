<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
const { data: blog } = await useAsyncData(() => {
    let query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    return query.order("date", "DESC").limit(6).all()
})

const links = ref<ButtonProps[]>([
    {
        label: "GitHub",
        to: "https://github.com/minittupoyo",
        icon: 'i-tabler-brand-github'
    },
    {
        label: "ソースコード",
        to: "https://github.com/minittupoyo/pika",
        icon: 'i-tabler-code',
        color: 'neutral',
        variant: 'ghost'
    },
])

defineOgImage("BlogOg.satori", { title: "pika", description: "Nuxtの勉強のために作ったブログ" })

useSeoMeta({
    title: "pika",
    description: "Nuxtの勉強のために作ったブログ"
})
</script>

<template>
    <UPage>
        <UPageHero title="minittu" description="超個人用備忘録" headline="ねこ、かわいいね。" :links="links">
        </UPageHero>
        <UPageBody>
            <UContainer class="flex flex-row items-center justify-between">
                <h1 class="text-2xl font-bold">最近の投稿</h1>
                <ULink as="button" to="/blog">すべての記事</ULink>
            </UContainer>
            <UContainer class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a v-for="post in blog" :href="post.path"
                    class="flex flex-row items-center justify-start border border-muted gap-4 p-4 rounded-md group transition-all duration-150 hover:border-primary">
                    <div class="w-12 h-12 flex items-center justify-center text-2xl">
                        {{ post.emoji }}
                    </div>
                    <div class="flex flex-col shrink items-start">
                        <p class="text-sm text-dimmed">{{ new Date(post.date).toLocaleDateString("ja-jp", {
                            year:
                                "numeric", month: "2-digit", day: "2-digit"
                        }) }}</p>
                        <h2 class="text-xl font-bold line-clamp-2">{{ post.title }}</h2>
                        <p class="text-base text-muted line-clamp-1">{{ post.description }}</p>
                    </div>
                </a>
            </UContainer>
        </UPageBody>
    </UPage>
</template>