<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
    let query = queryCollection("blog")
    if (import.meta.env.PROD) {
        query.where("draft", "<>", true)
    }
    return query.path(route.path).first()
})

defineOgImage("BlogOg.takumi", { title: post.value?.title, description: post.value?.description }, { fonts: ["Noto+Sans+JP+OG"] })

useSeoMeta({
    title: `${post.value?.title} | pika`,
    description: post.value?.description
})
</script>

<template>
    <UContainer>
        <UPage v-if="post">
            <UPageHeader :title="post?.title" :description="post?.description">
                <p v-if="post" class="text-muted flex flex-row items-center gap-1">
                    <Icon name="tabler:calendar-week" />{{ new Date(post?.date).toLocaleDateString("ja-jp") }}
                </p>
            </UPageHeader>
            <UPageBody>
                <ContentRenderer v-if="post" :value="post" />
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