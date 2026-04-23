<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
    let query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    return query.path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
    let query = queryCollectionItemSurroundings("blog", route.path, {
        fields: ['title','description','date']
    })
    if (import.meta.env.PROD) {
        query.where("draft","<>",true)
    }
    return query
})

const { data: allTags } = await useAsyncData('all-tags', () => queryCollection("tags").all())

const postTags = computed(() => {
    if (!post.value?.tags || !allTags.value) return []
    return post.value.tags.map(id => {
        const tagDef = allTags.value?.find(t => t.tagId === id)
        return {
            id,
            name: tagDef ? tagDef.name : id
        }
    })
})

useSeoMeta({
    title: `${post.value?.title} | minittu`,
    description: post.value?.description,
    ogImage: `https://og.minittu.net/og?t=${post.value?.title}&d=${post.value?.description}`
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
    },
    {
        label: post.value?.title,
        icon: "i-tabler-article",
        to: route.path
    }
])
</script>

<template>
    <UContainer>
        <UPage v-if="post">
            <UPageHeader :title="post?.title" :description="post?.description">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
                <div v-if="post" class="text-muted flex flex-row items-center gap-4 flex-wrap">
                    <p class="flex flex-row items-center gap-1">
                        <Icon name="tabler:calendar-week" />{{ new Date(post?.date).toLocaleDateString("ja-jp") }}
                    </p>
                    <div v-if="postTags.length > 0" class="flex flex-row items-center gap-2">
                        <UBadge v-for="tag in postTags" :key="tag.id" color="neutral" variant="subtle" size="sm" :to="`/tags/${tag.id}`">
                            {{ tag.name }}
                        </UBadge>
                    </div>
                </div>
            </UPageHeader>
            <UPageBody>
                <ContentRenderer v-if="post" :value="post" />
                <USeparator v-if="surround?.filter(Boolean).length" />
                <UContentSurround :surround="surround as any" />
            </UPageBody>
            <template #right>
                <UPageAside>
                    <UContentToc highlight highlight-color="primary" highlight-variant="circuit" v-if="post"
                        :links="post.body.toc?.links" />
                </UPageAside>
            </template>
        </UPage>
    </UContainer>
</template>