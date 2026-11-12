import type { Course, PlayerSlide, Section } from '~/types/course'

/** Toutes les diapositives du cours, dans l'ordre, avec leur position. */
export function buildSequence(course: Course): PlayerSlide[] {
  const out: PlayerSlide[] = []
  course.sections.forEach((section, sectionIndex) => {
    for (const slide of section.slides) {
      out.push({ slide, section, sectionIndex, index: out.length })
    }
  })
  return out
}

export function countSlides(course: Course): number {
  return buildSequence(course).length
}

export function sectionSlideIds(section: Section): string[] {
  return section.slides.map((s) => s.id)
}

export function playerLink(courseId: string, slideId?: string) {
  return { path: `/cours/${courseId}/presentation`, query: slideId ? { diapo: slideId } : {} }
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m}` : `${h} h`
}
