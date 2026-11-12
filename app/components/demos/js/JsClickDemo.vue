<script setup lang="ts">
/**
 * Démonstration guidée du JavaScript de la fiche :
 * événement → sélecteur → modification du texte → mise à jour du rendu.
 * Cliquer sur le bouton de la fiche rejoue tout le déroulé, ligne par ligne.
 */
import { MousePointerClick, RotateCcw } from '@lucide/vue'
import { DOG_JS_TEXT, DOG_TEXT, JS_CLICK } from '~/content/courses/site-web/fil-rouge'

type Part = 'h1' | 'img' | 'p' | 'button'

const steps: { title: string; text: string; lines: number[]; parts: Part[] }[] = [
  {
    title: 'Un événement « click »',
    text: 'JavaScript écoute le bouton : « préviens-moi quand on clique ». Le code entre les accolades attend ce moment.',
    lines: [4, 6],
    parts: ['button'],
  },
  {
    title: 'Un sélecteur d’élément',
    text: 'querySelector va chercher un élément dans le DOM, ici le bouton et le paragraphe, et les range dans des variables.',
    lines: [1, 2],
    parts: ['button', 'p'],
  },
  {
    title: 'Une modification du texte',
    text: 'Au clic, on remplace le texte du paragraphe grâce à textContent.',
    lines: [5],
    parts: ['p'],
  },
  {
    title: 'Une mise à jour du rendu',
    text: 'Le DOM a changé : le navigateur redessine la page aussitôt. À vous : cliquez sur le bouton de la fiche !',
    lines: [5],
    parts: [],
  },
]

const step = ref(0)
const text = ref(DOG_TEXT)
const flash = ref(0)
const running = ref<number[] | null>(null)
const runningParts = ref<Part[]>([])
const clicks = ref(0)

const lines = computed(() => running.value ?? steps[step.value]!.lines)
const parts = computed(() => (running.value ? runningParts.value : steps[step.value]!.parts))

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function onClick() {
  if (running.value) return
  clicks.value++
  running.value = [4]
  runningParts.value = ['button']
  await sleep(650)
  running.value = [5]
  runningParts.value = ['p']
  await sleep(550)
  text.value = DOG_JS_TEXT
  flash.value++
  await sleep(700)
  running.value = null
  step.value = 3
}

function reset() {
  text.value = DOG_TEXT
  clicks.value = 0
  step.value = 0
}
</script>

<template>
  <div class="grid grid-cols-1 h-full min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
    <div class="flex min-h-0 flex-col gap-3">
      <ol class="grid gap-2">
        <li v-for="(s, i) in steps" :key="s.title">
          <button
            class="flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition"
            :class="step === i ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-border-strong'"
            :aria-pressed="step === i"
            @click="step = i"
          >
            <span
              class="grid size-7 shrink-0 place-items-center rounded-lg text-sm font-bold"
              :class="step === i ? 'bg-accent text-white' : 'bg-surface-3 text-muted'"
            >{{ i + 1 }}</span>
            <span class="min-w-0">
              <span class="slide-small block font-semibold">{{ s.title }}</span>
              <span v-if="step === i" class="slide-small mt-0.5 block leading-snug text-muted">{{ s.text }}</span>
            </span>
          </button>
        </li>
      </ol>
      <CodeViewer class="min-h-[11rem] flex-1" :files="[{ name: 'script.js', lang: 'js', code: JS_CLICK }]" :active-lines="lines" dim-others />
    </div>

    <div class="relative flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-3xl bg-[#fdf2e4] p-6">
      <DogCardView :text="text" :flash-key="flash" :highlight="parts" :disabled="!!running" @discover="onClick" />
      <div class="flex items-center gap-3 text-sm text-stone-600">
        <span class="inline-flex items-center gap-1.5"><MousePointerClick :size="16" /> {{ clicks }} clic{{ clicks > 1 ? 's' : '' }}</span>
        <button v-if="text !== DOG_TEXT" class="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold hover:bg-white" @click="reset">
          <RotateCcw :size="13" /> Remettre le texte d’origine
        </button>
      </div>
    </div>
  </div>
</template>
