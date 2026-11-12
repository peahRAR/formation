<script setup lang="ts">
/** Panorama de Vue.js, React, Svelte et Angular, avec notre fiche écrite dans chacun. */
import { Info } from '@lucide/vue'
import { FRAMEWORK_SNIPPETS } from '~/content/courses/site-web/fil-rouge'
import type { CodeLang } from '~/types/course'

const frameworks: {
  id: keyof typeof FRAMEWORK_SNIPPETS
  name: string
  logo: string
  color: string
  tagline: string
  philosophy: string
  file: string
  lang: CodeLang
}[] = [
  {
    id: 'vue',
    name: 'Vue.js',
    logo: '/logos/vue.svg',
    color: '#42b883',
    tagline: 'Progressif et accessible',
    philosophy: 'Proche du HTML que l’on connaît déjà, on peut l’adopter petit à petit.',
    file: 'FicheChien.vue',
    lang: 'vue',
  },
  {
    id: 'react',
    name: 'React',
    logo: '/logos/react.svg',
    color: '#149eca',
    tagline: 'Tout en JavaScript',
    philosophy: 'Une bibliothèque centrée sur les composants ; le HTML s’écrit dans le JavaScript (JSX).',
    file: 'FicheChien.jsx',
    lang: 'js',
  },
  {
    id: 'svelte',
    name: 'Svelte',
    logo: '/logos/svelte.svg',
    color: '#ff3e00',
    tagline: 'Le moins de code possible',
    philosophy: 'Un compilateur : il transforme les composants en JavaScript très léger avant la mise en ligne.',
    file: 'FicheChien.svelte',
    lang: 'vue',
  },
  {
    id: 'angular',
    name: 'Angular',
    logo: '/logos/angular.svg',
    color: '#dd0031',
    tagline: 'Un cadre complet',
    philosophy: 'Tout est fourni et très structuré : apprécié des grandes équipes et des gros projets.',
    file: 'fiche-chien.component.ts',
    lang: 'js',
  },
]

const active = ref(0)
const fw = computed(() => frameworks[active.value]!)

const common = ['Des composants réutilisables', 'Le DOM mis à jour automatiquement', 'Au final : du HTML, du CSS et du JavaScript']
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="grid grid-cols-2 gap-2 md:grid-cols-4" role="tablist">
      <button
        v-for="(f, i) in frameworks"
        :key="f.id"
        role="tab"
        :aria-selected="active === i"
        class="flex items-center gap-3 rounded-2xl border p-3 text-left transition"
        :class="active === i ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-border-strong'"
        @click="active = i"
      >
        <span class="grid size-[clamp(2.4rem,3.4cqi,3.4rem)] shrink-0 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <img :src="f.logo" :alt="`Logo ${f.name}`" class="size-[clamp(1.6rem,2.3cqi,2.3rem)] object-contain" width="48" height="48">
        </span>
        <span class="min-w-0">
          <span class="slide-body block font-bold">{{ f.name }}</span>
          <span class="slide-small block truncate text-muted">{{ f.tagline }}</span>
        </span>
      </button>
    </div>

    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div class="flex flex-col gap-4">
        <Transition name="fade" mode="out-in">
          <div :key="fw.id" class="card p-5">
            <p class="slide-eyebrow mb-2" :style="{ color: fw.color }">{{ fw.name }}</p>
            <p class="slide-body">{{ fw.philosophy }}</p>
          </div>
        </Transition>
        <div class="card p-5">
          <p class="slide-small mb-3 font-semibold">Leurs points communs</p>
          <ul class="space-y-2">
            <li v-for="c in common" :key="c" class="slide-small flex items-center gap-2 text-muted">
              <span class="size-2 shrink-0 rounded-full bg-accent" /> {{ c }}
            </li>
          </ul>
        </div>
        <p class="slide-small flex items-start gap-2 rounded-2xl bg-accent-soft p-4 text-accent-fg">
          <Info :size="18" class="mt-0.5 shrink-0" />
          Aucun n’est obligatoire : notre fiche fonctionnait très bien avec HTML, CSS et JavaScript seuls.
        </p>
      </div>
      <CodeViewer :key="fw.id" class="min-h-[16rem]" :files="[{ name: fw.file, lang: fw.lang, code: FRAMEWORK_SNIPPETS[fw.id] }]" />
    </div>
  </div>
</template>
