import type { Section } from '../../../../types/course'
import { CSS_CARD, HTML_CARD, JS_FETCH_BREED } from '../fil-rouge'

export const sectionApi: Section = {
  id: 'api',
  title: 'Communiquer avec une API',
  shortTitle: 'Une API',
  accent: 'emerald',
  icon: 'ArrowLeftRight',
  slides: [
    {
      id: 'api-question',
      kind: 'text',
      express: true,
      statement: true,
      eyebrow: 'Section 6 · API',
      title: 'Et si nous voulions afficher des informations qui ne se trouvent pas déjà dans notre page ?',
      subtitle: 'Par exemple : une photo de chien différente à chaque clic, parmi des milliers.',
      notes: `Laisser le groupe proposer des idées : mettre toutes les photos dans la page ? Impossible, il y en a des milliers et la liste change.

La solution : demander la photo, au moment du clic, à un service qui les possède.`,
    },
    {
      id: 'api-role',
      kind: 'illustration',
      express: true,
      illustration: 'api-role',
      eyebrow: 'Section 6 · API',
      title: 'Une API : un guichet pour demander des données',
      subtitle: 'Notre page (front-end) pose une question ; un autre service (back-end) répond.',
      notes: `Rappel : le front-end s'exécute dans le navigateur, le back-end sur un serveur.

Une API (interface de programmation) est une porte d'entrée prévue pour les programmes : on lui envoie une demande précise à une adresse précise, elle renvoie des données.

La diapositive suivante reprend le restaurant de la section 1, avec l'API dans le rôle du serveur.

Nous utilisons l'API publique et gratuite Dog CEO : https://dog.ceo`,
    },
    {
      id: 'api-restaurant',
      kind: 'illustration',
      illustration: 'restaurant',
      props: { variant: 'api' },
      eyebrow: 'Section 6 · API',
      title: 'Retour au restaurant',
      subtitle: 'L’API, c’est le serveur : on commande ce qui est sur la carte, il rapporte le plat.',
      notes: `Rappeler le restaurant de la section 1. Cette fois, la carte affichée au mur est celle de Dog CEO : on ne peut demander que ce qui y figure (un chien au hasard, un chien d'une race, la liste des races).

Chaque « plat » de la carte correspond à une adresse précise de l'API. Le plat servi n'est pas une page mais des données JSON, que notre page doit ensuite « dresser » à l'écran.`,
    },
    {
      id: 'api-dialogue',
      kind: 'illustration',
      illustration: 'api-dialogue',
      eyebrow: 'Section 6 · API',
      title: 'Le dialogue, étape par étape',
      subtitle: 'Notre page → API → Réponse → Mise à jour de la page',
      notes: `Dérouler l'animation et faire reformuler chaque étape par le groupe.

Ce dialogue prend en général moins d'une seconde.`,
    },
    {
      id: 'api-json',
      kind: 'illustration',
      illustration: 'json-anatomy',
      eyebrow: 'Section 6 · API',
      title: 'JSON : des données bien rangées',
      subtitle: 'L’API ne renvoie pas une page, mais des données structurées au format JSON.',
      notes: `JSON (JavaScript Object Notation) range les données sous forme de paires « nom : valeur ».

Pas besoin d'en connaître la syntaxe : retenir que c'est un format lisible à la fois par les humains et par les programmes.`,
    },
    {
      id: 'api-demo',
      kind: 'demo',
      express: true,
      demo: 'api-live',
      eyebrow: 'Section 6 · API',
      title: 'La vraie démonstration',
      subtitle: 'Le bouton effectue maintenant une véritable requête vers l’API Dog CEO.',
      notes: `Cliquer plusieurs fois : chaque clic produit une nouvelle requête et une nouvelle photo.

Suivre les étapes qui s'allument : chargement, requête avec fetch(), réponse JSON, lecture de l'adresse de l'image, mise à jour.

L'option « Simuler une panne » permet de montrer la gestion des erreurs : un message simple et un bouton pour réessayer.`,
    },
    {
      id: 'api-races',
      kind: 'demo',
      demo: 'api-breeds',
      eyebrow: 'Section 6 · API',
      title: 'Commander une race précise',
      subtitle: 'Il suffit de changer un mot dans l’adresse de l’API.',
      notes: `Cliquer sur quelques races : la race s'écrit dans l'adresse, entre « breed/ » et « /images/random ». C'est cette même adresse que l'on passe à fetch() dans le code (ligne surlignée).

Les noms sont ceux de l'API : en anglais, en minuscules, sans espace. Une sous-race s'écrit après une barre oblique : retriever/golden, bulldog/french.

Essayer « chat » : l'API répond par une erreur (status "error", code 404). C'est l'occasion de rappeler que le code doit prévoir les cas où la réponse n'est pas celle attendue.

La liste complète des races est elle-même disponible via l'API : https://dog.ceo/api/breeds/list/all`,
    },
    {
      id: 'api-a-vous',
      kind: 'demo',
      demo: 'code-playground',
      props: { html: HTML_CARD, css: CSS_CARD, js: JS_FETCH_BREED, editable: ['js'], initialTab: 'js' },
      eyebrow: 'Section 6 · À vous',
      title: 'À vous : appelez l’API',
      subtitle: 'Ligne 9, remplacez « husky » par beagle, labrador, pug, shiba, dalmatian ou retriever/golden.',
      notes: `Défi : changer la race à la ligne 9 (le commentaire juste au-dessus donne des idées), puis cliquer sur le bouton de l'aperçu.

Pour revenir aux chiens au hasard : https://dog.ceo/api/breeds/image/random

Ajouter console.log(donnees) pour voir le JSON reçu sous l'aperçu.`,
    },
  ],
}
