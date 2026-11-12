<script setup lang="ts">
import type { IllustrationSlide } from '~/types/course'

const props = defineProps<{ slide: IllustrationSlide }>()
const component = computed(() => resolveIllustration(props.slide.illustration))
</script>

<template>
  <div class="flex h-full flex-col">
    <SlideHeader :eyebrow="slide.eyebrow" :title="slide.title" :subtitle="slide.subtitle" />
    <div class="flex min-h-0 flex-1 flex-col">
      <component :is="component" class="min-h-0 flex-1" v-bind="slide.props" />
    </div>
    <p v-if="slide.caption" class="slide-small mt-4 text-center text-muted">{{ slide.caption }}</p>
  </div>
</template>
