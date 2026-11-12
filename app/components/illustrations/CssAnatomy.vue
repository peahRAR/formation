<script setup lang="ts">
/**
 * Anatomie d'une règle CSS (sélecteur, propriété, valeur), et application
 * déclaration par déclaration sur un bouton.
 */
import { Play, RotateCcw } from '@lucide/vue'

const decls = [
  { prop: 'background', value: '#ea580c', style: { background: '#ea580c' } },
  { prop: 'color', value: 'white', style: { color: 'white' } },
  { prop: 'padding', value: '12px 22px', style: { padding: '12px 22px' } },
  { prop: 'border-radius', value: '999px', style: { borderRadius: '999px' } },
  { prop: 'border', value: 'none', style: { border: 'none' } },
]
const applied = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function apply() {
  clearInterval(timer)
  applied.value = 0
  timer = setInterval(() => {
    if (applied.value >= decls.length) return clearInterval(timer)
    applied.value++
  }, 650)
}
onBeforeUnmount(() => clearInterval(timer))

const buttonStyle = computed(() => Object.assign({}, ...decls.slice(0, applied.value).map((d) => d.style)))
</script>

<template>
  <div class="grid grid-cols-1 h-full items-center gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
    <div class="flex flex-col gap-4">
      <div class="code-surface relative rounded-2xl border border-border p-[clamp(1rem,2.4cqi,2.5rem)] font-mono text-[clamp(0.95rem,1.7cqi,1.7rem)] leading-[1.7]">
        <div>
          <span class="tok-selector rounded-md bg-[var(--accent-soft)] px-1 ring-2 ring-[var(--tok-selector)]/40">button</span>
          <span class="tok-punctuation"> {</span>
          <span class="ml-4 font-sans text-[0.55em] font-semibold text-[var(--tok-selector)]">← le sélecteur : à qui s’applique la règle</span>
        </div>
        <div
          v-for="(d, i) in decls"
          :key="d.prop"
          class="rounded-md pl-[2ch] transition-colors duration-300"
          :class="i < applied ? 'bg-[var(--code-line)]' : ''"
        >
          <span class="tok-property">{{ d.prop }}</span><span class="tok-punctuation">: </span><span class="tok-number">{{ d.value }}</span><span class="tok-punctuation">;</span>
        </div>
        <div><span class="tok-punctuation">}</span></div>
        <div class="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-sans text-[0.55em] font-semibold">
          <span class="text-[var(--tok-property)]">propriété : ce que l’on change</span>
          <span class="text-[var(--tok-number)]">valeur : comment on le change</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-6">
      <div class="grid w-full place-items-center rounded-3xl bg-white p-[clamp(2rem,5cqi,5rem)] shadow-inner ring-1 ring-black/5">
        <!-- Bouton « brut » du navigateur, puis stylé -->
        <button
          type="button"
          style="all: revert; font: 600 18px system-ui, sans-serif; transition: all 0.5s ease"
          :style="buttonStyle"
          tabindex="-1"
        >
          Découvrir un chien
        </button>
      </div>
      <div class="flex gap-2">
        <button class="btn-primary" @click="apply"><Play :size="16" /> Appliquer la règle</button>
        <button class="btn-ghost" :disabled="applied === 0" @click="(applied = 0)"><RotateCcw :size="16" /></button>
      </div>
    </div>
  </div>
</template>
