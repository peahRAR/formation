/**
 * Routes à pré-rendre lors de `npm run generate`.
 * Importé par nuxt.config.ts : n'utiliser ici que des imports relatifs.
 */
import { learningPaths, isFullCourse } from './catalog'

export function prerenderRoutes(): string[] {
  return learningPaths
    .flatMap((p) => p.courses)
    .filter(isFullCourse)
    .filter((c) => c.status === 'published')
    .flatMap((c) => [`/cours/${c.id}`, `/cours/${c.id}/presentation`, `/cours/${c.id}/notes`])
}
