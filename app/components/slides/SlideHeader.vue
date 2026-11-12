<script setup lang="ts">
/** En-tête commun : surtitre, titre et sous-titre d'une diapositive. */
defineProps<{ eyebrow?: string; title: string; subtitle?: string; center?: boolean }>()
</script>

<template>
  <header class="mb-[clamp(1rem,2.2cqi,2.25rem)] max-w-[62rem]" :class="center ? 'mx-auto text-center' : ''">
    <p v-if="eyebrow" class="slide-eyebrow mb-3">{{ eyebrow }}</p>
    <h2 class="slide-title">{{ title }}</h2>
    <p v-if="subtitle" class="slide-subtitle mt-3">{{ subtitle }}</p>
  </header>
</template>
