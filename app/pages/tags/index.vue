<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { data: posts } = await useAsyncData('all-tags', () => {
    let query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    return query.select("tags").all()
})

const tags = computed(() => {
    if (!posts.value) return []
    const counts: Record<string, number> = {}
    posts.value.forEach(post => {
        (post.tags || []).forEach(tag => {
            counts[tag] = (counts[tag] || 0) + 1
        })
    })
    return Object.entries(counts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
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
    }
]

useSeoMeta({
    title: "タグ | minittu",
    description: "タグ一覧",
    ogImage: `https://og.minittu.net/og?t=タグ&d=タグ一覧`
})
</script>

<template>
    <UContainer>
        <UPage>
            <UPageHeader title="タグ" description="タグ一覧">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
                <p v-if="tags" class="text-muted flex flex-row items-center gap-1">
                    {{ tags.length }} 個のタグがあります
                </p>
            </UPageHeader>
            <UPageBody>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ULink v-for="tag in tags" :key="tag.name" :to="`/tags/${tag.name}`"
                        class="flex flex-row items-center justify-start border border-muted gap-4 p-4 rounded-md group transition-all duration-150 hover:border-primary">
                        <div class="w-12 h-12 flex items-center justify-center text-2xl">
                            <UIcon name="i-tabler-tag" />
                        </div>
                        <div class="flex flex-col shrink items-start">
                            <h2 class="text-xl font-bold line-clamp-2">{{ tag.name }}</h2>
                            <p class="text-sm text-muted">{{ tag.count }} 件の記事</p>
                        </div>
                    </ULink>
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>