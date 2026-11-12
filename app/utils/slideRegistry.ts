/**
 * Registre des démonstrations et illustrations.
 *
 * Le contenu des cours désigne un composant par une clé (ex. demo: 'css-steps').
 * Chaque composant est chargé à la demande (code splitting) : une diapositive
 * ne télécharge que ce dont elle a besoin.
 *
 * Pour ajouter une démonstration : créer le composant dans
 * components/demos/ (ou components/illustrations/) puis l'enregistrer ici.
 */
import { defineAsyncComponent, h, type Component } from 'vue'

const lazy = (loader: () => Promise<{ default: Component }>) => defineAsyncComponent(loader)

export const demoRegistry: Record<string, Component> = {
  // Génériques
  'code-playground': lazy(() => import('~/components/code/CodePlayground.vue')),
  'html-linked': lazy(() => import('~/components/demos/html/HtmlLinkedDemo.vue')),
  // Cours « Un site web, comment ça marche ? »
  'dog-teaser': lazy(() => import('~/components/demos/intro/DogTeaserDemo.vue')),
  'html-nesting': lazy(() => import('~/components/demos/html/HtmlNestingDemo.vue')),
  'html-semantic': lazy(() => import('~/components/demos/html/HtmlSemanticDemo.vue')),
  'html-tags': lazy(() => import('~/components/demos/html/HtmlTagsDemo.vue')),
  'css-steps': lazy(() => import('~/components/demos/css/CssStepsDemo.vue')),
  'css-cascade': lazy(() => import('~/components/demos/css/CssCascadeDemo.vue')),
  'css-nesting': lazy(() => import('~/components/demos/css/CssNestingDemo.vue')),
  responsive: lazy(() => import('~/components/demos/css/ResponsiveDemo.vue')),
  'css-frameworks': lazy(() => import('~/components/demos/css/CssFrameworksDemo.vue')),
  'dom-build': lazy(() => import('~/components/demos/dom/DomBuildDemo.vue')),
  'dom-explorer': lazy(() => import('~/components/demos/dom/DomExplorerDemo.vue')),
  'js-click': lazy(() => import('~/components/demos/js/JsClickDemo.vue')),
  'api-breeds': lazy(() => import('~/components/demos/api/ApiBreedsDemo.vue')),
  'api-live': lazy(() => import('~/components/demos/api/ApiLiveDemo.vue')),
  'js-frameworks': lazy(() => import('~/components/demos/frameworks/JsFrameworksDemo.vue')),
  'vue-component': lazy(() => import('~/components/demos/frameworks/VueComponentDemo.vue')),
  recap: lazy(() => import('~/components/demos/conclusion/RecapDemo.vue')),
}

export const illustrationRegistry: Record<string, Component> = {
  'page-vs-site': lazy(() => import('~/components/illustrations/PageVsSite.vue')),
  'browser-server': lazy(() => import('~/components/illustrations/BrowserServer.vue')),
  restaurant: lazy(() => import('~/components/illustrations/RestaurantScene.vue')),
  'front-back': lazy(() => import('~/components/illustrations/FrontBack.vue')),
  'css-anatomy': lazy(() => import('~/components/illustrations/CssAnatomy.vue')),
  'api-role': lazy(() => import('~/components/illustrations/ApiRole.vue')),
  'api-dialogue': lazy(() => import('~/components/illustrations/ApiDialogue.vue')),
  'json-anatomy': lazy(() => import('~/components/illustrations/JsonAnatomy.vue')),
}

function missing(kind: string, key: string): Component {
  return {
    render: () =>
      h('div', { class: 'card grid h-full place-items-center p-8 text-muted' }, `${kind} « ${key} » introuvable dans le registre.`),
  }
}

export function resolveDemo(key: string): Component {
  return demoRegistry[key] ?? missing('Démonstration', key)
}

export function resolveIllustration(key: string): Component {
  return illustrationRegistry[key] ?? missing('Illustration', key)
}
