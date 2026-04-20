<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const { data: page } = await useAsyncData(() => {
    return queryCollection("page").path("/page/about").first()
})

const breadcrumb = ref<BreadcrumbItem[]>([
    {
        label: "Home",
        icon: "i-tabler-home",
        to: "/"
    },
    {
        label: page.value?.title,
        icon: "i-tabler-article",
    },
])

useSeoMeta({
    title: "About | minittu",
    description: "このサイトについて"
})

defineOgImage("BlogOg.satori", { title: "About", description: "このサイトについて" })
</script>

<template>
    <UContainer>
        <UPage v-if="page">
            <UPageHeader :title="page?.title" :description="page?.description">
                <template #headline>
                    <UBreadcrumb :items="breadcrumb" class="mb-4" />
                </template>
            </UPageHeader>
            <UPageBody>
                <ContentRenderer v-if="page" :value="page" />
            </UPageBody>
            <template #right>
                <UPageAside>
                    <UContentToc highlight highlight-color="primary" highlight-variant="circuit" v-if="page"
                        :links="page.body.toc?.links" />
                </UPageAside>
            </template>
        </UPage>
    </UContainer>
</template>