import type { Section } from '../../../../types/course'

export const sectionSiteWeb: Section = {
  id: 'site-web',
  title: 'Qu’est-ce qu’un site web ?',
  shortTitle: 'Un site web ?',
  accent: 'indigo',
  icon: 'Globe',
  slides: [
    {
      id: 'couverture',
      kind: 'title',
      express: true,
      eyebrow: 'Cours 1 · Découverte',
      title: 'Un site web, comment ça marche ?',
      subtitle: 'Une visite guidée des coulisses du Web, pensée pour les débutants complets.',
      icon: 'Globe',
      notes: `Accueillir le groupe et rassurer : aucun prérequis, on ne va pas devenir développeur en une heure.

L'objectif est d'avoir une vision d'ensemble : savoir ce que font HTML, CSS, JavaScript, le DOM, une API et les frameworks.

Astuce : la touche F passe en plein écran, la touche S masque la barre latérale, la touche N affiche ces notes.`,
    },
    {
      id: 'fil-rouge',
      kind: 'demo',
      express: true,
      demo: 'dog-teaser',
      eyebrow: 'Notre fil rouge',
      title: 'La fiche « Le chien du jour »',
      subtitle: 'Voici où nous allons arriver. Nous la construirons ensemble, étape par étape.',
      notes: `Montrer la fiche terminée et cliquer sur le bouton : une vraie photo de chien arrive depuis Internet.

Annoncer le programme : nous allons repartir de zéro et ajouter une technologie à chaque étape. Chaque pastille correspond à une section du cours.`,
    },
    {
      id: 'page-et-site',
      kind: 'illustration',
      illustration: 'page-vs-site',
      eyebrow: 'Section 1 · Les bases',
      title: 'Une page, un site',
      subtitle: 'Une page web est un document affiché par le navigateur. Un site web est un ensemble de pages reliées entre elles.',
      notes: `Faire le parallèle avec un livre : une page web est une page, le site est le livre entier, et les liens servent de table des matières.

Cliquer sur les pages du schéma pour montrer la navigation d'une page à l'autre.`,
    },
    {
      id: 'navigateur',
      kind: 'illustration',
      express: true,
      illustration: 'browser-server',
      eyebrow: 'Section 1 · Les bases',
      title: 'Le rôle du navigateur',
      subtitle: 'Le navigateur demande la page à un serveur, puis l’affiche à l’écran.',
      notes: `Le navigateur (Chrome, Firefox, Safari, Edge…) est le logiciel qui affiche les pages.

Le serveur est un ordinateur, quelque part, qui garde les fichiers du site et les envoie quand on les demande. Inutile ici de parler d'adresses IP ou de DNS : retenir seulement « demander » puis « afficher ».

Lancer l'animation avec le bouton et commenter chaque étape.`,
    },
    {
      id: 'front-back',
      kind: 'illustration',
      illustration: 'front-back',
      eyebrow: 'Section 1 · Les bases',
      title: 'Front-end et back-end',
      subtitle: 'Tout site a un front-end. Le back-end n’est là que si le site doit retenir des données.',
      notes: `Front-end : tout ce qui s'exécute dans le navigateur, ce que l'on voit et avec quoi on interagit. Tout site web en a un.

Back-end : un programme qui tourne sur un serveur, qui enregistre les données et calcule les réponses. Il n'est pas obligatoire : un portfolio ou le site vitrine d'un restaurant peuvent n'être que des fichiers HTML, CSS et JavaScript envoyés tels quels. Ce sont pourtant de vrais sites web.

Exemple parlant : cette formation n'a pas de back-end. La progression est enregistrée dans le navigateur.

Survoler les exemples du bas : pour un site « front-end seul », la carte back-end s'estompe.

La diapositive suivante développe l'analogie du restaurant.`,
    },
    {
      id: 'restaurant',
      kind: 'illustration',
      express: true,
      illustration: 'restaurant',
      props: { variant: 'front-back' },
      eyebrow: 'Section 1 · Les bases',
      title: 'Un site web, c’est comme un restaurant',
      subtitle: 'La salle, le serveur, la cuisine : chacun a son rôle.',
      notes: `Dérouler les cinq étapes (bouton Lecture ou flèches de la légende) et faire deviner l'équivalent web avant de l'afficher.

La salle = le front-end : tout ce que le client voit (décor = CSS, carte = contenu HTML).
Le serveur = l'aller-retour entre la salle et la cuisine (sur le Web, ces échanges passent par Internet) : le client ne va jamais en cuisine.
La cuisine = le back-end ; les réserves = les données (base de données).
Le plat servi = la réponse, que le navigateur affiche.

Si la question vient : un site sans back-end, c'est un peu un restaurant sans cuisine qui sert des plats déjà prêts. Ça reste un restaurant !

Nous retrouverons ce restaurant dans la section 6 : le serveur y jouera le rôle de l'API. Dans ce cours, nous travaillons surtout côté salle (front-end).`,
    },
  ],
}
