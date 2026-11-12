<script setup lang="ts">
/**
 * Récapitulatif visuel : HTML → CSS → DOM et JavaScript → API → Frameworks.
 * Chaque étape montre la fiche telle qu'elle était à ce moment-là.
 */
import { Info } from '@lucide/vue'
import { CSS_CARD, HTML_CARD, JS_CLICK, JS_FETCH } from '~/content/courses/site-web/fil-rouge'

const steps = [
  { accent: 'orange', icon: 'FileCode2', title: 'HTML', role: 'La structure et le sens du contenu : un HTML sémantique, fait de balises imbriquées.', html: HTML_CARD, css: '', js: '' },
  { accent: 'blue', icon: 'Paintbrush', title: 'CSS', role: 'L’apparence : couleurs, espacements, mise en page responsive. Les règles s’appliquent en cascade. Les frameworks CSS aident à l’écrire.', html: HTML_CARD, css: CSS_CARD, js: '' },
  { accent: 'amber', icon: 'Braces', title: 'DOM et JavaScript', role: 'Le navigateur construit le DOM ; JavaScript réagit au clic et le modifie.', html: HTML_CARD, css: CSS_CARD, js: JS_CLICK },
  { accent: 'emerald', icon: 'ArrowLeftRight', title: 'API', role: 'La page demande des données à un autre service et reçoit du JSON.', html: HTML_CARD, css: CSS_CARD, js: JS_FETCH },
  { accent: 'violet', icon: 'Component', title: 'Frameworks', role: 'Des outils pour organiser une interface qui grandit, en composants.', html: HTML_CARD, css: CSS_CARD, js: JS_FETCH },
]
const active = ref(4)
const step = computed(() => steps[active.value]!)
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <ol class="flex flex-wrap items-center justify-center gap-y-2">
      <template v-for="(s, i) in steps" :key="s.title">
        <li :data-accent="s.accent">
          <button
            class="animate-pop flex items-center gap-2 rounded-2xl border-2 px-[clamp(0.6rem,1.2cqi,1.2rem)] py-2 transition"
            :class="active === i ? 'border-accent bg-accent text-white shadow-lg' : 'border-[var(--accent-soft)] bg-accent-soft text-accent-fg hover:border-accent'"
            :style="{ animationDelay: `${i * 120}ms` }"
            :aria-pressed="active === i"
            @click="active = i"
          >
            <AppIcon :name="s.icon" :size="18" />
            <span class="slide-small font-bold whitespace-nowrap">{{ s.title }}</span>
          </button>
        </li>
        <li v-if="i < steps.length - 1" class="px-1 text-subtle" aria-hidden="true">→</li>
      </template>
    </ol>

    <p class="slide-small mx-auto flex max-w-3xl items-start gap-2 text-center text-muted">
      <Info :size="16" class="mt-0.5 shrink-0" />
      C’est l’ordre de notre apprentissage, pas un ordre obligatoire : dans un vrai projet, on écrit HTML, CSS et JavaScript ensemble, avec ou sans framework.
    </p>

    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]" :data-accent="step.accent">
      <Transition name="fade" mode="out-in">
        <div :key="step.title" class="card flex flex-col justify-center p-[clamp(1.25rem,2.4cqi,2.5rem)]">
          <span class="mb-4 grid size-14 place-items-center rounded-2xl bg-accent text-white"><AppIcon :name="step.icon" :size="28" /></span>
          <p class="slide-eyebrow mb-1">Étape {{ active + 1 }}</p>
          <h3 class="slide-title text-[clamp(1.4rem,2.6cqi,2.6rem)]">{{ step.title }}</h3>
          <p class="slide-body mt-3 text-muted">{{ step.role }}</p>
        </div>
      </Transition>
      <div class="min-h-[20rem]">
        <div v-if="active === 4" class="grid h-full place-items-center rounded-3xl bg-[#fdf2e4] p-6">
          <DogCardVue />
        </div>
        <LivePreview v-else :key="active" class="h-full" :html="step.html" :css="step.css" :js="step.js" :debounce="0" />
      </div>
    </div>
  </div>
</template>
