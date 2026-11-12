<script setup lang="ts">
/**
 * La cascade CSS : plusieurs règles visent le même élément, laquelle gagne ?
 * On active ou désactive des règles et l'on voit, pour chacune, si elle
 * s'applique, si elle est écrasée, ou si elle se transmet par héritage.
 */
import { ArrowDown, Crown, Droplets, ListOrdered, Target } from '@lucide/vue'

const HTML = `<div class="fiche">
  <h1>Le chien du jour</h1>
  <p>Un nouveau compagnon chaque jour.</p>
  <button class="special">Découvrir un chien</button>
</div>`

/** Styles de base, non affichés : la forme de la fiche et du bouton. */
const BASE = `body { font-family: system-ui, sans-serif; background: #fdf2e4; margin: 0; min-height: 100vh; display: grid; place-items: center; }
.fiche { background: white; padding: 22px; border-radius: 22px; max-width: 280px; text-align: center; box-shadow: 0 10px 28px rgb(0 0 0 / .1); }
h1 { font-size: 24px; margin: 0 0 12px; }
p { margin: 0 0 16px; line-height: 1.5; }
button { color: white; font: inherit; font-weight: 600; border: none; border-radius: 999px; padding: 12px 22px; }`

interface Rule {
  id: string
  selector: string
  prop: string
  value: string
  swatch: string
  target: 'button' | 'text'
}

const rules: Rule[] = [
  { id: 'A', selector: '.special', prop: 'background', value: '#7c3aed', swatch: '#7c3aed', target: 'button' },
  { id: 'B', selector: 'button', prop: 'background', value: '#ea580c', swatch: '#ea580c', target: 'button' },
  { id: 'C', selector: 'button', prop: 'background', value: '#16a34a', swatch: '#16a34a', target: 'button' },
  { id: 'D', selector: '.fiche', prop: 'color', value: '#9a3412', swatch: '#9a3412', target: 'text' },
]

const on = reactive<Record<string, boolean>>({ A: false, B: true, C: true, D: false })

/** Règle gagnante pour le fond du bouton : la classe l'emporte, sinon la dernière écrite. */
const buttonWinner = computed(() => {
  if (on.A) return 'A'
  if (on.C) return 'C'
  if (on.B) return 'B'
  return null
})

function status(r: Rule): { kind: 'win' | 'lost' | 'inherit' | 'off'; text: string } {
  if (!on[r.id]) return { kind: 'off', text: 'Désactivée' }
  if (r.target === 'text') return { kind: 'inherit', text: 'Héritage : h1 et p prennent la couleur de leur parent .fiche' }
  if (buttonWinner.value === r.id) {
    if (r.id === 'A' && (on.B || on.C)) return { kind: 'win', text: 'Gagne : une classe est plus précise qu’un nom de balise' }
    if (r.id === 'C' && on.B) return { kind: 'win', text: 'Gagne : à précision égale, la dernière règle écrite l’emporte' }
    return { kind: 'win', text: 'S’applique : aucune autre règle ne la contredit' }
  }
  return { kind: 'lost', text: `Écrasée par la règle ${buttonWinner.value}` }
}

const css = computed(() => {
  const active = rules.filter((r) => on[r.id]).map((r) => `${r.selector} { ${r.prop}: ${r.value}; }`)
  return `${BASE}\nbutton { background: #a8a29e; }\n${active.join('\n')}`
})

/** Le principe illustré par la situation actuelle. */
const principle = computed(() => {
  if (on.A && (on.B || on.C)) return 'precision'
  if (on.B && on.C) return 'ordre'
  if (on.D) return 'heritage'
  return null
})

const principles = [
  { id: 'ordre', icon: ListOrdered, title: 'L’ordre', text: 'À précision égale, la règle écrite en dernier gagne.' },
  { id: 'precision', icon: Target, title: 'La précision', text: 'Un sélecteur plus précis (une classe) gagne sur un nom de balise.' },
  { id: 'heritage', icon: Droplets, title: 'L’héritage', text: 'Certaines propriétés, comme la couleur du texte, descendent du parent vers ses enfants.' },
]
</script>

<template>
  <div class="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
    <div class="flex min-h-0 flex-col gap-3">
      <!-- La feuille de style, règle par règle -->
      <div class="code-surface rounded-2xl border border-border p-2">
        <p class="flex items-center gap-1.5 px-2 pt-1 pb-2 font-mono text-xs text-subtle">
          style.css <ArrowDown :size="13" /> lue de haut en bas
        </p>
        <ul class="space-y-1.5">
          <li v-for="r in rules" :key="r.id">
            <label
              class="flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 transition"
              :class="{
                'border-emerald-500/60 bg-emerald-500/10': status(r).kind === 'win',
                'border-sky-500/60 bg-sky-500/10': status(r).kind === 'inherit',
                'border-border opacity-80': status(r).kind === 'lost',
                'border-dashed border-border opacity-50': status(r).kind === 'off',
              }"
            >
              <input v-model="on[r.id]" type="checkbox" class="mt-1.5 size-4 shrink-0 accent-[var(--accent)]">
              <span class="grid size-6 shrink-0 place-items-center rounded-md bg-surface-3 text-xs font-bold">{{ r.id }}</span>
              <span class="min-w-0 flex-1">
                <code class="block font-mono text-[clamp(0.82rem,1.05cqi,1.05rem)]"><span class="tok-selector">{{ r.selector }}</span><span class="tok-punctuation">{{ ' { ' }}</span><span :class="status(r).kind === 'lost' ? 'line-through decoration-rose-500 decoration-2' : ''"><span class="tok-property">{{ r.prop }}</span>{{ ': ' }}<span class="tok-number">{{ r.value }}</span>;</span>{{ ' ' }}<span class="inline-block size-3 rounded-sm align-middle" :style="{ background: r.swatch }" /><span class="tok-punctuation">{{ ' }' }}</span></code>
                <span
                  class="mt-0.5 flex items-center gap-1 text-xs"
                  :class="{ 'text-emerald-600 dark:text-emerald-400': status(r).kind === 'win', 'text-sky-600 dark:text-sky-400': status(r).kind === 'inherit', 'text-rose-500': status(r).kind === 'lost', 'text-subtle': status(r).kind === 'off' }"
                >
                  <Crown v-if="status(r).kind === 'win'" :size="12" />{{ status(r).text }}
                </span>
              </span>
            </label>
          </li>
        </ul>
      </div>

      <!-- Les trois principes -->
      <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div
          v-for="p in principles"
          :key="p.id"
          class="rounded-xl border p-3 transition"
          :class="principle === p.id ? 'border-accent bg-accent-soft' : 'border-border bg-surface'"
        >
          <p class="slide-small flex items-center gap-1.5 font-semibold"><component :is="p.icon" :size="16" class="text-accent-fg" /> {{ p.title }}</p>
          <p class="mt-1 text-xs leading-snug text-muted">{{ p.text }}</p>
        </div>
      </div>
    </div>

    <LivePreview class="min-h-[18rem]" :html="HTML" :css="css" :debounce="0" :show-console="false" />
  </div>
</template>
