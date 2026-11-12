<script setup lang="ts">
/**
 * Toutes les notes du formateur sur une seule page, consultables hors du
 * mode projection (sur un second écran, une tablette, ou imprimées).
 */
import { Printer } from '@lucide/vue'

const course = useCurrentCourse()
useHead(() => ({ title: `Notes du formateur · ${course.value.title}` }))

let counter = 0
const numbered = computed(() => {
  counter = 0
  return course.value.sections.map((section) => ({
    section,
    slides: section.slides.map((slide) => ({ slide, n: ++counter, paragraphs: (slide.notes ?? '').split(/\n\s*\n/).filter(Boolean) })),
  }))
})

function print() {
  window.print()
}
</script>

<template>
  <div>
    <PageTopbar :title="`Notes du formateur · ${course.title}`">
      <button class="btn-ghost py-1.5 text-xs" @click="print"><Printer :size="15" /> Imprimer</button>
    </PageTopbar>
    <div class="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <h1 class="text-3xl font-extrabold tracking-tight">Notes du formateur</h1>
      <p class="mt-2 text-muted">{{ course.title }}</p>

      <section v-for="{ section, slides } in numbered" :key="section.id" :data-accent="section.accent" class="mt-10 break-inside-avoid-page">
        <h2 class="mb-4 flex items-center gap-2 border-b border-border pb-2 text-lg font-bold">
          <span class="grid size-7 place-items-center rounded-lg bg-accent-soft text-accent-fg"><AppIcon :name="section.icon" :size="15" /></span>
          {{ section.title }}
        </h2>
        <article v-for="{ slide, n, paragraphs } in slides" :key="slide.id" class="mb-6 break-inside-avoid">
          <h3 class="flex flex-wrap items-center gap-2 font-semibold">
            <NuxtLink :to="playerLink(course.id, slide.id)" class="hover:text-accent-fg">
              <span class="tabular-nums text-subtle">{{ n }}.</span> {{ slide.title }}
            </NuxtLink>
          </h3>
          <p v-for="(p, i) in paragraphs" :key="i" class="mt-1.5 whitespace-pre-line text-[0.95rem] leading-relaxed text-muted">{{ p }}</p>
          <p v-if="!paragraphs.length" class="mt-1 text-sm text-subtle italic">Pas de note.</p>
        </article>
      </section>
    </div>
  </div>
</template>
