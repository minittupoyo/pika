<template>
    <div class="w-full flex flex-row justify-start items-start">
        <NuxtImg src="/icon.png" class="w-16 h-16 rounded-full" />
        <div class="flex flex-col items-start justify-start text-left ml-4">
            <p class="text-lg font-bold">みにっつ</p>
            <p class="text-sm text-muted">18歳、無職の人間です。<br>趣味でプログラミングもどきをやっています。</p>
            <div class="flex flex-row items-center gap-2 mt-2">
                <NuxtLink to="https://github.com/minittupoyo" target="_blank" rel="noopener noreferrer" class="text-md text-muted">
                    <UIcon name="i-tabler-brand-github" />
                </NuxtLink>
                <NuxtLink to="https://zenn.dev/minittu" target="_blank" rel="noopener noreferrer" class="text-md text-muted">
                    <UIcon name="i-custom-zenn" />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>