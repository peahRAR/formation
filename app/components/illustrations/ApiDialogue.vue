<script setup lang="ts">
/** Animation du dialogue : Notre page → API → Réponse → Mise à jour. */
import { Pause, Play, RotateCcw } from '@lucide/vue'

const captions = [
  { title: 'Notre page demande', text: 'Au clic, JavaScript envoie une requête à l’adresse de l’API.' },
  { title: 'L’API traite la demande', text: 'Le service Dog CEO choisit une photo au hasard.' },
  { title: 'La réponse arrive', text: 'Des données structurées (JSON) contenant l’adresse de la photo.' },
  { title: 'La page se met à jour', text: 'JavaScript place l’adresse dans l’image : la nouvelle photo s’affiche.' },
]
const step = ref(-1)
const playing = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function play() {
  if (playing.value) {
    playing.value = false
    return clearInterval(timer)
  }
  if (step.value >= captions.length - 1) step.value = -1
  playing.value = true
  step.value++
  timer = setInterval(() => {
    if (step.value >= captions.length - 1) {
      playing.value = false
      return clearInterval(timer)
    }
    step.value++
  }, 2000)
}
function nextStep() {
  clearInterval(timer)
  playing.value = false
  if (step.value < captions.length - 1) step.value++
}
function reset() {
  clearInterval(timer)
  playing.value = false
  step.value = -1
}
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="flex h-full flex-col justify-center gap-6">
    <ApiLane :step="step" />
    <div class="card mx-auto grid min-h-[7rem] w-full max-w-3xl place-items-center p-5 text-center">
      <Transition name="fade" mode="out-in">
        <div v-if="step >= 0" :key="step">
          <p class="slide-eyebrow mb-1">Étape {{ step + 1 }} / 4</p>
          <p class="slide-title text-[clamp(1.2rem,2.2cqi,2.2rem)]">{{ captions[step]!.title }}</p>
          <p class="slide-body mt-1 text-muted">{{ captions[step]!.text }}</p>
        </div>
        <p v-else class="slide-body text-muted">Lancez l’animation pour suivre le trajet des données.</p>
      </Transition>
    </div>
    <div class="flex justify-center gap-2">
      <button class="btn-primary" @click="play">
        <component :is="playing ? Pause : Play" :size="16" /> {{ playing ? 'Pause' : step === -1 ? 'Lancer l’animation' : step >= 3 ? 'Rejouer' : 'Continuer' }}
      </button>
      <button class="btn-secondary" :disabled="step >= 3" @click="nextStep">Étape suivante</button>
      <button class="btn-ghost" :disabled="step === -1" aria-label="Recommencer" @click="reset"><RotateCcw :size="16" /></button>
    </div>
  </div>
</template>
