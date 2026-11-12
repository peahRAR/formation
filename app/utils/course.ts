import type { Course, PlayerMode, PlayerSlide, Section } from '~/types/course'

/**
 * Séquence de diapositives pour un mode donné.
 * Les deux modes partagent exactement les mêmes objets : le mode express
 * ne fait que filtrer les diapositives marquées `express: true`.
 */
export function buildSequence(course: Course, mode: PlayerMode): PlayerSlide[] {
  const out: PlayerSlide[] = []
  course.sections.forEach((section, sectionIndex) => {
    for (const slide of section.slides) {
      if (mode === 'express' && !slide.express) continue
      out.push({ slide, section, sectionIndex, index: out.length })
    }
  })
  return out
}

export function countSlides(course: Course, mode: PlayerMode = 'complet'): number {
  return buildSequence(course, mode).length
}

export function sectionSlideIds(section: Section): string[] {
  return section.slides.map((s) => s.id)
}

export function playerLink(courseId: string, mode: PlayerMode, slideId?: string) {
  return { path: `/cours/${courseId}/${mode}`, query: slideId ? { diapo: slideId } : {} }
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m}` : `${h} h`
}
