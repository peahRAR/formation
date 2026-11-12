import type { Section } from '../../../../types/course'
import { CSS_CARD, HTML_CARD, JS_CLICK } from '../fil-rouge'

export const sectionDomJs: Section = {
  id: 'dom-javascript',
  title: 'Le DOM et JavaScript',
  shortTitle: 'DOM et JavaScript',
  accent: 'amber',
  icon: 'Braces',
  slides: [
    {
      id: 'dom-intro',
      kind: 'text',
      eyebrow: 'Section 5 · Le DOM',
      title: 'Le navigateur construit le DOM',
      lead: 'En lisant le HTML, le navigateur fabrique en mémoire une représentation de la page : le DOM (Document Object Model).',
      points: [
        { icon: 'Network', title: 'Un arbre', text: 'Chaque balise devient un nœud ; les balises qu’elle contient sont ses enfants.' },
        { icon: 'Zap', title: 'Vivant', text: 'Si le DOM change, l’affichage change aussitôt.' },
        { icon: 'Braces', title: 'Accessible', text: 'JavaScript peut le lire et le modifier.' },
      ],
      notes: `Analogie : un arbre généalogique. La div « fiche » est le parent ; le titre, l'image, le paragraphe et le bouton sont ses enfants.

Le fichier HTML est la recette ; le DOM est le plat préparé, que l'on peut encore modifier.`,
    },
    {
      id: 'dom-construction',
      kind: 'demo',
      express: true,
      demo: 'dom-build',
      props: { html: HTML_CARD },
      eyebrow: 'Section 5 · Le DOM',
      title: 'Du code HTML à l’arbre DOM',
      subtitle: 'Le navigateur lit le HTML ligne par ligne et construit un arbre : le DOM.',
      notes: `Lancer la construction : chaque ligne lue ajoute un nœud dans l'arbre.

Le DOM est la représentation de la page que garde le navigateur. C'est lui, et non le fichier HTML, que JavaScript va manipuler.`,
    },
    {
      id: 'dom-explorateur',
      kind: 'demo',
      express: true,
      demo: 'dom-explorer',
      eyebrow: 'Section 5 · Le DOM',
      title: 'Explorez l’arbre',
      subtitle: 'Sélectionnez un nœud : il s’allume dans le code et dans la page.',
      notes: `Trois vues d'une même chose : le code (ce que l'on écrit), l'arbre (ce que le navigateur comprend), le rendu (ce que l'on voit).

Cliquer sur « p » puis sur « button » : ce sont les deux éléments que JavaScript va utiliser juste après.`,
    },
    {
      id: 'js-intro',
      kind: 'text',
      eyebrow: 'Section 5 · JavaScript',
      title: 'JavaScript : donner vie à la page',
      lead: 'JavaScript est un langage de programmation exécuté par le navigateur. Il ajoute des comportements.',
      points: [
        { icon: 'MousePointerClick', title: 'Réagir', text: 'À un clic, une touche, un défilement… : ce sont des événements.' },
        { icon: 'PencilLine', title: 'Modifier', text: 'Changer un texte, une image, une couleur, en agissant sur le DOM.' },
        { icon: 'CloudDownload', title: 'Communiquer', text: 'Demander des données à un autre service (section suivante).' },
      ],
      takeaway: 'HTML = structure · CSS = apparence · JavaScript = comportement',
      notes: `Attention à la confusion fréquente : JavaScript n'a rien à voir avec Java, malgré le nom.

Nous n'apprenons pas à programmer ici : nous regardons ce que JavaScript permet de faire.`,
    },
    {
      id: 'js-clic',
      kind: 'demo',
      express: true,
      demo: 'js-click',
      eyebrow: 'Section 5 · JavaScript',
      title: 'Quand on clique, le texte change',
      subtitle: 'Suivez les quatre étapes, puis cliquez sur le bouton de la fiche.',
      notes: `Les quatre étapes :
1. L'événement : JavaScript « écoute » le clic sur le bouton.
2. Le sélecteur : querySelector va chercher un élément dans le DOM, comme un sélecteur CSS.
3. La modification : on remplace le texte du paragraphe (textContent).
4. La mise à jour : le DOM a changé, le navigateur redessine la page.

Le code n'a été écrit qu'une fois : il attend, puis s'exécute à chaque clic.`,
    },
    {
      id: 'js-a-vous',
      kind: 'demo',
      demo: 'code-playground',
      props: { html: HTML_CARD, css: CSS_CARD, js: JS_CLICK, editable: ['js'], initialTab: 'js' },
      eyebrow: 'Section 5 · À vous',
      title: 'À vous : changez le comportement',
      subtitle: 'Modifiez le texte affiché au clic, ou changez aussi le titre. Le code tourne dans un espace isolé.',
      notes: `Défis possibles :
- changer le message affiché ;
- modifier aussi le titre (document.querySelector('h1')) ;
- afficher un message dans la console avec console.log('Clic !').

Les erreurs éventuelles s'affichent sous l'aperçu.`,
    },
  ],
}
