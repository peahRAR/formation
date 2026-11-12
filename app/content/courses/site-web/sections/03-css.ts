import type { Section } from '../../../../types/course'
import { CSS_CARD, HTML_CARD } from '../fil-rouge'

export const sectionCss: Section = {
  id: 'css',
  title: 'CSS : donner du style',
  shortTitle: 'CSS',
  accent: 'blue',
  icon: 'Paintbrush',
  slides: [
    {
      id: 'css-intro',
      kind: 'illustration',
      illustration: 'css-anatomy',
      eyebrow: 'Section 3 · CSS',
      title: 'CSS : donner du style',
      subtitle: 'Le HTML dit ce qu’est le contenu. Le CSS (Cascading Style Sheets, « feuilles de style en cascade ») dit à quoi il ressemble.',
      notes: `CSS signifie Cascading Style Sheets, « feuilles de style en cascade ». Nous verrons un peu plus loin ce que veut dire « en cascade ».

Une règle CSS = un sélecteur (à qui ?) + des propriétés et des valeurs (quoi ?). Utiliser le bouton du schéma pour appliquer la règle et voir le bouton changer.`,
    },
    {
      id: 'css-etapes',
      kind: 'demo',
      demo: 'css-steps',
      props: { html: HTML_CARD },
      eyebrow: 'Section 3 · CSS',
      title: 'Habillons la fiche, étape par étape',
      subtitle: 'Le HTML ne change pas : on ajoute seulement des règles CSS.',
      notes: `Avancer étape par étape avec le bouton « Étape suivante » : les lignes ajoutées sont surlignées dans le code.

À chaque étape, demander au groupe ce qui a changé dans le rendu avant de le commenter.

Le sélecteur .fiche (avec un point) cible la classe que nous avions mise sur la div.`,
    },
    {
      id: 'css-cascade',
      kind: 'demo',
      demo: 'css-cascade',
      eyebrow: 'Section 3 · CSS',
      title: 'La cascade : quelle règle gagne ?',
      subtitle: 'Quand plusieurs règles visent le même élément, le navigateur suit trois principes.',
      notes: `C'est le « C » de CSS : Cascading Style Sheets, les feuilles de style en cascade. Les règles se lisent de haut en bas et s'empilent ; quand elles se contredisent, la cascade décide laquelle gagne.

Déroulé conseillé :
1. Règles B et C actives : deux règles « button » de même précision, c'est la dernière écrite (C, vert) qui gagne. Principe de l'ordre.
2. Activer A (.special) : elle est écrite en premier, et pourtant elle gagne, car une classe est plus précise qu'un nom de balise. Principe de la précision (on dit « spécificité »).
3. Activer D : la couleur posée sur .fiche descend vers h1 et p, ses enfants. Principe de l'héritage. On retrouve les poupées gigognes : ce qu'on donne à la grande poupée, les petites en profitent.

Message rassurant : en cas de doute, l'outil de développement du navigateur (clic droit → Inspecter) montre les règles barrées, exactement comme ici.`,
    },
    {
      id: 'css-imbrication',
      kind: 'demo',
      demo: 'css-nesting',
      eyebrow: 'Section 3 · CSS',
      title: 'Écrire son CSS de façon imbriquée',
      subtitle: 'On peut ranger les règles les unes dans les autres, comme les balises HTML : c’est le « nesting ».',
      notes: `Le CSS imbriqué (en anglais « nesting », on entend souvent « CSS nesté ») permet d'écrire les règles des enfants à l'intérieur de celle du parent, comme les poupées gigognes du HTML.

Survoler les blocs : .fiche h1 à plat correspond à h1 rangé dans .fiche. On n'a plus besoin de répéter .fiche à chaque règle.

Le symbole & veut dire « l'élément lui-même » : &:hover dans button signifie button:hover, l'état du bouton survolé par la souris.

Les navigateurs récents comprennent directement le CSS imbriqué. Cette écriture existe depuis longtemps dans Sass, un outil très utilisé qui transforme ce code en CSS classique.

Le résultat est strictement le même : c'est seulement une façon plus rangée d'écrire.`,
    },
    {
      id: 'css-a-vous',
      kind: 'demo',
      demo: 'code-playground',
      props: { html: HTML_CARD, css: CSS_CARD, editable: ['css'], initialTab: 'css' },
      eyebrow: 'Section 3 · À vous',
      title: 'À vous : modifiez la feuille de style',
      subtitle: 'Changez une couleur, une taille, un arrondi… puis réinitialisez si besoin.',
      notes: `Défis possibles : passer le bouton en vert, agrandir le titre, supprimer l'arrondi de la fiche.

Si une règle est mal écrite, le navigateur l'ignore simplement : le CSS est tolérant.`,
    },
    {
      id: 'css-responsive',
      kind: 'demo',
      demo: 'responsive',
      eyebrow: 'Section 3 · CSS',
      title: 'Le responsive design : s’adapter à l’écran',
      subtitle: 'Un site « responsive » s’adapte à la taille de l’écran : téléphone, tablette ou ordinateur.',
      notes: `Responsive vient de l'anglais « to respond », réagir : la page réagit à la taille de l'écran. On parle aussi de « design adaptatif ».

Plus de la moitié des visites se font aujourd'hui sur téléphone : le responsive design n'est pas une option.

Une règle @media applique des styles seulement si l'écran est assez large.

Cliquer sur les formats d'écran : sur un écran large, la fiche passe à l'horizontale. Pas besoin de détailler la syntaxe.`,
    },
  ],
}
