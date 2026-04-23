<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const route = useRoute()
const tagId = route.params.tag as string

const { data: tagInfo } = await useAsyncData(`tag-info-${tagId}`, async () => {
    // タグの定義をコレクションから取得
    const tags = await queryCollection("tags").all()
    const found = tags.find(t => t.tagId === tagId)
    
    if (!found) return null

    // そのタグに紐づく記事を取得
    const blogPosts = await queryCollection("blog").all()
    const filteredPosts = blogPosts.filter(post => post.tags?.includes(tagId))
    
    return {
        ...found,
        posts: filteredPosts
    }
})

if (!tagInfo.value) {
    throw createError({ statusCode: 404, statusMessage: 'Tag not found' })
}

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
        label: tagInfo.value.name,
        icon: "i-tabler-tag",
        to: `/tags/${tagId}`
    }
]

useSeoMeta({
    title: `${tagInfo.value.name} | タグ | minittu`,
    description: `${tagInfo.value.name} タグの記事一覧`
})
</script>

<template>
    <UContainer v-if="tagInfo">
        <UPage>
            <UPageHeader :title="tagInfo.name" :description="`${tagInfo.name} タグの記事一覧`">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
                <template #icon>
                    <UIcon name="i-tabler-tag" class="w-10 h-10 text-primary" />
                </template>
                <p class="text-sm text-muted">
                    {{ tagInfo.posts.length }} 件の記事があります
                </p>
            </UPageHeader>
            <UPageBody>
                <div v-if="tagInfo.posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BlogCard v-for="post in tagInfo.posts" :key="post.path" :post="post" />
                </div>
                <div v-else class="flex flex-col items-center justify-center py-20 text-muted">
                    <UIcon name="i-tabler-database-x" class="w-16 h-16 mb-4 opacity-20" />
                    <p>このタグに関連する記事はまだありません。</p>
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>
