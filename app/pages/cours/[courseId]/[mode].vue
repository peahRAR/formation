<script setup lang="ts">
/**
 * Lecteur d'un cours, en mode « complet » ou « express ».
 *
 * La diapositive courante vient de l'URL (?diapo=…), que la génération
 * statique ne connaît pas : le lecteur est donc rendu côté navigateur,
 * avec un squelette pendant le chargement.
 */
import type { PlayerMode } from '~/types/course'

definePageMeta({
  validate: (route) => route.params.mode === 'complet' || route.params.mode === 'express',
})

const route = useRoute()
const course = useCurrentCourse()
const mode = computed(() => route.params.mode as PlayerMode)

useHead(() => ({
  title: `${course.value.title} · ${mode.value === 'express' ? 'Présentation express' : 'Formation complète'}`,
  meta: [{ name: 'description', content: course.value.description }],
}))
</script>

<template>
  <ClientOnly>
    <SlidePlayer :key="mode" :course="course" :mode="mode" />
    <template #fallback>
      <PlayerSkeleton :title="course.title" />
    </template>
  </ClientOnly>
</template>
