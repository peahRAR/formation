<script setup lang="ts">
/** L'utilisateur, son navigateur et un serveur : demander, recevoir, afficher. */
import { MousePointerClick, Pause, Play, RotateCcw, Server, UserRound } from '@lucide/vue'

const steps = [
  { title: 'Vous cliquez sur un lien', text: 'ou vous tapez une adresse dans le navigateur.' },
  { title: 'Le navigateur demande la page', text: 'il envoie une demande au serveur qui héberge le site.' },
  { title: 'Le serveur répond', text: 'il renvoie les fichiers de la page : HTML, CSS, JavaScript, images.' },
  { title: 'Le navigateur affiche la page', text: 'il lit ces fichiers et dessine la page à l’écran.' },
]
const step = ref(-1)
const playing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function play() {
  if (playing.value) {
    playing.value = false
    return clearInterval(timer)
  }
  if (step.value >= steps.length - 1) step.value = -1
  playing.value = true
  step.value++
  timer = setInterval(() => {
    if (step.value >= steps.length - 1) {
      playing.value = false
      return clearInterval(timer)
    }
    step.value++
  }, 1900)
}
function reset() {
  clearInterval(timer)
  playing.value = false
  step.value = -1
}
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="flex h-full flex-col gap-5">
    <div class="card relative grid flex-1 grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)_auto_minmax(0,1fr)] items-center gap-2 p-[clamp(1rem,2.5cqi,2.5rem)]">
      <!-- Vous -->
      <div class="flex flex-col items-center gap-2 text-center">
        <div class="grid size-[clamp(3.5rem,7cqi,7rem)] place-items-center rounded-full transition" :class="step === 0 ? 'bg-accent text-white scale-110' : 'bg-surface-2 text-muted'">
          <UserRound class="size-[45%]" />
        </div>
        <p class="slide-body font-semibold">Vous</p>
      </div>
      <div class="relative flex w-[clamp(1.5rem,5cqi,5rem)] justify-center" aria-hidden="true">
        <MousePointerClick v-if="step === 0" class="animate-pop text-accent" :size="28" />
      </div>

      <!-- Navigateur -->
      <div class="flex flex-col items-center gap-2 text-center">
        <div class="w-full overflow-hidden rounded-xl border-2 transition" :class="step === 1 || step === 3 ? 'border-accent shadow-lg' : 'border-border'">
          <div class="flex items-center gap-1 border-b border-border bg-surface-2 px-2 py-1.5">
            <span class="size-2 rounded-full bg-rose-400/80" /><span class="size-2 rounded-full bg-amber-400/80" /><span class="size-2 rounded-full bg-emerald-400/80" />
            <span class="ml-2 h-3 flex-1 rounded bg-surface" />
          </div>
          <div class="relative grid aspect-[16/10] place-items-center bg-surface p-3">
            <Transition name="fade" mode="out-in">
              <div v-if="step >= 3" key="page" class="animate-pop w-full space-y-1.5">
                <div class="h-2.5 w-1/2 rounded-full bg-accent" />
                <div class="h-10 rounded-md bg-accent-soft" />
                <div class="h-2 w-5/6 rounded-full bg-border-strong" />
                <div class="h-2 w-2/3 rounded-full bg-border-strong" />
              </div>
              <div v-else-if="step >= 1" key="load" class="size-8 animate-spin rounded-full border-4 border-accent-soft border-t-accent" />
              <p v-else key="empty" class="slide-small text-subtle">Page vide</p>
            </Transition>
          </div>
        </div>
        <p class="slide-body font-semibold">Le navigateur</p>
      </div>

      <!-- Échanges -->
      <div class="relative flex h-full w-[clamp(4rem,12cqi,12rem)] flex-col justify-center gap-6" aria-hidden="true">
        <div class="relative h-0.5 rounded bg-border-strong">
          <span v-if="step === 1" class="absolute -top-3.5 left-0 travel rounded-full bg-accent px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-white">Demande →</span>
        </div>
        <div class="relative h-0.5 rounded bg-border-strong">
          <span v-if="step === 2" class="absolute -top-3.5 right-0 travel-back rounded-full bg-emerald-500 px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap text-white">← Fichiers</span>
        </div>
      </div>

      <!-- Serveur -->
      <div class="flex flex-col items-center gap-2 text-center">
        <div class="grid size-[clamp(3.5rem,7cqi,7rem)] place-items-center rounded-2xl transition" :class="step === 2 ? 'bg-emerald-500 text-white scale-110' : 'bg-surface-2 text-muted'">
          <Server class="size-[45%]" />
        </div>
        <p class="slide-body font-semibold">Le serveur</p>
        <p class="slide-small text-subtle">un ordinateur, ailleurs</p>
      </div>
    </div>

    <div class="flex flex-col items-center gap-3 md:flex-row">
      <div class="flex gap-2">
        <button class="btn-primary" @click="play">
          <component :is="playing ? Pause : Play" :size="16" /> {{ playing ? 'Pause' : step === -1 ? 'Lancer l’animation' : 'Continuer' }}
        </button>
        <button class="btn-ghost" :disabled="step === -1" @click="reset"><RotateCcw :size="16" /></button>
      </div>
      <ol class="grid grid-cols-1 flex-1 gap-2 sm:grid-cols-4">
        <li
          v-for="(s, i) in steps"
          :key="s.title"
          class="rounded-xl border px-3 py-2 transition"
          :class="step === i ? 'border-accent bg-accent-soft' : step > i ? 'border-border opacity-80' : 'border-border opacity-50'"
        >
          <button class="w-full text-left" @click="(reset(), (step = i))">
            <span class="slide-small block font-semibold">{{ i + 1 }}. {{ s.title }}</span>
            <span class="block text-xs leading-snug text-muted">{{ s.text }}</span>
          </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.travel { animation: fw-travel 1.6s ease-in-out forwards; }
.travel-back { animation: fw-travel-back 1.6s ease-in-out forwards; }
@keyframes fw-travel {
  from { left: 0; }
  to { left: calc(100% - 5.5rem); }
}
@keyframes fw-travel-back {
  from { right: 0; }
  to { right: calc(100% - 5rem); }
}
</style>
