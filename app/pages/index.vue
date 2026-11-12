<script setup lang="ts">
import { ArrowRight, Clock, Dumbbell, MonitorPlay, NotebookPen, Presentation, RotateCcw } from '@lucide/vue'
import { isFullCourse, learningPaths, publishedCourses } from '~/content/catalog'
import { NuxtLink } from '#components'

const { platform } = useAppConfig()
useHead({ title: `${platform.name} · Supports de cours` })

const featured = publishedCourses[0]
const progress = useProgress()
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const features = [
  { icon: MonitorPlay, title: 'Pendant la séance', text: 'Projeté en plein écran, avec les démonstrations en direct et les notes du formateur.' },
  { icon: RotateCcw, title: 'Après la séance', text: 'Les étudiants retrouvent les diapositives pour revoir ce qui a été montré.' },
  { icon: Dumbbell, title: 'Pour s’entraîner', text: 'Du vrai code à modifier et des exercices « À vous », à refaire autant de fois que nécessaire.' },
]
</script>

<template>
  <div>
    <PageTopbar />
    <div class="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <!-- Présentation -->
      <section class="relative" data-accent="indigo">
        <div aria-hidden="true" class="pointer-events-none absolute -top-24 left-1/3 -z-10 size-96 rounded-full bg-accent-soft blur-3xl" />
        <p class="chip mb-5"><Presentation :size="13" class="text-accent-fg" /> Support de cours</p>
        <h1 class="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl">
          Les supports de la formation<br><span class="text-accent">développement web.</span>
        </h1>
        <p class="mt-5 max-w-2xl text-lg text-muted text-pretty">
          Les diapositives projetées en cours, avec leurs démonstrations et leur code. Après la séance, vous y retrouvez tout ce qui a été vu en classe pour le revoir et vous entraîner.
        </p>
        <div v-if="featured" class="mt-8 flex flex-wrap gap-3">
          <NuxtLink :to="playerLink(featured.id)" class="btn-primary px-5 py-3 text-base">
            Ouvrir le cours <ArrowRight :size="18" />
          </NuxtLink>
          <NuxtLink :to="`/cours/${featured.id}/notes`" class="btn-secondary px-5 py-3 text-base">
            <NotebookPen :size="18" /> Notes du formateur
          </NuxtLink>
        </div>

        <ul class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <li v-for="f in features" :key="f.title" class="flex gap-3">
            <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-fg"><component :is="f.icon" :size="20" /></span>
            <span>
              <span class="block font-semibold">{{ f.title }}</span>
              <span class="block text-sm text-muted">{{ f.text }}</span>
            </span>
          </li>
        </ul>
      </section>

      <!-- Parcours -->
      <section v-for="path in learningPaths" :key="path.id" class="mt-16">
        <div class="mb-5 flex items-end gap-3">
          <span class="grid size-10 place-items-center rounded-xl bg-surface-2 text-muted"><AppIcon :name="path.icon" :size="20" /></span>
          <div>
            <h2 class="text-xl font-bold tracking-tight">{{ path.title }}</h2>
            <p class="text-sm text-muted">{{ path.description }}</p>
          </div>
        </div>
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="entry in path.courses" :key="entry.id">
            <component
              :is="isFullCourse(entry) ? NuxtLink : 'div'"
              :to="isFullCourse(entry) ? `/cours/${entry.id}` : undefined"
              class="card group flex h-full flex-col p-5 transition"
              :class="isFullCourse(entry) ? 'hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg' : 'opacity-70'"
              data-accent="indigo"
            >
              <div class="mb-4 flex items-center gap-3">
                <span class="grid size-11 place-items-center rounded-xl" :class="isFullCourse(entry) ? 'bg-accent text-white' : 'bg-surface-2 text-subtle'">
                  <AppIcon :name="entry.icon" :size="22" />
                </span>
                <span v-if="!isFullCourse(entry)" class="chip ml-auto"><Clock :size="12" /> À venir</span>
                <span v-else-if="mounted && progress.percent(entry) > 0" class="ml-auto flex items-center gap-2 text-xs font-semibold text-muted">
                  <ProgressRing :value="progress.percent(entry)" /> {{ progress.percent(entry) }} %
                </span>
              </div>
              <h3 class="text-lg font-bold leading-snug tracking-tight">{{ entry.title }}</h3>
              <p class="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{{ entry.description }}</p>
              <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-subtle">
                <span class="chip">{{ entry.level }}</span>
                <span class="chip"><Clock :size="12" /> {{ formatDuration(entry.duration) }}</span>
                <ArrowRight v-if="isFullCourse(entry)" :size="16" class="ml-auto text-accent-fg transition group-hover:translate-x-1" />
              </div>
            </component>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
