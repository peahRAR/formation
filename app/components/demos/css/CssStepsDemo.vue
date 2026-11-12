<script setup lang="ts">
/**
 * Application progressive des styles : à chaque étape, de nouvelles règles
 * CSS s'ajoutent (surlignées) et le rendu se met à jour.
 */
import { ChevronLeft, ChevronRight, Play, RotateCcw } from '@lucide/vue'
import { buildCss, CSS_STEPS } from '~/content/courses/site-web/fil-rouge'

const props = defineProps<{ html: string }>()

const step = ref(0)
const built = computed(() => (step.value === 0 ? { css: '/* Aucune règle pour l’instant : le navigateur utilise ses styles par défaut. */', added: [] } : buildCss(step.value)))
const last = CSS_STEPS.length

let timer: ReturnType<typeof setInterval> | undefined
const playing = ref(false)
function play() {
  if (playing.value) return stop()
  if (step.value >= last) step.value = 0
  playing.value = true
  timer = setInterval(() => {
    if (step.value >= last) return stop()
    step.value++
  }, 1800)
}
function stop() {
  playing.value = false
  clearInterval(timer)
}
onBeforeUnmount(stop)
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <!-- Étapes -->
    <div class="flex flex-wrap items-center gap-2">
      <button
        class="chip transition"
        :class="step === 0 ? 'border-accent bg-accent-soft text-accent-fg' : 'hover:text-fg'"
        @click="(stop(), (step = 0))"
      >
        0 · HTML seul
      </button>
      <button
        v-for="s in CSS_STEPS"
        :key="s.id"
        class="chip transition"
        :class="[
          step === s.id ? 'border-accent bg-accent text-white' : step > s.id ? 'border-[var(--accent-soft)] bg-accent-soft text-accent-fg' : 'hover:text-fg',
        ]"
        @click="(stop(), (step = s.id))"
      >
        <AppIcon :name="s.icon" :size="13" />
        {{ s.id }} · {{ s.label }}
      </button>
    </div>

    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-2">
      <CodeViewer class="min-h-[16rem]" :files="[{ name: 'style.css', lang: 'css', code: built.css }]" :active-lines="built.added" />
      <LivePreview class="min-h-[18rem]" :html="html" :css="step === 0 ? '' : built.css" :debounce="0" address="chien-du-jour.html" />
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <button class="btn-secondary" :disabled="step === 0" @click="(stop(), step--)"><ChevronLeft :size="16" /> Étape précédente</button>
      <button class="btn-secondary" @click="play">
        <component :is="playing ? RotateCcw : Play" :size="16" /> {{ playing ? 'Arrêter' : 'Lecture automatique' }}
      </button>
      <button class="btn-primary" :disabled="step === last" @click="(stop(), step++)">Étape suivante <ChevronRight :size="16" /></button>
    </div>
  </div>
</template>
