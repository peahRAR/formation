<script setup lang="ts">
/**
 * Affiche une icône Lucide à partir de son nom (utilisé par le contenu).
 * `size` accepte un nombre de pixels ou une taille CSS relative (« 50% »).
 */
const props = defineProps<{ name?: string; size?: number | string; strokeWidth?: number }>()
const icon = computed(() => resolveIcon(props.name))
const numeric = computed(() => (typeof props.size === 'number' ? props.size : 20))
const style = computed(() => (typeof props.size === 'string' ? { width: props.size, height: props.size } : undefined))
</script>

<template>
  <component :is="icon" :size="numeric" :style="style" :stroke-width="strokeWidth ?? 2" aria-hidden="true" />
</template>
