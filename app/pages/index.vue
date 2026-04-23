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

useSeoMeta({
    title: "minittu",
    description: "超個人用備忘録",
    ogImage: `https://og.minittu.net/og?t=minittu&d=超個人用備忘録`
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
                <BlogCard v-for="post in blog" :key="post.path" :post="post" />
            </UContainer>
        </UPageBody>
    </UPage>
</template>