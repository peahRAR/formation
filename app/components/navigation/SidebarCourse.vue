<script setup lang="ts">
/** Un cours dans la sidebar ; s'il est ouvert, ses sections apparaissent. */
import { Check, ChevronRight, Clock } from '@lucide/vue'
import type { CatalogEntry, PlayerMode } from '~/types/course'
import { isFullCourse } from '~/content/catalog'

const props = defineProps<{ entry: CatalogEntry }>()

const route = useRoute()
const progress = useProgress()
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const course = computed(() => (isFullCourse(props.entry) ? props.entry : null))
const isCurrent = computed(() => route.params.courseId === props.entry.id)
const mode = computed<PlayerMode>(() => (route.params.mode === 'express' ? 'express' : 'complet'))
const inPlayer = computed(() => isCurrent.value && (route.params.mode === 'complet' || route.params.mode === 'express'))

const currentSectionId = computed(() => {
  if (!course.value || !inPlayer.value || !mounted.value) return null
  const slideId = String(route.query.diapo ?? '')
  const seq = buildSequence(course.value, mode.value)
  return (seq.find((s) => s.slide.id === slideId) ?? seq[0])?.section.id ?? null
})

const percent = computed(() => (course.value && mounted.value ? progress.percent(course.value) : 0))

function sectionLink(sectionId: string) {
  const section = course.value!.sections.find((s) => s.id === sectionId)!
  const target = mode.value === 'express' ? section.slides.find((s) => s.express) : section.slides[0]
  return target ? playerLink(props.entry.id, mode.value, target.id) : playerLink(props.entry.id, 'complet', section.slides[0]?.id)
}

function sectionPercent(sectionId: string) {
  if (!mounted.value || !course.value) return 0
  const section = course.value.sections.find((s) => s.id === sectionId)!
  return progress.sectionPercent(props.entry.id, sectionSlideIds(section))
}
</script>

<template>
  <li>
    <!-- Cours à venir -->
    <div v-if="!course" class="flex items-center gap-3 rounded-xl px-2.5 py-2 text-subtle" aria-disabled="true">
      <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2"><AppIcon :name="entry.icon" :size="16" /></span>
      <span class="min-w-0 flex-1 truncate text-sm">{{ entry.title }}</span>
      <span class="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide">
        <Clock :size="10" /> À venir
      </span>
    </div>

    <!-- Cours disponible -->
    <template v-else>
      <NuxtLink
        :to="`/cours/${entry.id}`"
        class="flex items-center gap-3 rounded-xl px-2.5 py-2 transition"
        :class="isCurrent ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg'"
        data-accent="indigo"
      >
        <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent-fg"><AppIcon :name="entry.icon" :size="16" /></span>
        <span class="min-w-0 flex-1 text-sm font-semibold leading-snug">{{ entry.title }}</span>
        <ProgressRing :value="percent" />
      </NuxtLink>

      <ol v-if="isCurrent" class="relative mt-1 mb-2 ml-[1.6rem] space-y-0.5 border-l border-border pl-2">
        <li v-for="(section, i) in course.sections" :key="section.id" :data-accent="section.accent">
          <NuxtLink
            :to="sectionLink(section.id)"
            class="group relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.83rem] transition"
            :class="currentSectionId === section.id ? 'bg-accent-soft font-semibold text-accent-fg' : 'text-muted hover:bg-surface-2 hover:text-fg'"
            :aria-current="currentSectionId === section.id ? 'step' : undefined"
          >
            <span
              v-if="currentSectionId === section.id"
              class="absolute -left-[0.6rem] top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span
              class="grid size-5 shrink-0 place-items-center rounded-md text-[0.65rem] font-bold"
              :class="sectionPercent(section.id) === 100 ? 'bg-accent text-white' : 'bg-surface-3 text-muted'"
            >
              <Check v-if="sectionPercent(section.id) === 100" :size="12" :stroke-width="3" />
              <template v-else>{{ i + 1 }}</template>
            </span>
            <span class="min-w-0 flex-1 truncate">{{ section.shortTitle ?? section.title }}</span>
            <ChevronRight v-if="currentSectionId === section.id" :size="14" class="shrink-0" />
          </NuxtLink>
        </li>
      </ol>
    </template>
  </li>
</template>
