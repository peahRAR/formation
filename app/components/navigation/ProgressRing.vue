<script setup lang="ts">
/** Petit anneau de progression (0 à 100). */
const props = withDefaults(defineProps<{ value: number; size?: number }>(), { size: 22 })
const r = 9
const c = 2 * Math.PI * r
const offset = computed(() => c - (Math.min(100, Math.max(0, props.value)) / 100) * c)
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 22 22" class="shrink-0 -rotate-90" role="img" :aria-label="`${value} % terminé`">
    <circle cx="11" cy="11" :r="r" fill="none" stroke="var(--surface-3)" stroke-width="3" />
    <circle
      cx="11"
      cy="11"
      :r="r"
      fill="none"
      stroke="var(--accent)"
      stroke-width="3"
      stroke-linecap="round"
      :stroke-dasharray="c"
      :stroke-dashoffset="offset"
      class="transition-[stroke-dashoffset] duration-700"
    />
  </svg>
</template>
