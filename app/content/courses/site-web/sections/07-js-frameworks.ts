import type { Section } from '../../../../types/course'

export const sectionJsFrameworks: Section = {
  id: 'frameworks-js',
  title: 'Les frameworks JavaScript',
  shortTitle: 'Frameworks JS',
  accent: 'violet',
  icon: 'Component',
  slides: [
    {
      id: 'frameworks-js-pourquoi',
      kind: 'text',
      express: true,
      eyebrow: 'Section 7 · Frameworks JavaScript',
      title: 'Quand l’interface grandit…',
      lead: 'Une fiche, ça va. Mais une application avec des centaines de boutons, de listes et de formulaires devient vite difficile à gérer « à la main ».',
      points: [
        { icon: 'Puzzle', title: 'Des composants', text: 'On découpe l’interface en briques réutilisables : une fiche, un menu, un bouton.' },
        { icon: 'RefreshCw', title: 'Les données pilotent l’affichage', text: 'On change une donnée : la page se met à jour toute seule.' },
        { icon: 'FolderTree', title: 'Une organisation commune', text: 'Toute l’équipe range son code de la même façon.' },
      ],
      notes: `Dans notre JavaScript, nous devions aller chercher chaque élément (querySelector) puis le modifier nous-mêmes.

Avec un framework, on décrit plutôt « ce que la page doit afficher en fonction des données », et l'outil s'occupe de mettre à jour le DOM.`,
    },
    {
      id: 'frameworks-js-panorama',
      kind: 'demo',
      express: true,
      demo: 'js-frameworks',
      eyebrow: 'Section 7 · Frameworks JavaScript',
      title: 'Quatre outils très utilisés',
      subtitle: 'Mêmes objectifs, philosophies différentes. Cliquez sur chacun pour voir notre fiche écrite avec lui.',
      notes: `Points communs : tous créent des composants, tous mettent à jour le DOM automatiquement, tous produisent au final du HTML, du CSS et du JavaScript.

Différences de philosophie, en une phrase :
- Vue.js : progressif et accessible, proche du HTML.
- React : une bibliothèque centrée sur les composants, écrits en JavaScript (JSX).
- Svelte : un compilateur, le moins de code possible.
- Angular : un cadre complet et structuré, apprécié des grandes équipes.`,
    },
    {
      id: 'frameworks-js-vue',
      kind: 'demo',
      express: true,
      demo: 'vue-component',
      eyebrow: 'Section 7 · Frameworks JavaScript',
      title: 'Notre fiche, en composant Vue.js',
      subtitle: 'Les données (image, texte, chargement) pilotent l’affichage. Plus de querySelector !',
      notes: `Faire remarquer les trois parties : le script (les données et l'action), le template (le HTML, avec des {{ }} pour afficher les données), et le style que l'on pourrait ajouter.

Quand image.value change, Vue met à jour l'image tout seul.

Clin d'œil : la plateforme que vous utilisez en ce moment est elle-même construite avec Vue.js (via Nuxt), et la fiche à droite est un vrai composant Vue.`,
    },
    {
      id: 'frameworks-js-optionnel',
      kind: 'text',
      eyebrow: 'Section 7 · Frameworks JavaScript',
      title: 'Un framework n’est pas obligatoire',
      points: [
        { icon: 'CircleCheck', title: 'HTML, CSS et JavaScript suffisent', text: 'Notre fiche fonctionnait parfaitement sans framework.' },
        { icon: 'TrendingUp', title: 'Utile quand le projet grandit', text: 'Le framework aide à organiser et à maintenir une grande interface.' },
        { icon: 'Layers', title: 'Les bases restent les mêmes', text: 'Tous reposent sur HTML, CSS, JavaScript et le DOM.' },
      ],
      takeaway: 'Comprendre les bases d’abord, c’est comprendre tous les frameworks ensuite.',
      notes: `Message important pour les débutants : il n'est pas nécessaire de choisir un framework avant d'avoir compris les bases.

Annoncer que de futurs cours approfondiront chaque technologie, dont Vue.js.`,
    },
  ],
}
