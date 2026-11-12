<script setup lang="ts">
/**
 * Comparaison avant / après : deux rendus superposés, séparés par un curseur
 * que l'on fait glisser (souris, doigt ou flèches du clavier).
 */
import { ChevronsLeftRight } from '@lucide/vue'

interface Side {
  label: string
  html: string
  css?: string
}
defineProps<{ before: Side; after: Side }>()

const position = ref(50)
const box = ref<HTMLElement>()
const dragging = ref(false)

function setFromEvent(e: PointerEvent) {
  const r = box.value?.getBoundingClientRect()
  if (!r) return
  position.value = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
}
function onDown(e: PointerEvent) {
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  setFromEvent(e)
}
function onMove(e: PointerEvent) {
  if (dragging.value) setFromEvent(e)
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault()
    e.stopPropagation()
    position.value = Math.min(100, Math.max(0, position.value + (e.key === 'ArrowLeft' ? -5 : 5)))
  }
}
</script>

<template>
  <div class="browser-frame">
    <div class="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2 text-xs font-semibold">
      <span class="text-muted">← {{ before.label }}</span>
      <span class="text-accent-fg">{{ after.label }} →</span>
    </div>
    <div
      ref="box"
      class="relative min-h-0 flex-1 touch-none select-none"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="dragging = false"
      @pointercancel="dragging = false"
    >
      <!-- Les iframes ne doivent pas capter la souris pendant le glissement. -->
      <LivePreview class="pointer-events-none absolute inset-0 rounded-none border-0" :html="before.html" :css="before.css" :chrome="false" :show-console="false" />
      <div class="pointer-events-none absolute inset-0" :style="{ clipPath: `inset(0 0 0 ${position}%)` }">
        <LivePreview class="absolute inset-0 rounded-none border-0" :html="after.html" :css="after.css" :chrome="false" :show-console="false" />
      </div>
      <div class="absolute inset-y-0 w-0.5 bg-accent" :style="{ left: `${position}%` }">
        <button
          type="button"
          role="slider"
          aria-label="Position de la comparaison"
          :aria-valuenow="Math.round(position)"
          aria-valuemin="0"
          aria-valuemax="100"
          class="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-accent text-white shadow-lg ring-4 ring-[var(--accent-soft)]"
          @keydown="onKey"
        >
          <ChevronsLeftRight :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>
