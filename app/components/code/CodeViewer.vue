<script setup lang="ts">
/**
 * Visionneuse de code : coloration syntaxique, onglets, numéros de ligne,
 * mise en évidence de lignes et bouton de copie.
 */
import { Check, Copy } from '@lucide/vue'
import type { CodeFile } from '~/types/course'

const props = withDefaults(
  defineProps<{
    files: CodeFile[]
    /** Lignes à surligner (prioritaire sur `highlight` du fichier). */
    activeLines?: number[]
    /** Estompe les lignes non surlignées pour guider le regard. */
    dimOthers?: boolean
    /** Rend les lignes survolables (émet `hover-line`). */
    interactive?: boolean
    /** Taille du texte. */
    size?: 'sm' | 'md' | 'lg'
    /** Onglet actif contrôlé de l'extérieur. */
    tab?: number
    /** Masque la barre d'onglets (le parent fournit la sienne). */
    hideHeader?: boolean
  }>(),
  { size: 'md', interactive: false, dimOthers: false },
)

const emit = defineEmits<{ 'hover-line': [line: number | null]; 'click-line': [line: number]; 'update:tab': [tab: number] }>()

const localTab = ref(props.tab ?? 0)
watch(
  () => props.tab,
  (t) => {
    if (t !== undefined) localTab.value = t
  },
)
const current = computed(() => props.files[localTab.value] ?? props.files[0]!)
const lines = computed(() => highlightLines(current.value.code, current.value.lang))
const marked = computed(() => new Set(props.activeLines ?? current.value.highlight ?? []))

function selectTab(i: number) {
  localTab.value = i
  emit('update:tab', i)
}

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(current.value.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    /* presse-papiers indisponible */
  }
}

// Fait défiler jusqu'à la première ligne surlignée.
const scroller = ref<HTMLElement>()
watch(
  () => [...marked.value].join(','),
  async () => {
    await nextTick()
    const first = scroller.value?.querySelector<HTMLElement>('[data-marked="true"]')
    if (!first || !scroller.value) return
    const box = scroller.value.getBoundingClientRect()
    const r = first.getBoundingClientRect()
    if (r.top < box.top || r.bottom > box.bottom) {
      scroller.value.scrollBy({ top: r.top - box.top - box.height / 3, behavior: 'smooth' })
    }
  },
)

const sizeClass = computed(
  () =>
    ({
      sm: 'text-[0.8rem] leading-6',
      md: 'text-[clamp(0.82rem,1.05cqi,1.05rem)] leading-[1.75]',
      lg: 'text-[clamp(0.9rem,1.25cqi,1.25rem)] leading-[1.75]',
    })[props.size],
)
</script>

<template>
  <div class="code-surface flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-border">
    <div v-if="!hideHeader" class="flex items-center gap-1 border-b border-border px-2 py-1.5">
      <div class="flex min-w-0 flex-1 gap-1 overflow-x-auto" role="tablist">
        <button
          v-for="(file, i) in files"
          :key="file.name"
          role="tab"
          :aria-selected="i === localTab"
          class="rounded-lg px-2.5 py-1 font-mono text-xs font-medium whitespace-nowrap transition"
          :class="i === localTab ? 'bg-surface-3 text-fg' : 'text-subtle hover:text-fg'"
          @click="selectTab(i)"
        >
          {{ file.name }}
        </button>
      </div>
      <slot name="actions" />
      <button class="icon-btn size-8" :title="copied ? 'Copié !' : 'Copier le code'" :aria-label="copied ? 'Copié' : 'Copier le code'" @click="copy">
        <Check v-if="copied" :size="16" class="text-emerald-500" />
        <Copy v-else :size="16" />
      </button>
    </div>
    <div ref="scroller" class="min-h-0 flex-1 overflow-auto py-3">
      <pre class="font-mono" :class="sizeClass"><code class="block min-w-max"><span
        v-for="(line, i) in lines"
        :key="i"
        class="flex pr-6 transition-[background-color,opacity] duration-300"
        :class="[
          marked.has(i + 1) ? 'bg-[var(--code-line)] shadow-[inset_3px_0_0_var(--accent)]' : '',
          dimOthers && marked.size && !marked.has(i + 1) ? 'opacity-40' : '',
          interactive ? 'cursor-default hover:bg-[var(--code-line)]' : '',
        ]"
        :data-marked="marked.has(i + 1)"
        @mouseenter="interactive && emit('hover-line', i + 1)"
        @mouseleave="interactive && emit('hover-line', null)"
        @click="interactive && emit('click-line', i + 1)"
      ><span class="w-10 shrink-0 select-none pr-4 text-right text-subtle/70">{{ i + 1 }}</span><span class="whitespace-pre" v-html="line || ' '" /></span></code></pre>
    </div>
  </div>
</template>
