<script setup lang="ts">
/** Barre du bas : précédent / suivant, compteur et progression par section. */
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import type { Course, PlayerSlide } from '~/types/course'

const props = defineProps<{ sequence: PlayerSlide[]; index: number; course: Course }>()
defineEmits<{ go: [index: number]; prev: []; next: [] }>()

/** Segments de la barre : un par section, proportionnel à son nombre de diapositives. */
const segments = computed(() =>
  props.course.sections
    .map((section) => {
      const items = props.sequence.filter((s) => s.section.id === section.id)
      return { section, first: items[0]?.index ?? -1, count: items.length }
    })
    .filter((s) => s.count > 0),
)

function fill(seg: { first: number; count: number }) {
  const done = props.index - seg.first + 1
  return `${Math.min(100, Math.max(0, (done / seg.count) * 100))}%`
}

const isLast = computed(() => props.index >= props.sequence.length - 1)
</script>

<template>
  <footer class="shrink-0 border-t border-border bg-surface/80 px-3 py-2.5 backdrop-blur sm:px-4">
    <div class="flex items-center gap-3">
      <button class="btn-secondary px-3 py-2" :disabled="index === 0" aria-label="Diapositive précédente" title="Précédente (←)" @click="$emit('prev')">
        <ChevronLeft :size="18" />
        <span class="hidden sm:inline">Précédente</span>
      </button>

      <div class="flex min-w-0 flex-1 flex-col gap-1.5">
        <div class="flex gap-1" role="group" aria-label="Progression par section">
          <button
            v-for="seg in segments"
            :key="seg.section.id"
            :data-accent="seg.section.accent"
            class="group relative h-2 overflow-hidden rounded-full bg-surface-3"
            :style="{ flexGrow: seg.count }"
            :title="seg.section.title"
            :aria-label="`Aller à la section ${seg.section.title}`"
            @click="$emit('go', seg.first)"
          >
            <span class="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-500" :style="{ width: fill(seg) }" />
          </button>
        </div>
        <p class="text-center text-xs tabular-nums text-subtle">
          <span class="font-semibold text-fg">{{ index + 1 }}</span> / {{ sequence.length }}
        </p>
      </div>

      <button class="btn-primary px-3 py-2" :disabled="isLast" aria-label="Diapositive suivante" title="Suivante (→)" @click="$emit('next')">
        <span class="hidden sm:inline">Suivante</span>
        <ChevronRight :size="18" />
      </button>
    </div>
  </footer>
</template>
