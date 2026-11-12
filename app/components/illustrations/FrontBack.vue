<script setup lang="ts">
/**
 * Front-end (dans le navigateur) et back-end (sur un serveur).
 * Tout site a un front-end ; le back-end n'est nécessaire que si le site
 * doit enregistrer ou calculer des données. Survoler un exemple montre
 * de quelles parties il a besoin.
 */
import { ChefHat, Database, Eye, MonitorSmartphone, MousePointerClick, Palette, Server, Utensils } from '@lucide/vue'

type Need = 'front' | 'both'
const examples: { label: string; need: Need; why: string }[] = [
  { label: 'Un portfolio', need: 'front', why: 'Des pages à lire : rien à enregistrer.' },
  { label: 'Le site d’un restaurant', need: 'front', why: 'Le menu, les horaires, une carte : tout est déjà dans les pages.' },
  { label: 'Cette formation', need: 'front', why: 'Votre progression reste dans votre navigateur : pas de back-end.' },
  { label: 'Une boutique en ligne', need: 'both', why: 'Il faut enregistrer les commandes et les stocks.' },
  { label: 'Un réseau social', need: 'both', why: 'Il faut garder les comptes, les photos, les messages.' },
  { label: 'Une messagerie', need: 'both', why: 'Les messages doivent être stockés et transmis.' },
]

const hovered = ref<(typeof examples)[number] | null>(null)
const backDim = computed(() => hovered.value?.need === 'front')
const frontHl = computed(() => !!hovered.value)
const backHl = computed(() => hovered.value?.need === 'both')
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-4">
    <div class="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
      <div
        class="card flex flex-col p-[clamp(1.25rem,2.2cqi,2.25rem)] transition"
        :class="frontHl ? 'border-accent shadow-lg' : ''"
      >
        <div class="flex items-start gap-3">
          <span class="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-white"><MonitorSmartphone :size="28" /></span>
          <span class="ml-auto rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-fg">Toujours présent</span>
        </div>
        <span class="slide-eyebrow mt-4">Front-end</span>
        <span class="slide-title mt-1 text-[clamp(1.3rem,2.3cqi,2.3rem)]">Dans le navigateur</span>
        <span class="slide-body mt-2 text-muted">Tout ce que l’on voit et avec quoi l’on interagit.</span>
        <ul class="mt-4 space-y-2">
          <li class="slide-small flex items-center gap-2.5"><Eye :size="18" class="text-accent-fg" /> Les textes, les images, la mise en page</li>
          <li class="slide-small flex items-center gap-2.5"><Palette :size="18" class="text-accent-fg" /> Les couleurs et les animations</li>
          <li class="slide-small flex items-center gap-2.5"><MousePointerClick :size="18" class="text-accent-fg" /> Les réactions aux clics</li>
        </ul>
        <span class="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-subtle"><Utensils :size="16" /> Au restaurant : la salle</span>
      </div>

      <div
        class="card flex flex-col p-[clamp(1.25rem,2.2cqi,2.25rem)] transition"
        :class="backDim ? 'opacity-35' : backHl ? 'border-emerald-500 shadow-lg' : ''"
      >
        <div class="flex items-start gap-3">
          <span class="grid size-14 shrink-0 place-items-center rounded-2xl bg-emerald-500 text-white"><Server :size="28" /></span>
          <span class="ml-auto rounded-full border border-dashed border-emerald-500/60 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Seulement si besoin</span>
        </div>
        <span class="slide-eyebrow mt-4 !text-emerald-600 dark:!text-emerald-400">Back-end</span>
        <span class="slide-title mt-1 text-[clamp(1.3rem,2.3cqi,2.3rem)]">Sur un serveur</span>
        <span class="slide-body mt-2 text-muted">Ce qui se passe en coulisses, quand le site doit retenir ou calculer quelque chose.</span>
        <ul class="mt-4 space-y-2">
          <li class="slide-small flex items-center gap-2.5"><Database :size="18" class="text-emerald-500" /> Les données enregistrées (comptes, commandes…)</li>
          <li class="slide-small flex items-center gap-2.5"><Server :size="18" class="text-emerald-500" /> Les calculs à faire à chaque demande</li>
          <li class="slide-small flex items-center gap-2.5"><ChefHat :size="18" class="text-emerald-500" /> Les réponses envoyées au navigateur</li>
        </ul>
        <span class="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-subtle"><ChefHat :size="16" /> Au restaurant : la cuisine</span>
      </div>
    </div>

    <!-- Exemples : de quoi ce site a-t-il besoin ? -->
    <div class="card p-4">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div v-for="need in (['front', 'both'] as const)" :key="need">
          <p class="slide-small mb-2 font-semibold">
            {{ need === 'front' ? 'Un front-end suffit' : 'Front-end + back-end' }}
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="ex in examples.filter((e) => e.need === need)"
              :key="ex.label"
              class="rounded-full border px-3 py-1.5 text-sm transition"
              :class="hovered === ex ? (need === 'front' ? 'border-accent bg-accent-soft' : 'border-emerald-500 bg-emerald-500/10') : 'border-border bg-surface hover:border-border-strong'"
              @mouseenter="hovered = ex"
              @mouseleave="hovered = null"
              @focus="hovered = ex"
              @blur="hovered = null"
            >
              {{ ex.label }}
            </button>
          </div>
        </div>
      </div>
      <p class="slide-small mt-3 min-h-[1.5em] text-muted">
        <template v-if="hovered"><strong class="text-fg">{{ hovered.label }} :</strong> {{ hovered.why }}</template>
        <template v-else>Survolez un exemple : de quelles parties ce site a-t-il besoin ?</template>
      </p>
    </div>
  </div>
</template>
