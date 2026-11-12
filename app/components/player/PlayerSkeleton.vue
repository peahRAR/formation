<script setup lang="ts">
/** Affiché pendant le chargement du lecteur (pages pré-rendues). */
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex h-full flex-col" aria-busy="true">
    <div class="flex h-14 items-center gap-3 border-b border-border px-4">
      <span class="h-3 w-48 animate-pulse rounded-full bg-surface-3" />
    </div>
    <div class="grid flex-1 place-items-center px-6 text-center">
      <div>
        <div class="mx-auto mb-6 size-16 animate-pulse rounded-2xl bg-surface-3" />
        <p class="text-2xl font-bold tracking-tight">{{ title }}</p>
        <p class="mt-2 text-sm text-muted">Chargement de la présentation…</p>
      </div>
    </div>
    <div class="h-16 border-t border-border" />
  </div>
</template>
