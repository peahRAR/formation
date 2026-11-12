<script setup lang="ts">
/**
 * Bac à sable : code modifiable (HTML, CSS et/ou JavaScript) et son résultat
 * côte à côte. Le JavaScript s'exécute dans une iframe isolée.
 */
import { Lock, PencilLine, RotateCcw } from '@lucide/vue'
import type { CodeLang } from '~/types/course'

type Part = 'html' | 'css' | 'js'

const props = withDefaults(
  defineProps<{
    html: string
    css?: string
    js?: string
    head?: string
    /** Parties modifiables par l'apprenant. */
    editable?: Part[]
    initialTab?: Part
  }>(),
  { css: '', js: '', editable: () => ['html', 'css', 'js'] },
)

const original = { html: props.html, css: props.css, js: props.js }
const code = reactive({ ...original })

const tabs = computed(() =>
  (
    [
      { id: 'html', name: 'index.html', lang: 'html' },
      { id: 'css', name: 'style.css', lang: 'css' },
      { id: 'js', name: 'script.js', lang: 'js' },
    ] as { id: Part; name: string; lang: CodeLang }[]
  ).filter((t) => original[t.id] || props.editable.includes(t.id)),
)

const active = ref<Part>(props.initialTab ?? props.editable[0] ?? 'html')
const activeTab = computed(() => tabs.value.find((t) => t.id === active.value) ?? tabs.value[0]!)
const isEditable = computed(() => props.editable.includes(activeTab.value.id))
const isModified = computed(() => code.html !== original.html || code.css !== original.css || code.js !== original.js)

function reset() {
  Object.assign(code, original)
}
</script>

<template>
  <div class="grid grid-cols-1 h-full min-h-0 gap-4 lg:grid-cols-2">
    <div class="code-surface flex min-h-[18rem] flex-col overflow-hidden rounded-2xl border border-border">
      <div class="flex items-center gap-1 border-b border-border px-2 py-1.5">
        <div class="flex flex-1 gap-1 overflow-x-auto" role="tablist">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            role="tab"
            :aria-selected="tab.id === activeTab.id"
            class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-medium whitespace-nowrap transition"
            :class="tab.id === activeTab.id ? 'bg-surface-3 text-fg' : 'text-subtle hover:text-fg'"
            @click="active = tab.id"
          >
            <PencilLine v-if="editable.includes(tab.id)" :size="12" class="text-accent" />
            <Lock v-else :size="12" />
            {{ tab.name }}
          </button>
        </div>
        <span v-if="!isEditable" class="chip mr-1 hidden sm:inline-flex"><Lock :size="12" /> Lecture seule</span>
        <button class="btn-ghost px-2.5 py-1.5 text-xs" :disabled="!isModified" @click="reset">
          <RotateCcw :size="14" />
          Réinitialiser
        </button>
      </div>
      <CodeEditor v-if="isEditable" v-model="code[activeTab.id]" :lang="activeTab.lang" :label="`Modifier ${activeTab.name}`" />
      <div v-else class="relative flex min-h-0 flex-1">
        <CodeViewer
          class="flex-1 rounded-none border-0"
          :files="[{ name: activeTab.name, lang: activeTab.lang, code: code[activeTab.id] }]"
          size="md"
          hide-header
        />
      </div>
    </div>
    <LivePreview class="min-h-[18rem]" :html="code.html" :css="code.css" :js="code.js" :head="head" />
  </div>
</template>
