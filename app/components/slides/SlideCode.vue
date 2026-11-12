<script setup lang="ts">
import { Info } from '@lucide/vue'
import type { CodeSlide } from '~/types/course'

defineProps<{ slide: CodeSlide }>()
</script>

<template>
  <div class="flex h-full flex-col">
    <SlideHeader :eyebrow="slide.eyebrow" :title="slide.title" :subtitle="slide.subtitle" />
    <div class="grid min-h-0 flex-1 gap-4" :class="slide.preview ? 'lg:grid-cols-2' : ''">
      <CodeViewer class="min-h-[14rem]" :files="slide.files" size="lg" dim-others />
      <LivePreview
        v-if="slide.preview"
        class="min-h-[16rem]"
        :html="slide.preview.html"
        :css="slide.preview.css"
        :js="slide.preview.js"
      />
    </div>
    <p v-if="slide.explanation" class="slide-body mt-4 flex items-start gap-3 text-muted">
      <Info class="mt-1 shrink-0 text-accent-fg" :size="20" />
      <span>{{ slide.explanation }}</span>
    </p>
  </div>
</template>
