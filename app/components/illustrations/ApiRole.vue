<script setup lang="ts">
/** Notre page, l'API et le service qui détient les données. */
import { ChefHat, ConciergeBell, Database, MonitorSmartphone, UserRound } from '@lucide/vue'

const actors = [
  { icon: MonitorSmartphone, analogy: UserRound, analogyLabel: 'Le client', title: 'Notre page', sub: 'front-end, dans le navigateur', tone: 'accent' },
  { icon: ConciergeBell, analogy: ConciergeBell, analogyLabel: 'Le serveur du restaurant', title: 'L’API', sub: 'https://dog.ceo/api/…', tone: 'accent' },
  { icon: Database, analogy: ChefHat, analogyLabel: 'La cuisine', title: 'Le service Dog CEO', sub: 'back-end : des milliers de photos', tone: 'emerald' },
]
</script>

<template>
  <div class="flex h-full flex-col justify-center gap-6">
    <div class="grid grid-cols-1 items-center gap-3 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
      <template v-for="(a, i) in actors" :key="a.title">
        <div class="card animate-pop flex flex-col items-center p-[clamp(1rem,2cqi,2rem)] text-center" :style="{ animationDelay: `${i * 150}ms` }">
          <span class="mb-3 grid size-[clamp(3rem,5cqi,5rem)] place-items-center rounded-2xl text-white" :class="a.tone === 'emerald' ? 'bg-emerald-500' : 'bg-accent'">
            <component :is="a.icon" class="size-[48%]" />
          </span>
          <p class="slide-body font-bold">{{ a.title }}</p>
          <p class="slide-small font-mono text-muted">{{ a.sub }}</p>
          <p class="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-xs text-muted">
            <component :is="a.analogy" :size="13" /> {{ a.analogyLabel }}
          </p>
        </div>
        <div v-if="i < actors.length - 1" class="flex flex-col gap-3 px-1 text-[clamp(0.72rem,0.95cqi,0.95rem)] font-medium" aria-hidden="true">
          <div class="flex flex-col items-center text-accent-fg">
            <span class="whitespace-nowrap">{{ i === 0 ? 'Une photo, svp !' : 'Je transmets' }}</span>
            <svg viewBox="0 0 80 10" class="w-[clamp(3rem,6cqi,6rem)]"><line x1="0" y1="5" x2="72" y2="5" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" style="animation: fw-dash .8s linear infinite" /><path d="M70 1l7 4-7 4" fill="none" stroke="currentColor" stroke-width="2" /></svg>
          </div>
          <div class="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
            <svg viewBox="0 0 80 10" class="w-[clamp(3rem,6cqi,6rem)] rotate-180"><line x1="0" y1="5" x2="72" y2="5" stroke="currentColor" stroke-width="2" stroke-dasharray="5 4" style="animation: fw-dash .8s linear infinite" /><path d="M70 1l7 4-7 4" fill="none" stroke="currentColor" stroke-width="2" /></svg>
            <span class="whitespace-nowrap">{{ i === 0 ? 'Voici l’adresse' : 'Une photo' }}</span>
          </div>
        </div>
      </template>
    </div>
    <p class="slide-body mx-auto max-w-[56ch] rounded-2xl bg-accent-soft px-5 py-4 text-center">
      <strong>API</strong> = <em>Application Programming Interface</em> : une porte d’entrée prévue pour que des programmes puissent demander des données ou des services.
    </p>
  </div>
</template>
