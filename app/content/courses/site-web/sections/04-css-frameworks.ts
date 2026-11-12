import type { Section } from '../../../../types/course'

export const sectionCssFrameworks: Section = {
  id: 'frameworks-css',
  title: 'Les frameworks CSS',
  shortTitle: 'Frameworks CSS',
  accent: 'sky',
  icon: 'Blocks',
  slides: [
    {
      id: 'frameworks-css-intro',
      kind: 'text',
      eyebrow: 'Section 4 · Frameworks CSS',
      title: 'Écrire son CSS… ou se faire aider',
      lead: 'Sur un grand site, on réécrit souvent les mêmes styles : boutons, grilles, cartes, marges. Des outils proposent des styles déjà prêts.',
      points: [
        { icon: 'PenLine', title: 'Tout écrire soi-même', text: 'Liberté totale, mais tout est à faire et à organiser.' },
        { icon: 'Blocks', title: 'Utiliser un framework CSS', text: 'Des styles prêts à l’emploi, pour aller plus vite.' },
        { icon: 'Shuffle', title: 'Mélanger les deux', text: 'Un framework pour la base, du CSS maison pour le reste.' },
      ],
      takeaway: 'Ces outils produisent toujours du CSS : ils ne le remplacent pas.',
      notes: `Rester au niveau de la découverte : pas d'installation, pas de configuration.

Un framework CSS est une boîte à outils de styles déjà écrits par d'autres.`,
    },
    {
      id: 'frameworks-css-comparaison',
      kind: 'demo',
      express: true,
      demo: 'css-frameworks',
      eyebrow: 'Section 4 · Frameworks CSS',
      title: 'Une même fiche, trois façons',
      subtitle: 'Comparez le code nécessaire et le résultat obtenu.',
      notes: `CSS maison : on écrit les règles dans une feuille de style séparée.

Bootstrap : on utilise des composants nommés (card, btn). Le style est déjà décidé, on obtient vite un rendu propre et classique.

Tailwind : chaque classe fait une seule chose (bg-white, p-6, rounded-full). On compose son propre design directement dans le HTML.

Les aperçus chargent les frameworks depuis Internet : une connexion est nécessaire.`,
    },
    {
      id: 'frameworks-css-differences',
      kind: 'text',
      eyebrow: 'Section 4 · Frameworks CSS',
      title: 'Bootstrap ou Tailwind ?',
      points: [
        { icon: 'Package', title: 'Bootstrap', text: 'Des composants complets et cohérents. Idéal pour obtenir vite une interface classique.' },
        { icon: 'Wind', title: 'Tailwind CSS', text: 'De petites briques utilitaires. Idéal pour créer un design sur mesure sans écrire de feuille de style.' },
        { icon: 'Scale', title: 'Pas de « meilleur » choix', text: 'Cela dépend du projet, de l’équipe… et des goûts !' },
      ],
      takeaway: 'Aucun framework CSS n’est obligatoire : comprendre le CSS reste la base.',
      notes: `Il existe beaucoup d'autres outils (Bulma, Foundation, UnoCSS…). Nous ne présentons que les deux plus répandus.

Cette plateforme elle-même est construite avec Tailwind CSS.`,
    },
  ],
}
