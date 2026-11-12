<script setup lang="ts">
/**
 * Le CSS imbriqué (nesting) : la même feuille de style écrite à plat ou
 * imbriquée. Survoler un bloc l'allume dans les deux versions.
 */
import { CSS_CARD, HTML_CARD } from '~/content/courses/site-web/fil-rouge'

const FLAT = `.fiche {
  background: white;
  padding: 24px;
}

.fiche h1 {
  color: #9a3412;
}

.fiche button {
  background: #ea580c;
}

.fiche button:hover {
  background: #7c2d12;
}`

const NESTED = `.fiche {
  background: white;
  padding: 24px;

  h1 {
    color: #9a3412;
  }

  button {
    background: #ea580c;

    &:hover {
      background: #7c2d12;
    }
  }
}`

const groups = [
  { id: 'fiche', label: '.fiche', flat: [1, 2, 3, 4], nested: [1, 2, 3, 16] },
  { id: 'h1', label: '.fiche h1', flat: [6, 7, 8], nested: [5, 6, 7] },
  { id: 'button', label: '.fiche button', flat: [10, 11, 12], nested: [9, 10, 15] },
  { id: 'hover', label: '.fiche button:hover', flat: [14, 15, 16], nested: [12, 13, 14] },
]

const active = ref<string | null>(null)
const group = computed(() => groups.find((g) => g.id === active.value))

function fromLine(side: 'flat' | 'nested', line: number | null) {
  if (line === null) return (active.value = null)
  // On choisit le bloc le plus intérieur qui contient la ligne.
  const hits = groups.filter((g) => {
    const l = g[side]
    return line >= l[0]! && line <= l[l.length - 1]!
  })
  active.value = hits.length ? hits[hits.length - 1]!.id : null
}

const css = `${CSS_CARD}\n\n${NESTED}`
</script>

<template>
  <div class="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
    <div class="flex min-h-0 flex-col gap-2">
      <p class="slide-small font-semibold">À plat <span class="font-normal text-muted">· on répète <code class="font-mono">.fiche</code></span></p>
      <CodeViewer
        class="min-h-[14rem] flex-1"
        :files="[{ name: 'style.css', lang: 'css', code: FLAT }]"
        :active-lines="group?.flat ?? []"
        dim-others
        interactive
        @hover-line="fromLine('flat', $event)"
      />
    </div>
    <div class="flex min-h-0 flex-col gap-2">
      <p class="slide-small font-semibold">Imbriqué <span class="font-normal text-muted">· rangé comme des poupées</span></p>
      <CodeViewer
        class="min-h-[14rem] flex-1"
        :files="[{ name: 'style.css (imbriqué)', lang: 'css', code: NESTED }]"
        :active-lines="group?.nested ?? []"
        dim-others
        interactive
        @hover-line="fromLine('nested', $event)"
      />
    </div>
    <div class="flex min-h-0 flex-col gap-3">
      <div class="flex flex-wrap gap-1.5" role="group" aria-label="Blocs">
        <button
          v-for="g in groups"
          :key="g.id"
          class="rounded-lg border px-2 py-1 font-mono text-xs transition"
          :class="active === g.id ? 'border-accent bg-accent-soft text-accent-fg' : 'border-border bg-surface text-muted hover:text-fg'"
          @mouseenter="active = g.id"
          @focus="active = g.id"
          @click="active = active === g.id ? null : g.id"
        >
          {{ g.label }}
        </button>
      </div>
      <LivePreview class="min-h-[16rem] flex-1" :html="HTML_CARD" :css="css" :show-console="false" />
      <p class="text-xs text-muted">Survolez le bouton de l’aperçu : la règle <code class="font-mono">&amp;:hover</code> s’applique.</p>
    </div>
  </div>
</template>
