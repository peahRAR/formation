<script setup lang="ts">
/**
 * Trois vues d'une même page : le code HTML, l'arbre DOM et le rendu.
 * Sélectionner un nœud le met en évidence partout.
 */
import { CSS_CARD, HTML_CARD } from '~/content/courses/site-web/fil-rouge'

const elements = computed(() => parseElements(HTML_CARD))
const selected = ref<number | null>(elements.value.findIndex((e) => e.tag === 'p'))
const hovered = ref<number | null>(null)
const focus = computed(() => hovered.value ?? selected.value)
const current = computed(() => (focus.value === null ? undefined : elements.value[focus.value]))
</script>

<template>
  <div class="grid grid-cols-1 h-full min-h-0 gap-4 lg:grid-cols-3">
    <div class="flex min-h-0 flex-col gap-2">
      <p class="slide-small font-semibold text-muted">Le code</p>
      <CodeViewer
        class="min-h-[12rem] flex-1"
        :files="[{ name: 'index.html', lang: 'html', code: HTML_CARD }]"
        :active-lines="elementLines(current)"
        size="sm"
        interactive
        @click-line="(l) => (selected = elementAtLine(elements, l))"
      />
    </div>
    <div class="flex min-h-0 flex-col gap-2">
      <p class="slide-small font-semibold text-muted">L’arbre DOM</p>
      <div class="card flex min-h-[14rem] flex-1 flex-col overflow-auto p-4">
        <DomTree :elements="elements" :selected="focus" interactive :show-text="false" @select="(i) => (selected = i)" />
        <dl v-if="current" class="mt-auto grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-xl bg-surface-2 p-3 pt-3 text-xs">
          <dt class="text-subtle">Nœud</dt>
          <dd class="font-mono font-semibold">{{ current.tag }}</dd>
          <template v-for="(v, k) in current.attrs" :key="k">
            <dt class="text-subtle">{{ k }}</dt>
            <dd class="truncate font-mono">{{ v }}</dd>
          </template>
          <template v-if="current.text">
            <dt class="text-subtle">Texte</dt>
            <dd class="truncate">{{ current.text }}</dd>
          </template>
        </dl>
      </div>
    </div>
    <div class="flex min-h-0 flex-col gap-2">
      <p class="slide-small font-semibold text-muted">Le rendu</p>
      <LivePreview class="min-h-[16rem] flex-1" :html="HTML_CARD" :css="CSS_CARD" inspect :highlight-index="focus" @hover="(i) => (hovered = i)" />
    </div>
  </div>
</template>
