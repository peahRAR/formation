<script setup lang="ts">
import type { ComparisonSlide } from '~/types/course'

defineProps<{ slide: ComparisonSlide }>()
</script>

<template>
  <div class="flex h-full flex-col">
    <SlideHeader :eyebrow="slide.eyebrow" :title="slide.title" :subtitle="slide.subtitle" />
    <BeforeAfter class="min-h-[20rem] flex-1" :before="slide.before" :after="slide.after" />
    <p v-if="slide.caption" class="slide-body mt-4 text-center font-medium text-muted">{{ slide.caption }}</p>
  </div>
</template>
