<script setup lang="ts">
/** Notre fiche sous forme de composant Vue, à côté d'une version qui fonctionne. */
import { VUE_CARD } from '~/content/courses/site-web/fil-rouge'

const parts = [
  { id: 'data', label: 'Les données', text: 'Ce que la fiche affiche : l’image, le texte, l’état de chargement.', lines: [4, 5, 6] },
  { id: 'action', label: 'L’action', text: 'Au clic : on interroge l’API, puis on change simplement les données.', lines: [8, 9, 10, 11, 12, 13, 14, 15] },
  { id: 'view', label: 'L’affichage', text: 'Le HTML, relié aux données par {{ }} et « : ». Vue met la page à jour tout seul.', lines: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
]
const active = ref(parts[0]!)
</script>

<template>
  <div class="grid grid-cols-1 h-full min-h-0 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
    <div class="flex min-h-0 flex-col gap-3">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Parties du composant">
        <button
          v-for="p in parts"
          :key="p.id"
          class="chip px-3 py-1.5 transition"
          :class="active.id === p.id ? 'border-accent bg-accent text-white' : 'hover:text-fg'"
          :aria-pressed="active.id === p.id"
          @click="active = p"
        >
          {{ p.label }}
        </button>
      </div>
      <p class="slide-small text-muted">{{ active.text }}</p>
      <CodeViewer class="min-h-[16rem] flex-1" :files="[{ name: 'FicheChien.vue', lang: 'vue', code: VUE_CARD }]" :active-lines="active.lines" size="sm" dim-others />
    </div>
    <div class="flex min-h-[22rem] flex-col items-center justify-center gap-3 rounded-3xl bg-[#fdf2e4] p-6">
      <DogCardVue />
      <p class="text-center text-xs text-stone-600">Un vrai composant Vue, qui interroge réellement l’API.</p>
    </div>
  </div>
</template>
