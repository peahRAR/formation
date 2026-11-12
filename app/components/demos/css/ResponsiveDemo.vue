<script setup lang="ts">
/** Simulation de tailles d'écran : la fiche s'adapte grâce à @media. */
import { Monitor, Smartphone, Tablet } from '@lucide/vue'
import { CSS_CARD, CSS_RESPONSIVE, HTML_CARD } from '~/content/courses/site-web/fil-rouge'

const devices = [
  { id: 'mobile', label: 'Téléphone', width: 360, icon: Smartphone },
  { id: 'tablet', label: 'Tablette', width: 620, icon: Tablet },
  { id: 'desktop', label: 'Ordinateur', width: null, icon: Monitor },
]
const device = ref(devices[0]!)
const css = `${CSS_CARD}\n\n${CSS_RESPONSIVE}`
</script>

<template>
  <div class="grid grid-cols-1 h-full min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
    <div class="flex min-h-0 flex-col gap-3">
      <div class="card flex items-start gap-3 p-4">
        <span class="chip shrink-0 !bg-accent !text-white">Responsive</span>
        <p class="slide-small text-muted">
          De l’anglais <em>to respond</em>, « réagir » : la page réagit à la largeur de l’écran.
          <strong class="text-fg">{{ device.id === 'mobile' ? 'Sur téléphone : tout est sur une colonne.' : 'Écran large : la règle @media s’applique, la photo passe à gauche.' }}</strong>
        </p>
      </div>
      <CodeViewer class="min-h-[14rem] flex-1" :files="[{ name: 'style.css (ajout responsive)', lang: 'css', code: CSS_RESPONSIVE }]" :active-lines="device.id === 'mobile' ? [] : [2]" />
    </div>
    <div class="flex min-h-[22rem] flex-col gap-3">
      <div class="flex flex-wrap justify-center gap-2" role="group" aria-label="Taille d’écran">
        <button
          v-for="d in devices"
          :key="d.id"
          class="btn-secondary"
          :class="device.id === d.id ? 'border-accent bg-accent-soft text-accent-fg' : ''"
          :aria-pressed="device.id === d.id"
          @click="device = d"
        >
          <component :is="d.icon" :size="16" /> {{ d.label }}
          <span class="font-mono text-xs opacity-70">{{ d.width ? `${d.width}px` : 'large' }}</span>
        </button>
      </div>
      <LivePreview class="flex-1" :html="HTML_CARD" :css="css" :viewport-width="device.width" :address="`chien-du-jour.html · ${device.label}`" />
    </div>
  </div>
</template>
