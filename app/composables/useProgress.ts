/**
 * Progression de l'apprenant, conservée dans le navigateur (localStorage).
 * Aucun compte, aucune donnée envoyée : tout reste sur l'appareil.
 */
import type { Course } from '~/types/course'

interface CourseProgress {
  /** Identifiants des diapositives déjà vues. */
  seen: string[]
  /** Dernière diapositive consultée, par mode. */
  last: Partial<Record<string, string>>
  /** Réponses au quiz : id de question → index du choix. */
  quiz: Record<string, number>
  updatedAt: number
}

type ProgressStore = Record<string, CourseProgress>

const STORAGE_KEY = 'fw-progress-v1'

function emptyProgress(): CourseProgress {
  return { seen: [], last: {}, quiz: {}, updatedAt: 0 }
}

export function useProgress() {
  const store = useState<ProgressStore>('progress', () => ({}))
  const loaded = useState('progress-loaded', () => false)

  // Chargement côté client uniquement (pages pré-rendues au build).
  if (import.meta.client && !loaded.value) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) store.value = JSON.parse(raw)
    } catch {
      /* stockage indisponible : la progression reste en mémoire */
    }
    loaded.value = true
  }

  function persist() {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store.value))
    } catch {
      /* ignore */
    }
  }

  function get(courseId: string): CourseProgress {
    return store.value[courseId] ?? emptyProgress()
  }

  function ensure(courseId: string): CourseProgress {
    if (!store.value[courseId]) store.value[courseId] = emptyProgress()
    return store.value[courseId]!
  }

  function markSeen(courseId: string, slideId: string, mode: string) {
    const p = ensure(courseId)
    if (!p.seen.includes(slideId)) p.seen.push(slideId)
    p.last[mode] = slideId
    p.updatedAt = Date.now()
    persist()
  }

  function saveQuizAnswer(courseId: string, questionId: string, choice: number) {
    const p = ensure(courseId)
    p.quiz[questionId] = choice
    p.updatedAt = Date.now()
    persist()
  }

  function resetQuiz(courseId: string) {
    ensure(courseId).quiz = {}
    persist()
  }

  function resetCourse(courseId: string) {
    delete store.value[courseId]
    persist()
  }

  function hasSeen(courseId: string, slideId: string) {
    return get(courseId).seen.includes(slideId)
  }

  /** Pourcentage de diapositives vues (mode complet). */
  function percent(course: Course): number {
    const ids = course.sections.flatMap((s) => s.slides.map((sl) => sl.id))
    if (!ids.length) return 0
    const seen = new Set(get(course.id).seen)
    return Math.round((ids.filter((id) => seen.has(id)).length / ids.length) * 100)
  }

  function sectionPercent(courseId: string, slideIds: string[]): number {
    if (!slideIds.length) return 0
    const seen = new Set(get(courseId).seen)
    return Math.round((slideIds.filter((id) => seen.has(id)).length / slideIds.length) * 100)
  }

  return { store, get, markSeen, saveQuizAnswer, resetQuiz, resetCourse, hasSeen, percent, sectionPercent }
}
