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
    description: "投稿されている記事"
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
                    <a v-for="post in posts" :href="post.path"
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
                </div>
            </UPageBody>
        </UPage>
    </UContainer>
</template>