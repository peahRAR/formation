<script setup lang="ts">
/**
 * Éditeur de code minimaliste : une zone de texte transparente superposée
 * au code coloré. Aucune dépendance, suffisant pour de courts exemples.
 *
 * Tab insère deux espaces ; Échap rend la main à la navigation clavier.
 */
import type { CodeLang } from '~/types/course'

const props = defineProps<{ lang: CodeLang; label?: string }>()
const code = defineModel<string>({ required: true })

const highlighted = computed(() => highlight(code.value, props.lang) + '\n')
const lineCount = computed(() => code.value.split('\n').length)

const textarea = ref<HTMLTextAreaElement>()
const pre = ref<HTMLElement>()
const gutter = ref<HTMLElement>()

function syncScroll() {
  if (!textarea.value) return
  const { scrollTop, scrollLeft } = textarea.value
  if (pre.value) {
    pre.value.scrollTop = scrollTop
    pre.value.scrollLeft = scrollLeft
  }
  if (gutter.value) gutter.value.scrollTop = scrollTop
}

function onKeydown(e: KeyboardEvent) {
  const el = e.target as HTMLTextAreaElement
  if (e.key === 'Escape') {
    el.blur()
    return
  }
  if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault()
    const { selectionStart: s, selectionEnd: end } = el
    code.value = code.value.slice(0, s) + '  ' + code.value.slice(end)
    nextTick(() => el.setSelectionRange(s + 2, s + 2))
  }
}
</script>

<template>
  <div class="code-surface relative flex min-h-0 flex-1 overflow-hidden font-mono text-[clamp(0.8rem,1cqi,1rem)] leading-[1.7]">
    <div ref="gutter" aria-hidden="true" class="w-10 shrink-0 overflow-hidden py-3 pr-3 text-right text-subtle/70 select-none">
      <div v-for="n in lineCount" :key="n">{{ n }}</div>
    </div>
    <div class="relative min-w-0 flex-1">
      <pre
        ref="pre"
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 m-0 overflow-hidden py-3 pr-4 whitespace-pre"
      ><code v-html="highlighted" /></pre>
      <textarea
        ref="textarea"
        v-model="code"
        :aria-label="label ?? 'Éditeur de code'"
        spellcheck="false"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        wrap="off"
        class="absolute inset-0 m-0 resize-none overflow-auto border-0 bg-transparent py-3 pr-4 whitespace-pre text-transparent caret-[var(--accent)] outline-none selection:bg-[var(--accent-soft)]"
        @scroll="syncScroll"
        @keydown="onKeydown"
      />
    </div>
  </div>
</template>

<style scoped>
textarea,
pre {
  font: inherit;
  line-height: inherit;
  tab-size: 2;
  letter-spacing: normal;
}
textarea::selection {
  color: transparent;
}
</style>
