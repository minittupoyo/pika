<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

// const route = useRoute()
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light'
    }
})

const items: NavigationMenuItem[] = [
    {
        label: "Home",
        to: "/",
    },
    {
        label: "About",
        to: "/about",
    },
    {
        label: "Blog",
        to: "/blog",
    },
]
</script>

<template>
    <UHeader title="minittu" to="/" mode="modal">
        <UNavigationMenu variant="link" :items="items" />
        <template #right>
            <UColorModeButton />
        </template>
        <template #body>
            <UNavigationMenu orientation="vertical" :items="items" class="-mx-2.5" />
        </template>
    </UHeader>
    <UMain>
        <slot />
    </UMain>
    <USeparator icon="i-tabler-brand-nuxt" />
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">
                &copy; {{ new Date().getFullYear() }} minittu.
            </p>
        </template>
        <UNavigationMenu :items="items" variant="link" />
        <template #right>
            <UButton icon="i-tabler-brand-github" to="https://github.com/minittupoyo" color="neutral" target="_blank" variant="ghost" />
            <UButton icon="i-tabler-code" to="https://github.com/minittupoyo/pika" color="neutral" target="_blank" variant="ghost" />
        </template>
    </UFooter>
</template>