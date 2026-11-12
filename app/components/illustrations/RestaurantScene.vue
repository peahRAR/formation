<script setup lang="ts">
/**
 * La métaphore du restaurant, illustrée et animée pas à pas.
 *
 * - variant « front-back » : la salle (front-end), le serveur qui fait le lien
 *   (les échanges), la cuisine (back-end) et ses réserves (les données).
 * - variant « api » : la carte (ce que l'API propose), le serveur (l'API),
 *   la cuisine Dog CEO et le plat servi (la réponse JSON).
 */
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from '@lucide/vue'

const props = withDefaults(defineProps<{ variant?: 'front-back' | 'api' }>(), { variant: 'front-back' })

type Zone = 'salle' | 'passe' | 'cuisine'
interface Step {
  zone: Zone
  title: string
  resto: string
  web: string
  /** Texte du web affiché en police code. */
  code?: boolean
  bubble?: string
  /** Position du serveur : à table ou en cuisine. */
  waiter: 'salle' | 'cuisine'
  tray: 'vide' | 'commande' | 'plat'
  /** Le plat est posé sur la table. */
  served?: boolean
  cooking?: boolean
}

const FRONT_BACK: Step[] = [
  {
    zone: 'salle',
    title: 'La salle, c’est le front-end',
    resto: 'Le client voit la décoration, la carte, la table. C’est là qu’il s’installe et choisit.',
    web: 'La page affichée dans votre navigateur : textes, images, couleurs, boutons.',
    waiter: 'salle',
    tray: 'vide',
  },
  {
    zone: 'salle',
    title: 'Le client passe commande',
    resto: 'Il lève la main et dit au serveur ce qu’il veut.',
    web: 'Vous cliquez sur un bouton ou un lien.',
    bubble: 'Le plat du jour, s’il vous plaît !',
    waiter: 'salle',
    tray: 'commande',
  },
  {
    zone: 'passe',
    title: 'Le serveur porte la commande en cuisine',
    resto: 'Le client ne va jamais en cuisine : quelqu’un fait l’aller-retour pour lui.',
    web: 'Le navigateur envoie une demande, à travers Internet, à un serveur.',
    waiter: 'cuisine',
    tray: 'commande',
  },
  {
    zone: 'cuisine',
    title: 'La cuisine, c’est le back-end',
    resto: 'Le chef prend les ingrédients dans les réserves et prépare le plat. Personne en salle ne le voit.',
    web: 'L’ordinateur serveur lit ses données (comptes, photos, articles…) et prépare la réponse.',
    waiter: 'cuisine',
    tray: 'vide',
    cooking: true,
  },
  {
    zone: 'salle',
    title: 'Le plat arrive à table',
    resto: 'Le serveur rapporte le plat et le pose devant le client.',
    web: 'La réponse revient : le navigateur l’affiche, la page est à jour.',
    waiter: 'salle',
    tray: 'plat',
    served: true,
  },
]

const API: Step[] = [
  {
    zone: 'salle',
    title: 'La carte : ce que l’on peut commander',
    resto: 'On ne commande pas n’importe quoi : seulement ce qui est écrit sur la carte.',
    web: 'L’API publie la liste des demandes possibles et leurs adresses (sa « documentation »).',
    waiter: 'salle',
    tray: 'vide',
  },
  {
    zone: 'salle',
    title: 'Notre page commande',
    resto: 'Le client passe une commande précise.',
    web: "fetch('https://dog.ceo/api/breeds/image/random')",
    code: true,
    bubble: 'Un chien au hasard, s’il vous plaît !',
    waiter: 'salle',
    tray: 'commande',
  },
  {
    zone: 'passe',
    title: 'L’API, c’est le serveur du restaurant',
    resto: 'Il prend la commande, la transmet en cuisine et rapportera le plat.',
    web: 'L’API reçoit la requête et la confie au service Dog CEO.',
    waiter: 'cuisine',
    tray: 'commande',
  },
  {
    zone: 'cuisine',
    title: 'La cuisine Dog CEO',
    resto: 'En réserve : des milliers de photos de chiens, rangées par race.',
    web: 'Le back-end de Dog CEO choisit une photo au hasard.',
    waiter: 'cuisine',
    tray: 'vide',
    cooking: true,
  },
  {
    zone: 'salle',
    title: 'Le plat servi : des données JSON',
    resto: 'Le serveur apporte le plat ; à nous de le « déguster » (de l’afficher).',
    web: '{ "message": "https://images.dog.ceo/…jpg", "status": "success" }',
    code: true,
    waiter: 'salle',
    tray: 'plat',
    served: true,
  },
]

const steps = computed(() => (props.variant === 'api' ? API : FRONT_BACK))
const step = ref(0)
const current = computed(() => steps.value[step.value]!)

const legend = computed(() =>
  props.variant === 'api'
    ? [
        { zone: 'salle', resto: 'Le client', web: 'Notre page' },
        { zone: 'salle', resto: 'La carte', web: 'Les adresses de l’API' },
        { zone: 'passe', resto: 'Le serveur', web: 'L’API' },
        { zone: 'cuisine', resto: 'La cuisine', web: 'Le back-end Dog CEO' },
        { zone: 'salle', resto: 'Le plat', web: 'La réponse JSON' },
      ]
    : [
        { zone: 'salle', resto: 'La salle', web: 'Le front-end' },
        { zone: 'salle', resto: 'Le client', web: 'Vous, avec le navigateur' },
        { zone: 'passe', resto: 'Le serveur', web: 'Les demandes et les réponses' },
        { zone: 'cuisine', resto: 'La cuisine', web: 'Le back-end' },
        { zone: 'cuisine', resto: 'Les réserves', web: 'Les données' },
      ],
)

const playing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
function stop() {
  playing.value = false
  clearInterval(timer)
}
function go(i: number) {
  stop()
  step.value = Math.max(0, Math.min(steps.value.length - 1, i))
}
function play() {
  if (playing.value) return stop()
  if (step.value >= steps.value.length - 1) step.value = 0
  playing.value = true
  timer = setInterval(() => {
    if (step.value >= steps.value.length - 1) return stop()
    step.value++
  }, 3200)
}
onBeforeUnmount(stop)

const waiterX = computed(() => (current.value.waiter === 'salle' ? 395 : 585))
const zoneBox: Record<Zone, { x: number; w: number }> = {
  salle: { x: 6, w: 438 },
  passe: { x: 438, w: 120 },
  cuisine: { x: 552, w: 402 },
}
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-3">
    <!-- Scène illustrée -->
    <div class="card relative min-h-0 flex-1 overflow-hidden p-2">
      <svg viewBox="0 0 960 370" class="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" :aria-label="`Illustration : ${current.title}`">
        <!-- Murs -->
        <rect x="0" y="0" width="445" height="340" class="wall-salle" />
        <rect x="550" y="0" width="410" height="340" class="wall-cuisine" />
        <g class="tiles">
          <template v-for="r in 6" :key="`r${r}`">
            <line x1="550" :y1="r * 48" x2="960" :y2="r * 48" />
          </template>
          <template v-for="c in 8" :key="`c${c}`">
            <line :x1="550 + c * 52" y1="0" :x2="550 + c * 52" y2="290" />
          </template>
        </g>
        <!-- Sol -->
        <rect x="0" y="340" width="960" height="30" class="floor" />

        <!-- Étiquettes de zone -->
        <text x="24" y="34" class="zone-label">LA SALLE</text>
        <text x="936" y="34" text-anchor="end" class="zone-label">LA CUISINE</text>

        <!-- Décor de la salle : un tableau -->
        <g>
          <rect x="36" y="78" width="78" height="54" rx="3" class="frame" />
          <path d="M42 126 l20-24 l14 15 l10-10 l22 19z" class="frame-art" />
          <circle cx="96" cy="94" r="7" class="frame-sun" />
        </g>

        <!-- La carte : une ardoise au mur -->
        <g :class="{ pulse: variant === 'api' && step === 0 }">
          <path d="M196 64 L262 40 L328 64" fill="none" class="board-wire" />
          <circle cx="262" cy="40" r="4" class="board-nail" />
          <rect x="184" y="62" width="156" height="112" rx="6" class="board" />
          <text x="262" y="88" text-anchor="middle" class="board-title">{{ variant === 'api' ? 'Carte Dog CEO' : 'La carte' }}</text>
          <template v-if="variant === 'api'">
            <text x="198" y="112" class="board-item">· Un chien au hasard</text>
            <text x="198" y="134" class="board-item">· Un chien d’une race</text>
            <text x="198" y="156" class="board-item">· La liste des races</text>
          </template>
          <template v-else>
            <text x="198" y="112" class="board-item">· Plat du jour</text>
            <text x="198" y="134" class="board-item">· Salade du chef</text>
            <text x="198" y="156" class="board-item">· Tarte maison</text>
          </template>
        </g>

        <!-- Chaise + client -->
        <g>
          <rect x="70" y="200" width="12" height="140" rx="4" class="chair" />
          <rect x="70" y="262" width="70" height="12" rx="4" class="chair" />
          <rect x="128" y="274" width="10" height="66" rx="3" class="chair" />
          <!-- corps -->
          <path d="M92 270 v-58 q0-22 24-22 h4 q24 0 24 22 v58z" class="client-body" />
          <!-- jambes -->
          <path d="M100 262 h64 v14 h-64z" class="client-legs" />
          <rect x="152" y="268" width="14" height="72" rx="6" class="client-legs" />
          <!-- tête -->
          <circle cx="118" cy="166" r="22" class="skin" />
          <path d="M96 164 q2-28 26-26 q18 2 18 18 q-14-8-30 0 q-8 4-14 8z" class="hair" />
          <circle cx="130" cy="166" r="2.6" class="eye" />
          <path d="M128 178 q6 4 11-1" class="mouth" />
          <!-- bras : levé pour commander -->
          <g class="arm" :class="{ raised: current.bubble }">
            <path d="M126 204 q30 10 54 40" class="client-arm" />
            <circle cx="182" cy="246" r="8" class="skin" />
          </g>
        </g>

        <!-- Table -->
        <g>
          <rect x="170" y="252" width="150" height="10" rx="3" class="table-top" />
          <path d="M176 262 h138 l-8 36 h-122z" class="tablecloth" />
          <rect x="240" y="262" width="10" height="78" class="table-leg" />
          <rect x="214" y="336" width="62" height="6" rx="3" class="table-leg" />
          <!-- assiette / plat servi -->
          <ellipse cx="262" cy="250" rx="34" ry="7" class="plate" />
          <Transition name="dish">
            <g v-if="current.served" key="served">
              <template v-if="variant === 'api'">
                <rect x="232" y="214" width="60" height="34" rx="8" class="json-plate" />
                <text x="262" y="237" text-anchor="middle" class="json-text">{ }</text>
              </template>
              <template v-else>
                <path d="M236 246 q26-34 52 0z" class="food" />
                <circle cx="252" cy="236" r="5" class="food-2" />
                <circle cx="270" cy="232" r="4" class="food-3" />
              </template>
              <path d="M244 210 q4-8 0-16 M262 206 q4-8 0-16 M280 210 q4-8 0-16" class="steam" />
            </g>
          </Transition>
        </g>

        <!-- Bulle de commande -->
        <Transition name="bubble">
          <g v-if="current.bubble" :key="current.bubble">
            <rect x="16" y="4" width="310" height="44" rx="14" class="bubble" />
            <path d="M110 47 l10 22 l12-22z" class="bubble" />
            <text x="171" y="32" text-anchor="middle" class="bubble-text">{{ current.bubble }}</text>
          </g>
        </Transition>

        <!-- Porte battante entre salle et cuisine -->
        <g>
          <rect x="445" y="0" width="105" height="340" class="wall-door" />
          <rect x="462" y="128" width="72" height="212" rx="4" class="door" />
          <circle cx="498" cy="180" r="14" class="door-window" />
          <text v-if="variant === 'api'" x="498" y="110" text-anchor="middle" class="door-label">API</text>
        </g>

        <!-- Cuisine : fourneau, marmite, chef, réserves -->
        <g>
          <rect x="640" y="256" width="150" height="84" rx="6" class="stove" />
          <rect x="652" y="270" width="54" height="34" rx="4" class="stove-door" />
          <circle cx="740" cy="282" r="6" class="stove-knob" />
          <circle cx="762" cy="282" r="6" class="stove-knob" />
          <path d="M668 256 v-30 h70 v30z" class="pot" />
          <rect x="660" y="222" width="86" height="8" rx="4" class="pot-lid" />
          <g v-if="current.cooking" class="steam-big">
            <path d="M680 214 q8-14 0-28 q-8-14 0-28" class="steam" />
            <path d="M703 210 q8-14 0-28 q-8-14 0-28" class="steam s2" />
            <path d="M726 214 q8-14 0-28 q-8-14 0-28" class="steam s3" />
          </g>
          <!-- Chef -->
          <g :class="{ busy: current.cooking }" class="chef">
            <rect x="808" y="296" width="14" height="44" rx="5" class="chef-legs" />
            <rect x="828" y="296" width="14" height="44" rx="5" class="chef-legs" />
            <path d="M800 300 v-62 q0-22 25-22 q25 0 25 22 v62z" class="chef-coat" />
            <rect x="812" y="250" width="26" height="50" rx="4" class="apron" />
            <circle cx="825" cy="190" r="21" class="skin" />
            <path d="M800 172 q-12-26 12-28 q4-16 22-10 q18-6 22 12 q16 6 2 26z" class="toque" />
            <circle cx="816" cy="192" r="2.6" class="eye" />
            <path d="M812 202 q6 4 11-1" class="mouth" />
            <path d="M802 244 q-30 6 -54 -12" class="chef-arm" />
            <path d="M746 232 l-30-14" class="spoon" />
          </g>
          <!-- Réserves -->
          <g :class="{ pulse: current.cooking }">
            <rect x="872" y="128" width="72" height="212" rx="6" class="fridge" />
            <line x1="872" y1="210" x2="944" y2="210" class="fridge-line" />
            <rect x="880" y="150" width="6" height="40" rx="3" class="fridge-handle" />
            <rect x="880" y="226" width="6" height="40" rx="3" class="fridge-handle" />
            <template v-if="variant === 'api'">
              <g v-for="(p, i) in [[896, 140], [916, 162], [898, 230], [918, 262]]" :key="i">
                <rect :x="p[0]" :y="p[1]" width="20" height="16" rx="2" class="photo" />
                <circle :cx="p[0]! + 10" :cy="p[1]! + 9" r="4" class="photo-dog" />
              </g>
            </template>
            <text x="908" y="118" text-anchor="middle" class="fridge-label">{{ variant === 'api' ? 'Photos' : 'Réserves' }}</text>
          </g>
        </g>

        <!-- Le serveur (se déplace) -->
        <g class="waiter" :style="{ transform: `translateX(${waiterX}px)` }">
          <g :class="current.waiter === 'cuisine' ? 'face-right' : 'face-left'">
            <rect x="-16" y="276" width="13" height="64" rx="5" class="waiter-legs" />
            <rect x="3" y="276" width="13" height="64" rx="5" class="waiter-legs" />
            <path d="M-24 282 v-66 q0-22 24-22 q24 0 24 22 v66z" class="waiter-shirt" />
            <path d="M-24 282 v-66 q0-22 24-22 q-14 10-14 36 v52z" class="waiter-vest" />
            <path d="M24 282 v-66 q0-22 -24-22 q14 10 14 36 v52z" class="waiter-vest" />
            <path d="M-8 200 l8 6 l8-6 v12 l-8-6 l-8 6z" class="bowtie" />
            <circle cx="0" cy="170" r="20" class="skin" />
            <path d="M-20 166 q0-24 22-22 q18 2 18 22 q-8-12-22-10 q-12 2-18 10z" class="hair-2" />
            <circle cx="-8" cy="170" r="2.4" class="eye" />
            <path d="M-12 181 q-5 3-10-1" class="mouth" />
            <!-- bras + plateau -->
            <path d="M-20 220 q-18 18 -36 18" class="waiter-arm" />
            <ellipse cx="-62" cy="236" rx="30" ry="5" class="tray" />
            <Transition name="dish">
              <g v-if="current.tray === 'commande'" key="order">
                <rect x="-76" y="200" width="28" height="34" rx="2" class="order" transform="rotate(-6 -62 217)" />
                <line x1="-71" y1="211" x2="-53" y2="209" class="order-line" />
                <line x1="-71" y1="219" x2="-56" y2="217" class="order-line" />
              </g>
              <g v-else-if="current.tray === 'plat' && !current.served" key="dish">
                <path d="M-90 232 q28-36 56 0z" class="cloche" />
              </g>
            </Transition>
          </g>
        </g>

        <!-- Cadre de la zone active -->
        <rect
          :x="zoneBox[current.zone].x"
          y="6"
          :width="zoneBox[current.zone].w"
          height="358"
          rx="14"
          class="zone-hl"
        />
      </svg>
    </div>

    <!-- Légende + correspondances -->
    <div class="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div class="card flex min-h-[7.5rem] flex-col px-4 py-3">
        <div class="mb-2 flex items-center gap-2">
          <p class="slide-eyebrow">Étape {{ step + 1 }} / {{ steps.length }}</p>
          <div class="ml-auto flex items-center gap-1">
            <button class="icon-btn size-8" aria-label="Étape précédente" :disabled="step === 0" @click="go(step - 1)"><ChevronLeft :size="18" /></button>
            <button class="btn-primary !px-3 !py-1.5 text-sm" @click="play">
              <Pause v-if="playing" :size="15" /><Play v-else :size="15" /> {{ playing ? 'Pause' : 'Lecture' }}
            </button>
            <button class="icon-btn size-8" aria-label="Étape suivante" :disabled="step === steps.length - 1" @click="go(step + 1)"><ChevronRight :size="18" /></button>
            <button class="icon-btn size-8" aria-label="Recommencer" @click="go(0)"><RotateCcw :size="15" /></button>
          </div>
        </div>
        <Transition name="fade" mode="out-in">
          <div :key="`${variant}-${step}`" class="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p class="slide-body font-bold">{{ current.title }}</p>
              <p class="slide-small mt-1 text-muted">{{ current.resto }}</p>
            </div>
            <div class="rounded-xl bg-accent-soft px-3 py-2.5">
              <p class="text-xs font-semibold tracking-wide text-accent-fg uppercase">Sur le Web</p>
              <p class="slide-small mt-1" :class="current.code ? 'font-mono text-[0.85em] break-all' : ''">{{ current.web }}</p>
            </div>
          </div>
        </Transition>
      </div>
      <ul class="card grid content-center gap-0.5 px-3 py-2" aria-label="Correspondances">
        <li
          v-for="row in legend"
          :key="row.resto"
          class="slide-small flex items-center gap-2 rounded-lg px-2 py-0.5 transition"
          :class="row.zone === current.zone ? 'bg-accent-soft' : 'opacity-60'"
        >
          <span class="font-semibold">{{ row.resto }}</span>
          <span class="text-subtle" aria-hidden="true">→</span>
          <span class="text-muted">{{ row.web }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
svg text {
  font-family: var(--font-sans, system-ui, sans-serif);
}
.wall-salle { fill: #fdf0dc; }
.wall-cuisine { fill: #eef4f7; }
.wall-door { fill: #e7dccd; }
.tiles line { stroke: #d7e3ea; stroke-width: 2; }
.floor { fill: #c9a27e; }
.zone-label { font-size: 15px; font-weight: 800; letter-spacing: 0.12em; fill: #a8a29e; }
.frame { fill: #fff; stroke: #b45309; stroke-width: 5; }
.frame-art { fill: #86efac; }
.frame-sun { fill: #fbbf24; }
.board-wire { stroke: #57534e; stroke-width: 2; }
.board-nail { fill: #57534e; }
.board { fill: #1f3b2f; stroke: #92400e; stroke-width: 6; }
.board-title { font-size: 15px; font-weight: 800; fill: #fef3c7; }
.board-item { font-size: 13px; font-weight: 600; fill: #e7e5e4; }
.chair { fill: #92400e; }
.client-body { fill: #6366f1; }
.client-legs { fill: #334155; }
.client-arm { fill: none; stroke: #6366f1; stroke-width: 14; stroke-linecap: round; }
.arm { transform-origin: 126px 204px; transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 1); }
.arm.raised { transform: rotate(-62deg); }
.skin { fill: #f5c9a0; }
.hair { fill: #c2410c; }
.hair-2 { fill: #1c1917; }
.eye { fill: #1c1917; }
.mouth { fill: none; stroke: #1c1917; stroke-width: 2; stroke-linecap: round; }
.table-top { fill: #78350f; }
.tablecloth { fill: #fff; stroke: #fecaca; stroke-width: 2; stroke-dasharray: 6 6; }
.table-leg { fill: #78350f; }
.plate { fill: #fff; stroke: #d6d3d1; stroke-width: 2; }
.food { fill: #f59e0b; }
.food-2 { fill: #16a34a; }
.food-3 { fill: #dc2626; }
.json-plate { fill: #ecfdf5; stroke: #10b981; stroke-width: 3; }
.json-text { font-family: var(--font-mono, monospace) !important; font-size: 20px; font-weight: 800; fill: #047857; }
.steam { fill: none; stroke: #a8a29e; stroke-width: 3; stroke-linecap: round; opacity: 0.8; animation: steam 1.6s ease-in-out infinite; }
.steam.s2 { animation-delay: 0.3s; }
.steam.s3 { animation-delay: 0.6s; }
.bubble { fill: #fff; stroke: var(--accent); stroke-width: 3; }
.bubble-text { font-size: 16px; font-weight: 700; fill: #1c1917; }
.door { fill: #b45309; }
.door-window { fill: #bae6fd; stroke: #78350f; stroke-width: 4; }
.door-label { font-size: 14px; font-weight: 800; fill: var(--accent-fg); letter-spacing: 0.06em; }
.stove { fill: #64748b; }
.stove-door { fill: #334155; }
.stove-knob { fill: #e2e8f0; }
.pot { fill: #94a3b8; }
.pot-lid { fill: #475569; }
.chef-legs { fill: #334155; }
.chef-coat { fill: #fff; stroke: #cbd5e1; stroke-width: 2; }
.apron { fill: #10b981; }
.toque { fill: #fff; stroke: #cbd5e1; stroke-width: 2; }
.chef-arm { fill: none; stroke: #fff; stroke-width: 13; stroke-linecap: round; }
.spoon { stroke: #92400e; stroke-width: 5; stroke-linecap: round; }
.chef { transform-origin: 825px 300px; }
.chef.busy { animation: stir 0.9s ease-in-out infinite; }
.fridge { fill: #e2e8f0; stroke: #94a3b8; stroke-width: 3; }
.fridge-line { stroke: #94a3b8; stroke-width: 3; }
.fridge-handle { fill: #64748b; }
.fridge-label { font-size: 14px; font-weight: 800; fill: #047857; }
.photo { fill: #fff; stroke: #94a3b8; stroke-width: 1.5; }
.photo-dog { fill: #d97706; }
.waiter { transition: transform 1.3s cubic-bezier(0.6, 0, 0.3, 1); }
.face-right { transform: scaleX(-1); transition: transform 0.3s; }
.face-left { transform: scaleX(1); transition: transform 0.3s; }
.waiter-legs { fill: #1e293b; }
.waiter-shirt { fill: #fff; stroke: #cbd5e1; stroke-width: 2; }
.waiter-vest { fill: #1e293b; }
.bowtie { fill: #dc2626; }
.waiter-arm { fill: none; stroke: #1e293b; stroke-width: 12; stroke-linecap: round; }
.tray { fill: #a8a29e; }
.order { fill: #fefce8; stroke: #ca8a04; stroke-width: 2; }
.order-line { stroke: #a16207; stroke-width: 2; }
.cloche { fill: #cbd5e1; stroke: #94a3b8; stroke-width: 2; }
.zone-hl {
  fill: none;
  stroke: var(--accent);
  stroke-width: 4;
  stroke-dasharray: 12 8;
  transition: x 0.6s ease, width 0.6s ease;
  animation: fw-dash 1.2s linear infinite;
}
.pulse { animation: pulse 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }


.dish-enter-active,
.dish-leave-active,
.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.4s, transform 0.4s;
  transform-box: fill-box;
  transform-origin: center bottom;
}
.dish-enter-from,
.dish-leave-to,
.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

@keyframes steam {
  0%, 100% { transform: translateY(0); opacity: 0.2; }
  50% { transform: translateY(-8px); opacity: 0.9; }
}
@keyframes stir {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-3deg); }
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@media (prefers-reduced-motion: reduce) {
  .steam, .chef.busy, .pulse, .zone-hl { animation: none; }
}
</style>
