<script setup lang="ts">
const { platform } = useAppConfig()
</script>

<template>
  <NuxtLink to="/" class="group flex min-w-0 items-center gap-3 rounded-xl" aria-label="Accueil">
    <span class="grid size-9 shrink-0 place-items-center rounded-xl bg-[oklch(0.55_0.2_275)] text-white shadow-md shadow-indigo-500/20 transition group-hover:rotate-[-6deg]">
      <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5" />
      </svg>
    </span>
    <span class="min-w-0 leading-tight">
      <span class="block truncate text-[0.95rem] font-bold tracking-tight">{{ platform.name }}</span>
      <span class="block truncate text-xs text-subtle">{{ platform.tagline }}</span>
    </span>
  </NuxtLink>
</template>
