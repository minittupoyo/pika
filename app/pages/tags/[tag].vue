<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const route = useRoute()
const tag = route.params.tag as string

const { data: posts } = await useAsyncData(`blog-tag-${tag}`, async () => {
    const query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    const allPosts = await query.order("date", "DESC").all()
    return allPosts.filter(post => post.tags?.includes(tag))
})

useSeoMeta({
    title: `${tag} | タグ | minittu`,
    description: `${tag} タグの記事一覧`,
    ogImage: `https://og.minittu.net/og?t=${tag}&d=${tag} タグの記事一覧`
})

const breadcrumb: BreadcrumbItem[] = [
    {
        label: "Home",
        icon: "i-tabler-home",
        to: "/"
    },
    {
        label: "Tags",
        icon: "i-tabler-tag",
        to: "/tags"
    },
    {
        label: tag,
        icon: "i-tabler-tag",
        to: `/tags/${tag}`
    }
]
</script>

<template>
    <UContainer>
        <UPage>
            <UPageHeader :title="tag" :description="`${tag} タグの記事一覧`">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
                <p v-if="posts" class="text-muted flex flex-row items-center gap-1">
                    {{ posts.length }} 件の記事があります
                </p>
            </UPageHeader>
            <UPageBody>
                <div v-if="posts && posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BlogCard v-for="post in posts" :key="post.path" :post="post" />
                </div>
                <div v-else class="flex flex-col items-center justify-center py-20 text-muted">
                    <p>記事が見つかりませんでした。</p>
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>
