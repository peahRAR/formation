import type { Section } from '../../../../types/course'
import { HTML_CARD, HTML_V1 } from '../fil-rouge'

export const sectionHtml: Section = {
  id: 'html',
  title: 'HTML : créer la structure',
  shortTitle: 'HTML',
  accent: 'orange',
  icon: 'FileCode2',
  slides: [
    {
      id: 'html-intro',
      kind: 'text',
      express: true,
      eyebrow: 'Section 2 · HTML',
      title: 'HTML : créer la structure',
      lead: 'HTML décrit le contenu d’une page et le rôle de chaque morceau : « ceci est un titre », « ceci est un paragraphe », « ceci est un bouton ».',
      points: [
        { icon: 'Tag', title: 'Des étiquettes', text: 'On entoure le contenu de balises, comme <p> … </p>.' },
        { icon: 'Layers', title: 'Des boîtes dans des boîtes', text: 'Une balise peut en contenir d’autres.' },
        { icon: 'Monitor', title: 'Le navigateur affiche', text: 'Il lit les balises et présente le contenu.' },
      ],
      takeaway: 'HTML = la structure et le sens (on dit que le HTML est « sémantique »). Pas encore l’apparence.',
      notes: `HTML signifie HyperText Markup Language : un langage de balisage, pas un langage de programmation. On ne « calcule » rien, on décrit.

Insister sur l'idée d'étiquettes : chaque balise indique ce que représente le contenu.`,
    },
    {
      id: 'html-premiere-fiche',
      kind: 'demo',
      express: true,
      demo: 'html-linked',
      props: { html: HTML_V1, file: 'index.html' },
      eyebrow: 'Section 2 · HTML',
      title: 'Notre fiche, en HTML',
      subtitle: 'Survolez une ligne du code : l’élément correspondant s’allume dans le rendu, et inversement.',
      notes: `Faire remarquer que le rendu est volontairement « brut » : ce sont les styles par défaut du navigateur. Le titre est gros et gras parce que le navigateur sait que c'est un titre.

Survoler chaque ligne pour montrer la correspondance code ↔ rendu. Faire repérer les balises ouvrantes et fermantes.`,
    },
    {
      id: 'html-imbrication',
      kind: 'demo',
      express: true,
      demo: 'html-nesting',
      eyebrow: 'Section 2 · HTML',
      title: 'Des balises dans des balises',
      subtitle: 'Comme des poupées gigognes : chaque balise peut en contenir une plus petite.',
      notes: `Ouvrir les poupées une à une : body contient div, qui contient p, qui contient strong.

Vocabulaire : la balise qui en contient une autre est son « parent », celle qui est contenue est son « enfant ». Le décalage (indentation) du code rend cette hiérarchie visible : plus une ligne est décalée, plus la poupée est petite.

Survoler les lignes du code : la poupée correspondante est sélectionnée.

Montrer l'erreur classique : on referme toujours d'abord la dernière balise ouverte, comme on referme d'abord la plus petite poupée.

Cette idée d'emboîtement servira à nouveau pour le DOM (section 5), qui est un arbre de ces poupées.`,
    },
    {
      id: 'html-balises',
      kind: 'demo',
      express: true,
      demo: 'html-tags',
      props: { html: HTML_CARD },
      eyebrow: 'Section 2 · HTML',
      title: 'Cinq balises pour commencer',
      subtitle: 'Il en existe une centaine, mais quelques-unes suffisent pour notre fiche.',
      notes: `Nous avons ajouté une image à la fiche. Cliquer sur chaque balise pour la retrouver dans le code et dans le rendu.

Point d'attention : img n'a pas de balise fermante, et ses informations passent par des attributs (src pour le fichier, alt pour la description).

div est une boîte neutre qui sert à regrouper : elle ne se voit pas, mais elle organise.`,
    },
    {
      id: 'html-image',
      kind: 'code',
      eyebrow: 'Section 2 · HTML',
      title: 'Ajouter une image',
      files: [{ name: 'index.html', lang: 'html', code: HTML_CARD, highlight: [3] }],
      preview: { html: HTML_CARD },
      explanation: 'La balise img n’a pas de contenu : l’attribut src indique le fichier de l’image, et alt la décrit pour les personnes qui ne la voient pas.',
      notes: `Les attributs complètent une balise : nom="valeur".

Le texte alternatif (alt) est lu par les lecteurs d'écran et s'affiche si l'image ne charge pas. C'est une bonne habitude dès le départ.`,
    },
    {
      id: 'html-sens',
      kind: 'text',
      eyebrow: 'Section 2 · HTML',
      title: 'Le HTML sémantique',
      lead: '« Sémantique » veut dire « qui concerne le sens ». Écrire du HTML sémantique, c’est choisir la balise qui dit ce qu’est le contenu.',
      points: [
        { icon: 'AppWindow', title: 'Pour le navigateur', text: 'Il sait afficher un titre comme un titre et rendre un bouton cliquable.' },
        { icon: 'Ear', title: 'Pour les lecteurs d’écran', text: 'Ils annoncent « titre », « bouton »… aux personnes malvoyantes.' },
        { icon: 'Search', title: 'Pour les moteurs de recherche', text: 'Ils comprennent mieux de quoi parle la page (on parle de référencement, ou SEO).' },
      ],
      takeaway: 'Un texte en gros n’est pas forcément un titre : c’est la balise h1 qui le dit.',
      notes: `Le mot clé de la diapositive : sémantique, du grec « sêma », le signe, le sens.

Notion d'accessibilité, présentée simplement : le Web doit être utilisable par tous.

On peut faire « ressembler » n'importe quoi à un titre avec du CSS, mais seule la balise lui donne le sens de titre.`,
    },
    {
      id: 'html-semantique-demo',
      kind: 'demo',
      demo: 'html-semantic',
      eyebrow: 'Section 2 · HTML',
      title: 'Des div partout, ou du HTML sémantique ?',
      subtitle: 'Même rendu à l’écran, mais pas du tout le même sens pour les machines.',
      notes: `Basculer entre les deux versions : le rendu ne change pas, mais la liste « Ce qu'entend un lecteur d'écran » change complètement.

Dans la version « tout en div », le faux bouton n'est qu'un texte : impossible de l'atteindre avec la touche Tab, et un lecteur d'écran ne l'annonce pas comme cliquable.

Présenter les balises sémantiques de structure : header (en-tête), main (contenu principal), article (contenu autonome), footer (pied de page), en plus de h1, h2, p et button.

Survoler une ligne du code ou de la liste pour faire le lien.`,
    },
    {
      id: 'html-a-vous',
      kind: 'demo',
      demo: 'code-playground',
      props: { html: HTML_CARD, editable: ['html'] },
      eyebrow: 'Section 2 · À vous',
      title: 'À vous : modifiez le HTML',
      subtitle: 'Changez le titre, le texte du bouton, ajoutez un paragraphe… Le rendu se met à jour tout seul.',
      notes: `Proposer de petits défis : changer le titre, ajouter un second paragraphe, supprimer l'image.

Le bouton « Réinitialiser » remet le code d'origine. Rien ne peut être cassé : l'aperçu tourne dans un espace isolé.`,
    },
  ],
}
