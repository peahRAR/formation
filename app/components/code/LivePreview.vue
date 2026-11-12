<script setup lang="ts">
/**
 * Aperçu du résultat d'un exemple, dans une iframe isolée
 * (sandbox="allow-scripts", sans allow-same-origin).
 *
 * - Affiche les erreurs JavaScript et les console.log de l'exemple.
 * - Peut relier les éléments du rendu au code (mode « inspect »).
 */
import { RotateCw, Terminal, TriangleAlert } from '@lucide/vue'
import type { PreviewMessage } from '~/utils/previewDocument'

const props = withDefaults(
  defineProps<{
    html: string
    css?: string
    js?: string
    head?: string
    /** Titre affiché dans la barre d'adresse factice. */
    address?: string
    inspect?: boolean
    /** Index (ordre du document) de l'élément à surligner. */
    highlightIndex?: number | null
    /** Largeur imposée de la zone d'affichage (simulation d'écran). */
    viewportWidth?: number | null
    /** Délai avant mise à jour lors de la frappe. */
    debounce?: number
    showConsole?: boolean
    chrome?: boolean
  }>(),
  { address: 'chien-du-jour.html', debounce: 350, showConsole: true, chrome: true, inspect: false },
)

const emit = defineEmits<{ hover: [index: number | null] }>()

const root = ref<HTMLElement>()
const frame = ref<HTMLIFrameElement>()
const srcdoc = ref('')
const logs = ref<{ type: 'error' | 'log'; message: string }[]>([])
const mounted = ref(false)

function render() {
  logs.value = []
  srcdoc.value = buildPreviewDocument({
    html: props.html,
    css: props.css,
    js: props.js,
    head: props.head,
    baseUrl: `${window.location.origin}/`,
    inspect: props.inspect,
    inspectColor: getComputedStyle(root.value ?? document.documentElement).getPropertyValue('--accent').trim() || '#6366f1',
  })
}

let timer: ReturnType<typeof setTimeout> | undefined
watch(
  () => [props.html, props.css, props.js, props.head],
  () => {
    clearTimeout(timer)
    timer = setTimeout(render, props.debounce)
  },
)

function onMessage(e: MessageEvent) {
  if (!frame.value || e.source !== frame.value.contentWindow) return
  const data = e.data as PreviewMessage
  if (data?.source !== 'fw-preview') return
  if (data.type === 'hover') emit('hover', data.index ?? null)
  else if (data.message !== undefined) logs.value = [...logs.value.slice(-19), { type: data.type, message: data.message }]
}

function sendHighlight() {
  frame.value?.contentWindow?.postMessage({ source: 'fw-parent', type: 'highlight', index: props.highlightIndex ?? null }, '*')
}
watch(() => props.highlightIndex, sendHighlight)

onMounted(() => {
  mounted.value = true
  window.addEventListener('message', onMessage)
  render()
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  window.removeEventListener('message', onMessage)
})

defineExpose({ reload: render })
</script>

<template>
  <div ref="root" class="browser-frame min-h-0 min-w-0">
    <div v-if="chrome" class="flex items-center gap-3 border-b border-border bg-surface-2 px-3 py-2">
      <div class="flex gap-1.5" aria-hidden="true">
        <span class="size-2.5 rounded-full bg-rose-400/80" />
        <span class="size-2.5 rounded-full bg-amber-400/80" />
        <span class="size-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <div class="min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1 text-center text-xs text-subtle">
        {{ address }}
      </div>
      <button class="icon-btn size-7" title="Recharger l’aperçu" aria-label="Recharger l’aperçu" @click="render">
        <RotateCw :size="14" />
      </button>
    </div>
    <div class="relative flex min-h-0 flex-1 justify-center overflow-auto bg-[#eceef2] dark:bg-[#0f1116]">
      <iframe
        v-if="mounted"
        ref="frame"
        :srcdoc="srcdoc"
        sandbox="allow-scripts"
        title="Aperçu du résultat"
        class="h-full min-h-0 bg-white transition-[width] duration-500 ease-out"
        :style="{ width: viewportWidth ? `${viewportWidth}px` : '100%', maxWidth: '100%' }"
        @load="sendHighlight"
      />
    </div>
    <div
      v-if="showConsole && logs.length"
      class="max-h-28 overflow-auto border-t border-border bg-surface-2 px-3 py-2 font-mono text-xs"
      aria-live="polite"
    >
      <div
        v-for="(log, i) in logs"
        :key="i"
        class="flex items-start gap-2 py-0.5"
        :class="log.type === 'error' ? 'text-rose-500' : 'text-muted'"
      >
        <TriangleAlert v-if="log.type === 'error'" :size="13" class="mt-0.5 shrink-0" />
        <Terminal v-else :size="13" class="mt-0.5 shrink-0" />
        <span class="break-all">{{ log.message }}</span>
      </div>
    </div>
  </div>
</template>
