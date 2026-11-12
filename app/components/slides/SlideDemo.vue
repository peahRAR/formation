<script setup lang="ts">
import type { DemoSlide } from '~/types/course'

const props = defineProps<{ slide: DemoSlide }>()
const component = computed(() => resolveDemo(props.slide.demo))
</script>

<template>
  <div class="flex h-full flex-col">
    <SlideHeader :eyebrow="slide.eyebrow" :title="slide.title" :subtitle="slide.subtitle" />
    <div class="flex min-h-0 flex-1 flex-col">
      <component :is="component" class="min-h-0 flex-1" v-bind="slide.props" />
    </div>
  </div>
</template>
