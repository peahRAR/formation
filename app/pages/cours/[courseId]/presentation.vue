<script setup lang="ts">
/**
 * Lecteur d'un cours.
 *
 * La diapositive courante vient de l'URL (?diapo=…), que la génération
 * statique ne connaît pas : le lecteur est donc rendu côté navigateur,
 * avec un squelette pendant le chargement.
 */
const course = useCurrentCourse()

useHead(() => ({
  title: course.value.title,
  meta: [{ name: 'description', content: course.value.description }],
}))
</script>

<template>
  <ClientOnly>
    <SlidePlayer :course="course" />
    <template #fallback>
      <PlayerSkeleton :title="course.title" />
    </template>
  </ClientOnly>
</template>
