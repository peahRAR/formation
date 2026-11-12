import type { Course } from '../../../types/course'
import { sectionSiteWeb } from './sections/01-site-web'
import { sectionHtml } from './sections/02-html'
import { sectionCss } from './sections/03-css'
import { sectionCssFrameworks } from './sections/04-css-frameworks'
import { sectionDomJs } from './sections/05-dom-js'
import { sectionApi } from './sections/06-api'
import { sectionJsFrameworks } from './sections/07-js-frameworks'
import { sectionConclusion } from './sections/08-conclusion'

export const courseSiteWeb: Course = {
  id: 'site-web-comment-ca-marche',
  title: 'Un site web, comment ça marche ?',
  description:
    'Le préambule idéal : comprendre, avec un exemple concret, le rôle du HTML, du CSS, de JavaScript, du DOM, des API et des frameworks.',
  category: 'fondamentaux',
  level: 'Découverte',
  duration: 60,
  status: 'published',
  icon: 'Globe',
  objectives: [
    'Distinguer une page, un site, le navigateur et le serveur',
    'Identifier le rôle du HTML et du CSS',
    'Comprendre ce qu’est le DOM et ce que fait JavaScript',
    'Savoir à quoi sert une API',
    'Situer les principaux frameworks CSS et JavaScript',
  ],
  sections: [
    sectionSiteWeb,
    sectionHtml,
    sectionCss,
    sectionCssFrameworks,
    sectionDomJs,
    sectionApi,
    sectionJsFrameworks,
    sectionConclusion,
  ],
}
