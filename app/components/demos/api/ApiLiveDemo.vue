<script setup lang="ts">
/**
 * Démonstration réelle : le bouton interroge l'API Dog CEO avec fetch(),
 * depuis le navigateur. Chaque étape s'allume sur le schéma et dans le code.
 */
import { CloudOff, Gauge, RefreshCw, Send, Snail } from '@lucide/vue'
import { DOG_API_URL, DOG_TEXT, JS_FETCH, JS_FETCH_LINES } from '~/content/courses/site-web/fil-rouge'
import type { DogPhase } from '~/composables/useDogApi'

const slowMotion = ref(true)
const dog = useDogApi({ slowMotion })

const laneStep = computed(() => ({ idle: -1, loading: 0, request: 1, response: 2, read: 3, update: 3, error: 1 })[dog.phase.value])

const captions: Record<DogPhase, string> = {
  idle: 'Cliquez sur « Découvrir un chien » : une vraie requête part vers l’API.',
  loading: '1. Une indication de chargement apparaît.',
  request: '2. JavaScript envoie la requête avec fetch()…',
  response: '3. L’API répond avec des données JSON.',
  read: '4. JavaScript lit l’adresse de l’image dans le champ « message ».',
  update: '5. L’image de la fiche est mise à jour ! Vous pouvez recommencer.',
  error: 'La requête a échoué : on affiche un message simple et on propose de réessayer.',
}

const codeLines = computed<readonly number[]>(() => {
  switch (dog.phase.value) {
    case 'loading':
      return JS_FETCH_LINES.loading
    case 'request':
      return JS_FETCH_LINES.request
    case 'response':
      return JS_FETCH_LINES.json
    case 'read':
      return JS_FETCH_LINES.read
    case 'update':
      return JS_FETCH_LINES.update
    case 'error':
      return JS_FETCH_LINES.error
    default:
      return []
  }
})

const cardText = computed(() => {
  switch (dog.phase.value) {
    case 'idle':
      return DOG_TEXT
    case 'update': {
      const breed = dog.image.value ? breedFromUrl(dog.image.value) : null
      return breed ? `Voici votre chien du jour ! (race : ${breed})` : 'Voici votre chien du jour !'
    }
    case 'error':
      return 'Oups, pas de réseau… Réessayez !'
    default:
      return 'Chargement…'
  }
})

const jsonText = computed(() => (dog.json.value ? JSON.stringify(dog.json.value, null, 2) : '// La réponse JSON apparaîtra ici'))
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div>
      <ApiLane :step="laneStep" :error="dog.phase.value === 'error'" />
      <p class="slide-body mt-3 text-center font-medium" :class="dog.phase.value === 'error' ? 'text-rose-500' : 'text-accent-fg'" aria-live="polite">
        {{ captions[dog.phase.value] }}
      </p>
    </div>

    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(15rem,19rem)_minmax(0,1fr)_minmax(0,1.35fr)]">
      <!-- La fiche -->
      <div class="flex flex-col items-center justify-center gap-3 rounded-3xl bg-[#fdf2e4] p-4">
        <DogCardView
          compact
          :image="dog.image.value"
          :loading="dog.busy.value"
          :text="cardText"
          :highlight="dog.phase.value === 'update' ? ['img'] : dog.phase.value === 'loading' ? ['p'] : []"
          @discover="dog.fetchDog"
        />
        <div v-if="dog.phase.value === 'error'" class="animate-pop flex flex-col items-center gap-2 text-center text-sm text-stone-700">
          <span class="inline-flex items-center gap-1.5 font-medium"><CloudOff :size="16" /> {{ dog.error.value }}</span>
          <button class="inline-flex items-center gap-1.5 rounded-full bg-stone-800 px-4 py-2 font-semibold text-white hover:bg-stone-700" @click="dog.fetchDog">
            <RefreshCw :size="14" /> Réessayer
          </button>
        </div>
      </div>

      <!-- La réponse -->
      <div class="flex min-h-[12rem] flex-col gap-2">
        <div class="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 font-mono text-xs">
          <Send :size="13" class="shrink-0 text-accent-fg" />
          <span class="font-semibold text-accent-fg">GET</span>
          <span class="truncate text-muted">{{ DOG_API_URL }}</span>
        </div>
        <CodeViewer
          class="flex-1"
          :files="[{ name: 'réponse.json', lang: 'json', code: jsonText }]"
          :active-lines="dog.phase.value === 'read' || dog.phase.value === 'update' ? [2] : []"
          size="sm"
        />
        <p class="flex items-center justify-between text-xs text-subtle">
          <span>{{ dog.requests.value }} requête{{ dog.requests.value > 1 ? 's' : '' }} envoyée{{ dog.requests.value > 1 ? 's' : '' }}</span>
          <span v-if="dog.duration.value !== null" class="inline-flex items-center gap-1"><Gauge :size="13" /> réponse en {{ dog.duration.value }} ms</span>
        </p>
      </div>

      <!-- Le code -->
      <div class="flex min-h-[14rem] flex-col gap-2">
        <CodeViewer class="flex-1" :files="[{ name: 'script.js', lang: 'js', code: JS_FETCH }]" :active-lines="[...codeLines]" size="sm" />
        <div class="flex flex-wrap gap-2">
          <label class="chip cursor-pointer select-none" :class="slowMotion ? 'border-accent text-accent-fg' : ''">
            <input v-model="slowMotion" type="checkbox" class="accent-[var(--accent)]">
            <Snail :size="13" /> Ralenti pédagogique
          </label>
          <label class="chip cursor-pointer select-none" :class="dog.simulateFailure.value ? 'border-rose-500 text-rose-500' : ''">
            <input v-model="dog.simulateFailure.value" type="checkbox" class="accent-rose-500">
            <CloudOff :size="13" /> Simuler une panne réseau
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
