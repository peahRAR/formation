<script setup lang="ts">
import type { TitleSlide } from '~/types/course'

defineProps<{ slide: TitleSlide }>()

const techs = [
  { label: 'HTML', accent: 'orange' },
  { label: 'CSS', accent: 'blue' },
  { label: 'Frameworks CSS', accent: 'sky' },
  { label: 'DOM & JavaScript', accent: 'amber' },
  { label: 'API', accent: 'emerald' },
  { label: 'Frameworks JS', accent: 'violet' },
]
</script>

<template>
  <div class="relative flex h-full flex-col items-center justify-center overflow-hidden text-center">
    <!-- Halo décoratif -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="absolute left-1/2 top-1/2 size-[60cqi] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl" />
    </div>
    <div class="animate-pop mb-[clamp(1rem,2.5cqi,2.5rem)] grid size-[clamp(4rem,8cqi,7.5rem)] place-items-center rounded-[28%] bg-accent text-white shadow-xl shadow-[var(--accent-soft)]">
      <AppIcon :name="slide.icon" :size="'45%'" :stroke-width="1.8" />
    </div>
    <p v-if="slide.eyebrow" class="slide-eyebrow mb-4">{{ slide.eyebrow }}</p>
    <h1 class="slide-hero max-w-[18ch]">{{ slide.title }}</h1>
    <p v-if="slide.subtitle" class="slide-subtitle mx-auto mt-6 max-w-[48ch]">{{ slide.subtitle }}</p>
    <ul v-if="slide.id === 'couverture'" class="mt-[clamp(1.5rem,3.5cqi,3.5rem)] flex max-w-3xl flex-wrap justify-center gap-2">
      <li
        v-for="(t, i) in techs"
        :key="t.label"
        :data-accent="t.accent"
        class="animate-pop rounded-full border border-[var(--accent-soft)] bg-accent-soft px-3.5 py-1.5 text-[clamp(0.8rem,1.1cqi,1.1rem)] font-semibold text-accent-fg"
        :style="{ animationDelay: `${200 + i * 90}ms` }"
      >
        {{ t.label }}
      </li>
    </ul>
  </div>
</template>
