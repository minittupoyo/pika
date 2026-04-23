<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { data: tagsData } = await useAsyncData('tags-list', async () => {
    // タグの定義をコレクションから取得
    const definitions = await queryCollection("tags").all()
    
    // 記事数を集計
    const blogPosts = await queryCollection("blog").all()
    const counts: Record<string, number> = {}
    blogPosts.forEach(post => {
        (post.tags || []).forEach(t => {
            counts[t] = (counts[t] || 0) + 1
        })
    })

    // 必要なプロパティだけを抽出して返す
    return definitions.map(tag => ({
        tagId: tag.tagId,
        name: tag.name,
        count: counts[tag.tagId] || 0
    })).sort((a, b) => b.count - a.count)
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
    title: "タグ一覧 | minittu",
    description: "タグから記事を探す"
})
</script>

<template>
    <UContainer>
        <UPage>
            <UPageHeader title="タグ一覧" description="気になるトピックから記事を探せます">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
                <p v-if="tagsData" class="text-muted">
                    {{ tagsData.length }} 個のタグが定義されています
                </p>
            </UPageHeader>
            <UPageBody>
                <div v-if="tagsData" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ULink v-for="tag in tagsData" :key="tag.tagId" :to="`/tags/${tag.tagId}`"
                        class="flex flex-row items-center justify-start border border-muted gap-4 p-4 rounded-md group transition-all duration-150 hover:border-primary">
                        <div class="w-10 h-10 flex items-center justify-center text-xl bg-primary/10 rounded-full text-primary">
                            <UIcon name="i-tabler-tag" />
                        </div>
                        <div class="flex flex-col shrink items-start">
                            <h2 class="text-lg font-bold line-clamp-2">{{ tag.name }}</h2>
                            <p class="text-xs text-muted">{{ tag.count }} 件の記事</p>
                        </div>
                    </ULink>
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>
