<script setup lang="ts">
import type { QuizSlide } from '~/types/course'

defineProps<{ slide: QuizSlide; courseId: string }>()
</script>

<template>
  <div class="flex h-full flex-col">
    <SlideHeader :eyebrow="slide.eyebrow" :title="slide.title" :subtitle="slide.subtitle" />
    <QuizRunner class="min-h-0 flex-1" :questions="slide.questions" :course-id="courseId" />
  </div>
</template>
