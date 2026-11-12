<script setup lang="ts">
/** Une page (un document) et un site (des pages reliées par des liens). */
import { FileText, Link2 } from '@lucide/vue'

const pages = [
  { id: 'accueil', title: 'Accueil', x: 50, y: 14 },
  { id: 'chiens', title: 'Le chien du jour', x: 16, y: 72 },
  { id: 'races', title: 'Les races', x: 50, y: 86 },
  { id: 'contact', title: 'Contact', x: 84, y: 72 },
]
const links = [
  ['accueil', 'chiens'],
  ['accueil', 'races'],
  ['accueil', 'contact'],
  ['chiens', 'races'],
]
const current = ref('accueil')
const pos = (id: string) => pages.find((p) => p.id === id)!
</script>

<template>
  <div class="grid grid-cols-1 h-full items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
    <!-- Une page -->
    <figure class="card flex flex-col items-center justify-center gap-4 p-6 text-center">
      <div class="w-[min(14rem,70%)] rounded-xl border border-border bg-surface-2 p-3 shadow-sm">
        <div class="mb-2 h-2.5 w-2/3 rounded-full bg-accent/70" />
        <div class="mb-1.5 h-2 rounded-full bg-border-strong/70" />
        <div class="mb-1.5 h-2 w-5/6 rounded-full bg-border-strong/70" />
        <div class="mb-3 h-16 rounded-lg bg-accent-soft" />
        <div class="h-2 w-1/2 rounded-full bg-border-strong/70" />
      </div>
      <figcaption>
        <p class="slide-body font-bold">Une page web</p>
        <p class="slide-small text-muted">Un document : du texte, des images, des boutons…</p>
      </figcaption>
    </figure>

    <!-- Un site -->
    <figure class="card relative flex flex-col p-6">
      <div class="relative min-h-[14rem] flex-1">
        <svg class="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
          <line
            v-for="[a, b] in links"
            :key="`${a}-${b}`"
            :x1="pos(a!).x" :y1="pos(a!).y" :x2="pos(b!).x" :y2="pos(b!).y"
            vector-effect="non-scaling-stroke"
            stroke-width="2"
            stroke-dasharray="5 5"
            :stroke="a === current || b === current ? 'var(--accent)' : 'var(--border-strong)'"
            :style="a === current || b === current ? 'animation: fw-dash 1s linear infinite' : ''"
          />
        </svg>
        <button
          v-for="p in pages"
          :key="p.id"
          class="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border-2 px-3 py-2 text-[clamp(0.75rem,1cqi,1rem)] font-semibold whitespace-nowrap shadow-sm transition"
          :class="current === p.id ? 'scale-110 border-accent bg-accent text-white' : 'border-border bg-surface hover:border-accent'"
          :style="{ left: `${p.x}%`, top: `${p.y}%` }"
          :aria-pressed="current === p.id"
          @click="current = p.id"
        >
          <FileText :size="16" /> {{ p.title }}
        </button>
      </div>
      <figcaption class="mt-4 text-center">
        <p class="slide-body flex items-center justify-center gap-2 font-bold"><Link2 :size="18" class="text-accent-fg" /> Un site web</p>
        <p class="slide-small text-muted">Plusieurs pages reliées par des liens. Cliquez pour naviguer.</p>
      </figcaption>
    </figure>
  </div>
</template>
