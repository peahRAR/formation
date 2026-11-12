import { findCourse } from '~/content/catalog'

/** Récupère le cours de la route courante, ou lève une erreur 404. */
export function useCurrentCourse() {
  const route = useRoute()
  const course = computed(() => findCourse(String(route.params.courseId)))
  if (!course.value) {
    throw createError({ statusCode: 404, statusMessage: 'Cours introuvable', fatal: true })
  }
  return course as ComputedRef<NonNullable<typeof course.value>>
}
