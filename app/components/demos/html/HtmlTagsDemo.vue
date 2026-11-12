<script setup lang="ts">
/** Cinq balises de base : en choisir une la montre dans le code et le rendu. */
const props = defineProps<{ html: string }>()

const tags = [
  { tag: 'h1', name: 'Titre', text: 'Le titre principal de la page (il existe h1 à h6).' },
  { tag: 'p', name: 'Paragraphe', text: 'Un bloc de texte.' },
  { tag: 'img', name: 'Image', text: 'Affiche une image. Pas de balise fermante.' },
  { tag: 'button', name: 'Bouton', text: 'Un élément sur lequel on peut cliquer.' },
  { tag: 'div', name: 'Boîte', text: 'Un conteneur neutre qui regroupe d’autres éléments.' },
]

const elements = computed(() => parseElements(props.html))
const selected = ref('h1')
const index = computed(() => {
  const i = elements.value.findIndex((e) => e.tag === selected.value)
  return i === -1 ? null : i
})
const lines = computed(() => (index.value === null ? [] : elementLines(elements.value[index.value])))
</script>

<template>
  <div class="grid grid-cols-1 h-full min-h-0 gap-4 lg:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)_minmax(0,1fr)]">
    <ul class="grid grid-cols-1 content-start gap-2 sm:grid-cols-2 lg:grid-cols-1" role="listbox" aria-label="Balises HTML">
      <li v-for="t in tags" :key="t.tag">
        <button
          role="option"
          :aria-selected="selected === t.tag"
          class="flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition"
          :class="selected === t.tag ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-border-strong'"
          @click="selected = t.tag"
        >
          <code class="mt-0.5 shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[clamp(0.8rem,1cqi,1rem)] font-semibold text-[var(--tok-tag)]">&lt;{{ t.tag }}&gt;</code>
          <span class="min-w-0">
            <span class="slide-small block font-semibold">{{ t.name }}</span>
            <span class="block text-xs leading-snug text-muted">{{ t.text }}</span>
          </span>
        </button>
      </li>
    </ul>
    <CodeViewer class="min-h-[14rem]" :files="[{ name: 'index.html', lang: 'html', code: html }]" :active-lines="lines" dim-others />
    <LivePreview class="min-h-[16rem]" :html="html" inspect :highlight-index="index" />
  </div>
</template>
