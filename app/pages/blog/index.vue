<script setup lang="ts">
import type { ButtonProps, BreadcrumbItem } from '@nuxt/ui';
const { data: posts } = await useAsyncData(() => {
    let query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    return query.order("date", "DESC").all()
})

useSeoMeta({
    title: `ブログ | minittu`,
    description: "投稿されている記事",
    ogImage: `https://og.minittu.net/og?t=ブログ&d=投稿されている記事`
})

const breadcrumb = ref<BreadcrumbItem[]>([
    {
        label: "Home",
        icon: "i-tabler-home",
        to: "/"
    },
    {
        label: "Blog",
        icon: "i-tabler-book",
        to: "/blog"
    }
])
</script>

<template>
    <UContainer>
        <UPage>
            <UPageHeader title="Blog" description="記事一覧">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
                <p v-if="posts" class="text-muted flex flex-row items-center gap-1">
                    {{ posts.length }} 件の記事があります
                </p>
            </UPageHeader>
            <UPageBody>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BlogCard v-for="post in posts" :key="post.path" :post="post" />
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>