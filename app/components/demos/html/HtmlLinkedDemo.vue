<script setup lang="ts">
/**
 * Code HTML et rendu côte à côte, reliés : survoler une ligne de code
 * surligne l'élément dans le rendu, et inversement.
 */
import { MousePointer2 } from '@lucide/vue'

const props = withDefaults(defineProps<{ html: string; file?: string; css?: string }>(), { file: 'index.html' })

const elements = computed(() => parseElements(props.html))
const active = ref<number | null>(null)
const lines = computed(() => (active.value === null ? [] : elementLines(elements.value[active.value])))
</script>

<template>
  <div class="flex h-full flex-col gap-3">
    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-2">
      <CodeViewer
        class="min-h-[14rem]"
        :files="[{ name: file, lang: 'html', code: html }]"
        :active-lines="lines"
        size="lg"
        interactive
        @hover-line="(l) => (active = l === null ? null : elementAtLine(elements, l))"
      />
      <LivePreview class="min-h-[16rem]" :html="html" :css="css" inspect :highlight-index="active" @hover="(i) => (active = i)" />
    </div>
    <p class="slide-small flex items-center justify-center gap-2 text-subtle">
      <MousePointer2 :size="16" />
      <template v-if="active !== null && elements[active]">
        Balise <code class="rounded bg-accent-soft px-1.5 py-0.5 font-mono font-semibold text-accent-fg">&lt;{{ elements[active]!.tag }}&gt;</code>
      </template>
      <template v-else>Survolez le code ou le rendu</template>
    </p>
  </div>
</template>
