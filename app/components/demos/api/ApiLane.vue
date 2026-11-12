<script setup lang="ts">
/**
 * Schéma du dialogue avec l'API :
 * Notre page → API → Réponse → Mise à jour de la page.
 * `step` indique l'étape active (-1 = au repos).
 */
import { Braces, ImageUp, MonitorSmartphone, Server } from '@lucide/vue'

const props = withDefaults(defineProps<{ step: number; error?: boolean; compact?: boolean }>(), { error: false, compact: false })

const nodes = [
  { icon: MonitorSmartphone, title: 'Notre page', text: 'Clic : JavaScript lance fetch()' },
  { icon: Server, title: 'L’API', text: 'dog.ceo choisit une photo' },
  { icon: Braces, title: 'La réponse', text: 'Des données JSON' },
  { icon: ImageUp, title: 'Mise à jour', text: 'La nouvelle image s’affiche' },
]

function state(i: number) {
  if (props.error && i === 1) return 'error'
  if (i === props.step) return 'active'
  if (props.step > i) return 'done'
  return 'idle'
}
</script>

<template>
  <ol class="flex items-stretch" :class="compact ? 'gap-1' : 'gap-1 sm:gap-2'">
    <template v-for="(n, i) in nodes" :key="n.title">
      <li
        class="relative flex min-w-0 flex-1 flex-col items-center rounded-2xl border-2 text-center transition-all duration-500"
        :class="[
          compact ? 'p-2' : 'p-[clamp(0.5rem,1.2cqi,1.25rem)]',
          {
            'border-accent bg-accent-soft shadow-lg shadow-[var(--accent-soft)] scale-[1.03]': state(i) === 'active',
            'border-[var(--accent-soft)] bg-surface': state(i) === 'done',
            'border-border bg-surface opacity-70': state(i) === 'idle',
            'border-rose-500 bg-rose-500/10': state(i) === 'error',
          },
        ]"
      >
        <span
          class="mb-1.5 grid place-items-center rounded-xl transition-colors"
          :class="[
            compact ? 'size-8' : 'size-[clamp(2.25rem,3.4cqi,3.5rem)]',
            state(i) === 'error' ? 'bg-rose-500 text-white' : state(i) === 'idle' ? 'bg-surface-2 text-muted' : 'bg-accent text-white',
          ]"
        >
          <component :is="n.icon" :size="compact ? 16 : 22" />
        </span>
        <span class="slide-small font-semibold leading-tight">{{ n.title }}</span>
        <span v-if="!compact" class="mt-0.5 hidden text-[clamp(0.7rem,0.9cqi,0.9rem)] leading-snug text-muted sm:block">{{ n.text }}</span>
        <span v-if="state(i) === 'active'" class="absolute -top-1.5 -right-1.5 flex size-3.5" aria-hidden="true">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
          <span class="relative inline-flex size-3.5 rounded-full bg-accent" />
        </span>
      </li>
      <li v-if="i < nodes.length - 1" class="flex w-[clamp(1rem,3cqi,3.5rem)] shrink-0 items-center" aria-hidden="true">
        <svg viewBox="0 0 40 12" class="w-full overflow-visible">
          <line
            x1="0" y1="6" x2="34" y2="6"
            stroke-width="2.5"
            stroke-linecap="round"
            :stroke="step > i ? 'var(--accent)' : 'var(--border-strong)'"
            :stroke-dasharray="step === i + 1 ? '6 6' : undefined"
            :style="step === i + 1 ? 'animation: fw-dash .6s linear infinite' : undefined"
          />
          <path d="M32 1l7 5-7 5" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :stroke="step > i ? 'var(--accent)' : 'var(--border-strong)'" />
        </svg>
      </li>
    </template>
  </ol>
</template>
