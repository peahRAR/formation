# Formation Web

Plateforme pédagogique gratuite pour apprendre le développement web à l'aide de **présentations interactives** : diapositives animées, code modifiable, démonstrations en direct et quiz.

Elle s'utilise aussi bien **devant une classe** (plein écran, notes du formateur) que **seul**, à son rythme (progression enregistrée dans le navigateur, sans compte).

Premier cours disponible : **« Un site web, comment ça marche ? »**, 8 sections et 44 diapositives.

---

## Sommaire

- [Démarrage rapide](#démarrage-rapide)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Ajouter un cours](#ajouter-un-cours)
- [Ajouter un type de démonstration](#ajouter-une-démonstration-ou-une-illustration)
- [Déploiement sur Netlify](#déploiement-sur-netlify)

---

## Démarrage rapide

Prérequis : **Node.js 20.19 ou plus récent** (Node 22 recommandé, voir `.nvmrc`).

```bash
nvm use            # si vous utilisez nvm
npm install
npm run dev        # http://localhost:3000
```

| Commande           | Rôle                                                       |
| ------------------ | ---------------------------------------------------------- |
| `npm run dev`      | Serveur de développement avec rechargement à chaud         |
| `npm run build`    | Build de production                                        |
| `npm run generate` | Génération statique complète dans `.output/public`         |
| `npm run preview`  | Prévisualise localement le résultat du build               |
| `npm run typecheck`| Vérification TypeScript (Vue + TS)                         |

## Fonctionnalités

**Lecteur de diapositives**

- Navigation précédente / suivante, barre de progression découpée par section (cliquable), compteur.
- URL directe vers chaque diapositive : `/cours/<cours>/presentation?diapo=<identifiant>`.
- Transitions légères, typographie proportionnelle à la largeur de l'écran (lisible au vidéoprojecteur).
- Raccourcis clavier :

  | Touche | Action |
  | --- | --- |
  | `→` `Espace` `Page↓` | Diapositive suivante |
  | `←` `Maj+Espace` `Page↑` | Diapositive précédente |
  | `Début` / `Fin` | Première / dernière diapositive |
  | `F` | Plein écran |
  | `S` | Masquer / afficher la barre latérale |
  | `N` | Notes du formateur |
  | `?` | Aide des raccourcis |
  | `Échap` | Fermer un panneau, quitter un éditeur de code |

**Outils pédagogiques**

- Visionneuse de code avec coloration syntaxique (HTML, CSS, JS, JSON, Vue), onglets, mise en évidence de lignes et bouton de copie.
- Aperçu du résultat dans une **iframe isolée** (`sandbox="allow-scripts"` sans `allow-same-origin`) : le code de l'apprenant ne peut pas accéder à la page principale. Les erreurs et `console.log` s'affichent sous l'aperçu.
- Éditeurs de code avec bouton de réinitialisation.
- Comparaison avant / après à curseur, schémas animés, quiz avec correction.
- Démonstration réelle de l'API publique [Dog CEO](https://dog.ceo/dog-api/), appelée **depuis le navigateur** (compatible avec la génération statique), avec gestion des erreurs et simulation de panne.
- Notes du formateur : panneau latéral (touche `N`) et page dédiée imprimable (`/cours/<cours>/notes`).

**Interface**

- Barre latérale : parcours, cours (dont cours « À venir »), sections, progression, section courante ; entièrement masquable ; menu coulissant sur mobile.
- Mode clair / sombre (préférence système par défaut, mémorisée).

## Architecture

```
app/
├── app.config.ts              Nom et slogan de la plateforme
├── assets/css/main.css        Tailwind CSS 4 + design system (thèmes, couleurs par technologie)
├── types/course.ts            Modèle de données des cours (types TypeScript)
├── content/                   CONTENU : aucune dépendance vers l'interface
│   ├── catalog.ts             Parcours et liste des cours
│   ├── routes.ts              Routes à pré-rendre (lues par nuxt.config.ts)
│   └── courses/site-web/
│       ├── index.ts           Métadonnées du cours + ordre des sections
│       ├── fil-rouge.ts       La fiche « Le chien du jour » (HTML, CSS, JS, Vue)
│       └── sections/          Une section par fichier (01-site-web.ts …)
├── components/
│   ├── navigation/            Sidebar, logo, bascules (thème, menu)
│   ├── player/                Lecteur : barre du haut, contrôles, notes, aide clavier
│   ├── slides/                Un composant par type de diapositive + quiz
│   ├── code/                  Visionneuse, éditeur, aperçu isolé, bac à sable, avant/après
│   ├── demos/                 Démonstrations interactives (par thème)
│   ├── illustrations/         Schémas animés
│   └── ui/                    Petits composants génériques (AppIcon)
├── composables/               Progression, thème, état de l'interface, plein écran, API Dog CEO
├── layouts/default.vue        Mise en page sidebar + contenu
├── pages/                     Accueil, sommaire, lecteur (presentation.vue), notes
└── utils/                     Coloration syntaxique, document d'aperçu, registre, icônes…
```

**Principe :** le contenu (`app/content`) ne décrit que des données typées. Une diapositive de démonstration ou d'illustration désigne son composant par une **clé** (`demo: 'css-steps'`), résolue par le registre `app/utils/slideRegistry.ts`. Chaque composant de démonstration est chargé à la demande.

Types de diapositives disponibles : `title`, `text`, `illustration`, `code`, `demo`, `comparison`, `quiz`.

## Ajouter un cours

1. **Créer le dossier** `app/content/courses/mon-cours/` avec un fichier `index.ts` :

   ```ts
   import type { Course } from '../../../types/course'
   import { sectionIntro } from './sections/01-intro'

   export const courseMonCours: Course = {
     id: 'mon-cours',                // utilisé dans l'URL
     title: 'Mon cours',
     description: 'Ce que l’on va apprendre.',
     category: 'fondamentaux',       // identifiant du parcours
     level: 'Débutant',
     duration: 45,                   // durée indicative, en minutes
     status: 'published',            // 'draft' = visible uniquement en dev
     icon: 'BookOpen',               // icône Lucide
     objectives: ['…'],
     sections: [sectionIntro],
   }
   ```

2. **Écrire les sections** (un fichier par section) :

   ```ts
   import type { Section } from '../../../../types/course'

   export const sectionIntro: Section = {
     id: 'intro',
     title: 'Introduction',
     accent: 'indigo',               // indigo, orange, blue, sky, amber, emerald, violet, rose
     icon: 'Sparkles',
     slides: [
       {
         id: 'bienvenue',
         kind: 'text',
         title: 'Bienvenue',
         lead: 'Une phrase d’introduction.',
         points: [{ icon: 'Check', title: 'Un point clé', text: 'Une explication courte.' }],
         notes: 'Notes du formateur (paragraphes séparés par une ligne vide).',
       },
       {
         id: 'exemple',
         kind: 'demo',
         demo: 'code-playground',    // bac à sable générique
         title: 'À vous !',
         props: { html: '<p>Bonjour</p>', css: 'p { color: red; }', editable: ['css'] },
       },
     ],
   }
   ```

3. **Référencer le cours** dans `app/content/catalog.ts`, dans le parcours voulu (ou à la place de son entrée « À venir »).

C'est tout : la sidebar, la page d'accueil, le sommaire, la progression et la génération statique des routes s'adaptent automatiquement.

> Icônes : le contenu nomme les icônes Lucide en PascalCase. Pour en utiliser une nouvelle, ajoutez-la dans `app/utils/icons.ts` (seules les icônes listées sont incluses dans le bundle).

## Ajouter une démonstration ou une illustration

1. Créer le composant dans `app/components/demos/<thème>/` (ou `illustrations/`). Il reçoit les `props` de la diapositive et doit occuper la hauteur disponible (sa racine reçoit `flex-1`).
2. L'enregistrer dans `app/utils/slideRegistry.ts` sous une clé.
3. L'utiliser dans le contenu : `{ kind: 'demo', demo: 'ma-cle', props: { … } }`.

Composants réutilisables utiles : `CodeViewer`, `CodeEditor`, `LivePreview`, `CodePlayground`, `BeforeAfter`.

## Déploiement sur Netlify

Le site est **100 % statique** : `npm run generate` pré-rend toutes les pages dans `.output/public`. Aucune fonction serverless n'est nécessaire ; l'API Dog CEO est appelée directement par le navigateur.

Le preset Nitro est forcé à `static` dans `nuxt.config.ts`, pour que le dossier de sortie soit toujours `.output/public`, y compris sur Netlify (qui sélectionnerait sinon automatiquement son propre preset et un autre dossier de publication).

La configuration est déjà dans `netlify.toml` :

```toml
[build]
  command = "npm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "22"
```

### Déploiement continu depuis GitHub

1. Créer un dépôt sur GitHub, puis y pousser le projet :

   ```bash
   git init            # si ce n'est pas déjà fait
   git add .
   git commit -m "Première version de la plateforme"
   git branch -M main
   git remote add origin git@github.com:<utilisateur>/formation.git
   git push -u origin main
   ```

2. Sur [app.netlify.com](https://app.netlify.com) : **Add new site → Import an existing project → GitHub**, puis choisir le dépôt.
3. Netlify lit `netlify.toml` : vérifier que la commande de build est `npm run generate` et le répertoire de publication `.output/public`, puis **Deploy**.
4. Chaque `git push` sur `main` redéploie automatiquement le site. Les pull requests obtiennent une URL de prévisualisation (Deploy Previews).

### Vérifier le build localement avant de déployer

```bash
npm run generate
npx serve .output/public     # ou : npm run preview
```

La sortie de `npm run generate` doit se terminer par `Generated public .output/public`.

---

## Choix techniques

- **Nuxt 4**, **Vue 3** (Composition API, `<script setup>`), **TypeScript** strict.
- **Tailwind CSS 4** via l'intégration officielle Vite (`@tailwindcss/vite`).
- **Lucide** (`@lucide/vue`) pour les icônes, importées individuellement.
- Pas d'autre dépendance d'exécution : la coloration syntaxique, l'éditeur de code et les animations sont écrits sur mesure, légers et adaptés aux exemples du cours.
- Aucune donnée personnelle collectée : la progression reste dans le `localStorage` du navigateur.

Les aperçus Bootstrap et Tailwind de la section 4 chargent ces frameworks depuis le CDN jsDelivr, et la démonstration API interroge `dog.ceo` : ces diapositives demandent une connexion Internet.

Les logos des frameworks (`public/logos/`) proviennent de [Devicon](https://devicon.dev) (licence MIT) ; ils restent des marques de leurs propriétaires respectifs et ne sont utilisés que pour les identifier.
