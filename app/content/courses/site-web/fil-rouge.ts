/**
 * Fil rouge du cours « Un site web, comment ça marche ? » :
 * la fiche « Le chien du jour ».
 *
 * Toutes les versions de la fiche (HTML, CSS, JavaScript, Vue) sont définies
 * ici une seule fois, puis réutilisées par les diapositives et les
 * démonstrations. Modifier la fiche ici la modifie partout dans le cours.
 */

export const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random'

/** Adresse de l'API pour une race précise (« husky », « retriever/golden »…). */
export const dogBreedUrl = (breed: string) => `https://dog.ceo/api/breed/${breed}/images/random`

/** Liste complète des races reconnues par l'API. */
export const DOG_BREEDS_LIST_URL = 'https://dog.ceo/api/breeds/list/all'

/**
 * Exemples de races, avec leur nom dans l'API (en anglais, en minuscules).
 * Une sous-race s'écrit « race/sous-race ».
 */
export const DOG_BREEDS = [
  { id: 'husky', name: 'Husky' },
  { id: 'labrador', name: 'Labrador' },
  { id: 'beagle', name: 'Beagle' },
  { id: 'pug', name: 'Carlin' },
  { id: 'shiba', name: 'Shiba inu' },
  { id: 'dalmatian', name: 'Dalmatien' },
  { id: 'chihuahua', name: 'Chihuahua' },
  { id: 'samoyed', name: 'Samoyède' },
  { id: 'retriever/golden', name: 'Golden retriever' },
  { id: 'bulldog/french', name: 'Bouledogue français' },
] as const

/** Image locale utilisée avant le premier appel à l'API. */
export const DOG_PLACEHOLDER = 'images/chien.svg'

export const DOG_TEXT = 'Chaque jour, un nouveau compagnon à découvrir.'
export const DOG_JS_TEXT = 'Voici Rex, un golden retriever plein d’énergie !'

/* ------------------------------------------------------------------ HTML */

/** Première version : un titre, un texte, un bouton. */
export const HTML_V1 = `<div class="fiche">
  <h1>Le chien du jour</h1>
  <p>${DOG_TEXT}</p>
  <button>Découvrir un chien</button>
</div>`

/** Version avec image : c'est la fiche utilisée dans tout le reste du cours. */
export const HTML_CARD = `<div class="fiche">
  <h1>Le chien du jour</h1>
  <img src="${DOG_PLACEHOLDER}" alt="Un chien souriant">
  <p>${DOG_TEXT}</p>
  <button>Découvrir un chien</button>
</div>`

/* ------------------------------------------------------------------- CSS */

export interface CssDeclaration {
  prop: string
  value: string
  /** Étape à laquelle la déclaration apparaît (1 à 7). */
  step: number
}

export interface CssRule {
  selector: string
  decls: CssDeclaration[]
}

export const CSS_STEPS = [
  { id: 1, label: 'Couleur de fond', icon: 'PaintBucket' },
  { id: 2, label: 'Couleur du texte', icon: 'Palette' },
  { id: 3, label: 'Typographie', icon: 'Type' },
  { id: 4, label: 'Espacements', icon: 'MoveVertical' },
  { id: 5, label: 'Bordures arrondies', icon: 'SquareRoundCorner' },
  { id: 6, label: 'Le bouton', icon: 'MousePointerClick' },
  { id: 7, label: 'Mise en page', icon: 'LayoutTemplate' },
] as const

export const CSS_RULES: CssRule[] = [
  {
    selector: 'body',
    decls: [
      { prop: 'background', value: '#fdf2e4', step: 1 },
      { prop: 'font-family', value: 'system-ui, sans-serif', step: 3 },
      { prop: 'margin', value: '0', step: 7 },
      { prop: 'min-height', value: '100vh', step: 7 },
      { prop: 'display', value: 'grid', step: 7 },
      { prop: 'place-items', value: 'center', step: 7 },
    ],
  },
  {
    selector: '.fiche',
    decls: [
      { prop: 'background', value: 'white', step: 1 },
      { prop: 'padding', value: '24px', step: 4 },
      { prop: 'border-radius', value: '24px', step: 5 },
      { prop: 'box-shadow', value: '0 12px 32px rgb(0 0 0 / 0.12)', step: 5 },
      { prop: 'max-width', value: '300px', step: 7 },
      { prop: 'text-align', value: 'center', step: 7 },
    ],
  },
  {
    selector: 'h1',
    decls: [
      { prop: 'color', value: '#9a3412', step: 2 },
      { prop: 'font-size', value: '26px', step: 3 },
      { prop: 'margin', value: '0 0 16px', step: 4 },
    ],
  },
  {
    selector: 'img',
    decls: [
      { prop: 'border-radius', value: '16px', step: 5 },
      { prop: 'width', value: '100%', step: 7 },
      { prop: 'height', value: '190px', step: 7 },
      { prop: 'object-fit', value: 'cover', step: 7 },
    ],
  },
  {
    selector: 'p',
    decls: [
      { prop: 'color', value: '#57534e', step: 2 },
      { prop: 'line-height', value: '1.5', step: 3 },
      { prop: 'margin', value: '16px 0 20px', step: 4 },
    ],
  },
  {
    selector: 'button',
    decls: [
      { prop: 'background', value: '#ea580c', step: 6 },
      { prop: 'color', value: 'white', step: 6 },
      { prop: 'font', value: 'inherit', step: 6 },
      { prop: 'font-weight', value: '600', step: 6 },
      { prop: 'border', value: 'none', step: 6 },
      { prop: 'border-radius', value: '999px', step: 6 },
      { prop: 'padding', value: '12px 22px', step: 6 },
      { prop: 'cursor', value: 'pointer', step: 6 },
    ],
  },
]

/**
 * Produit la feuille de style jusqu'à une étape donnée, avec les numéros
 * des lignes ajoutées à cette étape (pour les mettre en évidence).
 */
export function buildCss(step: number): { css: string; added: number[] } {
  const lines: string[] = []
  const added: number[] = []
  for (const rule of CSS_RULES) {
    const decls = rule.decls.filter((d) => d.step <= step)
    if (!decls.length) continue
    // Une règle qui apparaît à cette étape est entièrement surlignée.
    const isNewRule = decls.every((d) => d.step === step)
    if (lines.length) lines.push('')
    lines.push(`${rule.selector} {`)
    if (isNewRule) added.push(lines.length)
    for (const d of decls) {
      lines.push(`  ${d.prop}: ${d.value};`)
      if (d.step === step) added.push(lines.length)
    }
    lines.push('}')
    if (isNewRule) added.push(lines.length)
  }
  return { css: lines.join('\n'), added }
}

/** Feuille de style complète de la fiche. */
export const CSS_CARD = buildCss(7).css

/** Ajout « responsive » : sur grand écran, la fiche passe à l'horizontale. */
export const CSS_RESPONSIVE = `/* Responsive : à partir de 560 px de large… */
@media (min-width: 560px) {
  .fiche {
    max-width: 560px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    align-items: center;
    text-align: left;
  }
  .fiche > * { grid-column: 2; }
  .fiche img {
    grid-column: 1;
    grid-row: 1 / span 3;
    height: 100%;
  }
}`

/* ------------------------------------------------------------ JavaScript */

export const JS_CLICK = `const bouton = document.querySelector('button');
const texte = document.querySelector('p');

bouton.addEventListener('click', () => {
  texte.textContent = '${DOG_JS_TEXT}';
});`

export const JS_FETCH = `const bouton = document.querySelector('button');
const image = document.querySelector('img');
const texte = document.querySelector('p');

bouton.addEventListener('click', async () => {
  texte.textContent = 'Chargement…';
  try {
    const reponse = await fetch('${DOG_API_URL}');
    const donnees = await reponse.json();
    image.src = donnees.message;
    texte.textContent = 'Voici votre chien du jour !';
  } catch (erreur) {
    texte.textContent = 'Oups, pas de réseau… Réessayez !';
  }
});`

/** Variante de JS_FETCH qui demande une race précise (ligne 9 : la race). */
export const JS_FETCH_BREED = `const bouton = document.querySelector('button');
const image = document.querySelector('img');
const texte = document.querySelector('p');

bouton.addEventListener('click', async () => {
  texte.textContent = 'Chargement…';
  try {
    // Changez « husky » : beagle, labrador, pug, shiba, dalmatian…
    const reponse = await fetch('${dogBreedUrl('husky')}');
    const donnees = await reponse.json();
    image.src = donnees.message;
    texte.textContent = 'Voici votre chien du jour !';
  } catch (erreur) {
    texte.textContent = 'Oups, pas de réseau… Réessayez !';
  }
});`

/** Lignes de JS_FETCH correspondant à chaque étape de la démonstration API. */
export const JS_FETCH_LINES = {
  loading: [6],
  request: [8],
  json: [9],
  read: [10],
  update: [10, 11],
  error: [12, 13],
} as const

/* ------------------------------------------------------------------- Vue */

export const VUE_CARD = `<script setup>
import { ref } from 'vue'

const image = ref('${DOG_PLACEHOLDER}')
const texte = ref('${DOG_TEXT}')
const chargement = ref(false)

async function decouvrir() {
  chargement.value = true
  const reponse = await fetch('${DOG_API_URL}')
  const donnees = await reponse.json()
  image.value = donnees.message
  texte.value = 'Voici votre chien du jour !'
  chargement.value = false
}
</script>

<template>
  <div class="fiche">
    <h1>Le chien du jour</h1>
    <img :src="image" alt="Un chien">
    <p>{{ texte }}</p>
    <button :disabled="chargement" @click="decouvrir">
      {{ chargement ? 'Chargement…' : 'Découvrir un chien' }}
    </button>
  </div>
</template>`

/* ------------------------------------------------- Frameworks JavaScript */

export const FRAMEWORK_SNIPPETS = {
  vue: `<script setup>
const texte = ref('Chaque jour…')
</script>

<template>
  <div class="fiche">
    <h1>Le chien du jour</h1>
    <p>{{ texte }}</p>
    <button @click="texte = 'Voici Rex !'">
      Découvrir un chien
    </button>
  </div>
</template>`,
  react: `function FicheChien() {
  const [texte, setTexte] = useState('Chaque jour…');

  return (
    <div className="fiche">
      <h1>Le chien du jour</h1>
      <p>{texte}</p>
      <button onClick={() => setTexte('Voici Rex !')}>
        Découvrir un chien
      </button>
    </div>
  );
}`,
  svelte: `<script>
  let texte = $state('Chaque jour…');
</script>

<div class="fiche">
  <h1>Le chien du jour</h1>
  <p>{texte}</p>
  <button onclick={() => texte = 'Voici Rex !'}>
    Découvrir un chien
  </button>
</div>`,
  angular: `@Component({
  selector: 'fiche-chien',
  template: \`
    <div class="fiche">
      <h1>Le chien du jour</h1>
      <p>{{ texte }}</p>
      <button (click)="decouvrir()">Découvrir un chien</button>
    </div>\`,
})
export class FicheChien {
  texte = 'Chaque jour…';
  decouvrir() { this.texte = 'Voici Rex !'; }
}`,
} as const

/* ----------------------------------------------------- Frameworks CSS */

export const CSS_FRAMEWORK_EXAMPLES = [
  {
    id: 'maison',
    label: 'CSS écrit à la main',
    description: 'On écrit nous-mêmes chaque règle. Liberté totale, mais tout est à faire.',
    head: '',
    html: `<div class="fiche">
  <h1>Le chien du jour</h1>
  <p>Chaque jour, un nouveau compagnon.</p>
  <button>Découvrir un chien</button>
</div>`,
    css: `.fiche {
  background: white;
  padding: 24px;
  border-radius: 24px;
  text-align: center;
}
button {
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
}`,
  },
  {
    id: 'bootstrap',
    label: 'Bootstrap',
    description: 'Des composants prêts à l’emploi : on choisit des classes comme « card » ou « btn ».',
    head: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">',
    html: `<div class="card text-center p-4 shadow">
  <h1 class="h3">Le chien du jour</h1>
  <p class="text-secondary">Chaque jour, un nouveau compagnon.</p>
  <button class="btn btn-warning rounded-pill">
    Découvrir un chien
  </button>
</div>`,
    css: '',
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    description: 'De petites classes utilitaires, une par effet, que l’on combine directement dans le HTML.',
    head: '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.4"></script>',
    html: `<div class="bg-white p-6 rounded-3xl shadow-lg text-center">
  <h1 class="text-2xl font-bold text-orange-800">Le chien du jour</h1>
  <p class="text-stone-600 my-4">Chaque jour, un nouveau compagnon.</p>
  <button class="bg-orange-600 text-white px-5 py-3 rounded-full">
    Découvrir un chien
  </button>
</div>`,
    css: '',
  },
] as const

/** Habillage commun des aperçus des frameworks CSS (fond + centrage). */
export const CSS_FRAMEWORK_STAGE = `body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fdf2e4; font-family: system-ui, sans-serif; padding: 16px; box-sizing: border-box; }
body > * { max-width: 300px; width: 100%; }`
