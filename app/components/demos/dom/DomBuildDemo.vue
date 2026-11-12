<script setup lang="ts">
/**
 * Animation : le navigateur lit le HTML ligne par ligne et construit
 * l'arbre DOM au fur et à mesure.
 */
import { Play, RotateCcw, SkipForward } from '@lucide/vue'

const props = defineProps<{ html: string }>()

const elements = computed(() => parseElements(props.html))
const totalLines = computed(() => props.html.split('\n').length)
const line = ref(0)
const visible = computed(() => elements.value.filter((e) => e.start <= line.value).length)
const done = computed(() => line.value >= totalLines.value)

let timer: ReturnType<typeof setInterval> | undefined
const playing = ref(false)
function play() {
  if (done.value) line.value = 0
  playing.value = true
  clearInterval(timer)
  timer = setInterval(() => {
    if (line.value >= totalLines.value) {
      playing.value = false
      return clearInterval(timer)
    }
    line.value++
  }, 900)
}
function stepOnce() {
  clearInterval(timer)
  playing.value = false
  if (!done.value) line.value++
}
function reset() {
  clearInterval(timer)
  playing.value = false
  line.value = 0
}
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-2">
      <div class="flex min-h-0 flex-col gap-2">
        <p class="slide-small font-semibold text-muted">1. Le fichier HTML</p>
        <CodeViewer class="min-h-[12rem] flex-1" :files="[{ name: 'index.html', lang: 'html', code: html }]" :active-lines="line ? [line] : []" />
      </div>
      <div class="flex min-h-0 flex-col gap-2">
        <p class="slide-small font-semibold text-muted">2. L’arbre DOM construit par le navigateur</p>
        <div class="card min-h-[14rem] flex-1 overflow-auto p-5">
          <DomTree :elements="elements" :visible="visible" />
          <p v-if="done" class="animate-pop slide-small mt-5 rounded-xl bg-accent-soft px-4 py-2.5 font-medium text-accent-fg">
            Terminé ! La div « fiche » est le parent ; le titre, l’image, le paragraphe et le bouton sont ses enfants.
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-2">
      <button class="btn-primary" :disabled="playing" @click="play"><Play :size="16" /> {{ line === 0 ? 'Lire le HTML' : done ? 'Rejouer' : 'Continuer' }}</button>
      <button class="btn-secondary" :disabled="done" @click="stepOnce"><SkipForward :size="16" /> Ligne suivante</button>
      <button class="btn-ghost" :disabled="line === 0" @click="reset"><RotateCcw :size="16" /> Recommencer</button>
    </div>
  </div>
</template>
