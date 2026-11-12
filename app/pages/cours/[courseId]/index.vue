<script setup lang="ts">
/** Sommaire d'un cours : objectifs, sections, progression. */
import { ArrowRight, BookOpen, Check, Clock, GraduationCap, NotebookPen, RotateCcw, Target } from '@lucide/vue'

const course = useCurrentCourse()
const progress = useProgress()
const mounted = ref(false)
onMounted(() => (mounted.value = true))

useHead(() => ({ title: course.value.title, meta: [{ name: 'description', content: course.value.description }] }))

const fullCount = computed(() => countSlides(course.value))
const percent = computed(() => (mounted.value ? progress.percent(course.value) : 0))
const resumeId = computed(() => (mounted.value ? progress.get(course.value.id).last : undefined))

const confirmReset = ref(false)
function reset() {
  if (!confirmReset.value) {
    confirmReset.value = true
    setTimeout(() => (confirmReset.value = false), 4000)
    return
  }
  progress.resetCourse(course.value.id)
  confirmReset.value = false
}
</script>

<template>
  <div>
    <PageTopbar :title="course.title" />
    <div class="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14" data-accent="indigo">
      <p class="mb-4 flex flex-wrap gap-2">
        <span class="chip"><GraduationCap :size="13" /> {{ course.level }}</span>
        <span class="chip"><Clock :size="13" /> {{ formatDuration(course.duration) }} · {{ fullCount }} diapositives</span>
      </p>
      <h1 class="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{{ course.title }}</h1>
      <p class="mt-4 max-w-2xl text-lg text-muted text-pretty">{{ course.description }}</p>

      <NuxtLink :to="playerLink(course.id, resumeId)" class="btn-primary mt-8 px-5 py-3 text-base">
        <BookOpen :size="18" /> {{ resumeId ? 'Reprendre le cours' : 'Commencer le cours' }} <ArrowRight :size="18" />
      </NuxtLink>

      <div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <!-- Sections -->
        <section>
          <h2 class="mb-4 text-lg font-bold">Au programme</h2>
          <ol class="space-y-3">
            <li v-for="(section, i) in course.sections" :key="section.id" :data-accent="section.accent" class="card overflow-hidden">
              <NuxtLink :to="playerLink(course.id, section.slides[0]?.id)" class="group flex items-center gap-4 p-4 transition hover:bg-surface-2">
                <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-fg"><AppIcon :name="section.icon" :size="20" /></span>
                <span class="min-w-0 flex-1">
                  <span class="text-xs font-semibold uppercase tracking-wider text-accent-fg">Section {{ i + 1 }}</span>
                  <span class="block font-semibold">{{ section.title }}</span>
                  <span class="block text-xs text-subtle">{{ section.slides.length }} diapositives</span>
                </span>
                <span
                  v-if="mounted && progress.sectionPercent(course.id, sectionSlideIds(section)) === 100"
                  class="grid size-7 place-items-center rounded-full bg-accent text-white"
                  title="Section terminée"
                >
                  <Check :size="15" :stroke-width="3" />
                </span>
                <ArrowRight v-else :size="18" class="text-subtle transition group-hover:translate-x-1 group-hover:text-accent-fg" />
              </NuxtLink>
            </li>
          </ol>
        </section>

        <!-- Objectifs et progression -->
        <aside class="space-y-6">
          <div class="card p-5">
            <h2 class="mb-3 flex items-center gap-2 font-bold"><Target :size="18" class="text-accent-fg" /> À la fin du cours</h2>
            <ul class="space-y-2.5 text-sm text-muted">
              <li v-for="o in course.objectives" :key="o" class="flex gap-2">
                <Check :size="16" class="mt-0.5 shrink-0 text-accent-fg" /> {{ o }}
              </li>
            </ul>
          </div>
          <div class="card p-5">
            <h2 class="mb-3 font-bold">Votre progression</h2>
            <div class="flex items-center gap-3">
              <ProgressRing :value="percent" :size="44" />
              <p class="text-sm text-muted"><span class="text-2xl font-bold text-fg">{{ percent }} %</span><br>des diapositives vues</p>
            </div>
            <button v-if="percent > 0" class="btn-ghost mt-3 w-full text-xs" @click="reset">
              <RotateCcw :size="14" /> {{ confirmReset ? 'Cliquez à nouveau pour confirmer' : 'Remettre à zéro' }}
            </button>
          </div>
          <NuxtLink :to="`/cours/${course.id}/notes`" class="btn-secondary w-full">
            <NotebookPen :size="16" /> Notes du formateur
          </NuxtLink>
        </aside>
      </div>
    </div>
  </div>
</template>
