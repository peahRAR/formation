<script setup lang="ts">
/** Barre supérieure des pages hors lecteur (accueil, sommaire, notes). */
defineProps<{ title?: string }>()
</script>

<template>
  <header class="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-bg/80 px-4 backdrop-blur print:hidden">
    <SidebarToggle only-when-hidden />
    <p v-if="title" class="min-w-0 flex-1 truncate text-sm font-semibold">{{ title }}</p>
    <span v-else class="flex-1" />
    <slot />
    <ThemeToggle />
  </header>
</template>
