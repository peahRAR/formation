/**
 * Catalogue de la plateforme : les parcours et leurs cours.
 *
 * Pour ajouter un cours :
 *   1. créer un dossier dans app/content/courses/<mon-cours>/ exportant un `Course` ;
 *   2. l'ajouter dans le parcours voulu ci-dessous (ou remplacer son « À venir »).
 * Les routes, la sidebar et la progression s'adaptent automatiquement.
 */
import type { CatalogEntry, Course, LearningPath } from '../types/course'
import { courseSiteWeb } from './courses/site-web'

export const learningPaths: LearningPath[] = [
  {
    id: 'fondamentaux',
    title: 'Les fondamentaux du Web',
    description: 'Comprendre et construire ses premières pages.',
    icon: 'Compass',
    courses: [
      courseSiteWeb,
      {
        id: 'html-en-pratique',
        title: 'HTML en pratique',
        description: 'Structurer une vraie page : textes, liens, images, listes et formulaires.',
        category: 'fondamentaux',
        level: 'Débutant',
        duration: 90,
        status: 'coming-soon',
        icon: 'FileCode2',
      },
      {
        id: 'css-en-pratique',
        title: 'CSS en pratique',
        description: 'Couleurs, typographie, boîtes, Flexbox, Grid et responsive design.',
        category: 'fondamentaux',
        level: 'Débutant',
        duration: 120,
        status: 'coming-soon',
        icon: 'Paintbrush',
      },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript et interfaces',
    description: 'Rendre ses pages interactives, puis passer aux frameworks.',
    icon: 'Braces',
    courses: [
      {
        id: 'premiers-pas-javascript',
        title: 'Premiers pas en JavaScript',
        description: 'Variables, conditions, fonctions et événements, avec de petits projets.',
        category: 'javascript',
        level: 'Débutant',
        duration: 120,
        status: 'coming-soon',
        icon: 'Braces',
      },
      {
        id: 'decouvrir-vue',
        title: 'Découvrir Vue.js',
        description: 'Composants, données réactives et premiers écrans d’application.',
        category: 'javascript',
        level: 'Intermédiaire',
        duration: 150,
        status: 'coming-soon',
        icon: 'Component',
      },
    ],
  },
]

export function isFullCourse(entry: CatalogEntry): entry is Course {
  return entry.status !== 'coming-soon' && 'sections' in entry
}

/** Cours consultables (les brouillons sont exclus en production). */
export const publishedCourses: Course[] = learningPaths
  .flatMap((p) => p.courses)
  .filter(isFullCourse)
  .filter((c) => c.status === 'published' || import.meta.dev)

export function findCourse(id: string): Course | undefined {
  return publishedCourses.find((c) => c.id === id)
}
