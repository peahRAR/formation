<script setup lang="ts">
/** Choisit le composant de diapositive selon son type. */
import type { Slide } from '~/types/course'

defineProps<{ slide: Slide; courseId: string }>()
</script>

<template>
  <SlideTitle v-if="slide.kind === 'title'" :slide="slide" />
  <SlideText v-else-if="slide.kind === 'text'" :slide="slide" />
  <SlideIllustration v-else-if="slide.kind === 'illustration'" :slide="slide" />
  <SlideCode v-else-if="slide.kind === 'code'" :slide="slide" />
  <SlideDemo v-else-if="slide.kind === 'demo'" :slide="slide" />
  <SlideComparison v-else-if="slide.kind === 'comparison'" :slide="slide" />
  <SlideQuiz v-else-if="slide.kind === 'quiz'" :slide="slide" :course-id="courseId" />
</template>
