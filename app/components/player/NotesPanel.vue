<script setup lang="ts">
/** Notes du formateur associées à la diapositive courante. */
import { ExternalLink, NotebookPen, X } from '@lucide/vue'
import type { Slide } from '~/types/course'

const props = defineProps<{ slide: Slide; courseId: string }>()
defineEmits<{ close: [] }>()

const paragraphs = computed(() => (props.slide.notes ?? '').split(/\n\s*\n/).filter(Boolean))
</script>

<template>
  <aside
    class="absolute inset-x-0 bottom-0 z-20 flex max-h-[55%] flex-col border-t border-border bg-surface shadow-2xl lg:static lg:max-h-none lg:w-[22rem] lg:border-t-0 lg:border-l lg:shadow-none"
    aria-label="Notes du formateur"
  >
    <div class="flex items-center gap-2 border-b border-border px-4 py-3">
      <NotebookPen :size="16" class="text-accent-fg" />
      <h2 class="flex-1 text-sm font-semibold">Notes du formateur</h2>
      <NuxtLink :to="`/cours/${courseId}/notes`" class="icon-btn size-8" title="Toutes les notes (page imprimable)" aria-label="Toutes les notes">
        <ExternalLink :size="15" />
      </NuxtLink>
      <button class="icon-btn size-8" aria-label="Fermer les notes" @click="$emit('close')"><X :size="16" /></button>
    </div>
    <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4 text-[0.95rem] leading-relaxed">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">{{ slide.title }}</p>
      <template v-if="paragraphs.length">
        <p v-for="(p, i) in paragraphs" :key="i" class="mb-3 whitespace-pre-line text-muted">{{ p }}</p>
      </template>
      <p v-else class="text-subtle italic">Pas de note pour cette diapositive.</p>
    </div>
  </aside>
</template>
