<script setup lang="ts">
import { Lightbulb } from '@lucide/vue'
import type { TextSlide } from '~/types/course'

defineProps<{ slide: TextSlide }>()
</script>

<template>
  <!-- Grande question posée à la salle -->
  <div v-if="slide.statement" class="flex h-full flex-col items-center justify-center text-center">
    <p v-if="slide.eyebrow" class="slide-eyebrow mb-6">{{ slide.eyebrow }}</p>
    <h2 class="slide-hero max-w-[22ch] text-[clamp(2rem,4.6cqi,4.6rem)]">
      <span class="text-accent">«&nbsp;</span>{{ slide.title }}<span class="text-accent">&nbsp;»</span>
    </h2>
    <p v-if="slide.subtitle" class="slide-subtitle mt-8 max-w-[46ch]">{{ slide.subtitle }}</p>
  </div>

  <div v-else class="flex h-full flex-col justify-center">
    <SlideHeader :eyebrow="slide.eyebrow" :title="slide.title" :subtitle="slide.subtitle" />
    <p v-if="slide.lead" class="slide-subtitle -mt-2 mb-[clamp(1.25rem,2.6cqi,2.75rem)] max-w-[58ch] text-fg/80">{{ slide.lead }}</p>
    <ul v-if="slide.points?.length" class="grid grid-cols-1 gap-[clamp(0.75rem,1.4cqi,1.5rem)] md:grid-cols-3">
      <li
        v-for="(point, i) in slide.points"
        :key="point.title"
        class="card animate-pop p-[clamp(1rem,1.8cqi,2rem)]"
        :style="{ animationDelay: `${i * 110}ms` }"
      >
        <div class="mb-4 grid size-[clamp(2.5rem,3.6cqi,3.5rem)] place-items-center rounded-xl bg-accent-soft text-accent-fg">
          <AppIcon :name="point.icon" :size="'52%'" />
        </div>
        <h3 class="slide-body font-semibold">{{ point.title }}</h3>
        <p v-if="point.text" class="slide-small mt-1.5 leading-relaxed text-muted">{{ point.text }}</p>
      </li>
    </ul>
    <div
      v-if="slide.takeaway"
      class="animate-pop mt-[clamp(1rem,2.2cqi,2.25rem)] flex items-center gap-3 rounded-2xl border border-[var(--accent-soft)] bg-accent-soft px-5 py-4 [animation-delay:400ms]"
    >
      <Lightbulb class="shrink-0 text-accent-fg" :size="22" />
      <p class="slide-body font-semibold">{{ slide.takeaway }}</p>
    </div>
  </div>
</template>
