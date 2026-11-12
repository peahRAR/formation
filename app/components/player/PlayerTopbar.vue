<script setup lang="ts">
import { CircleHelp, LayoutList, Maximize, Minimize, NotebookPen, Timer, BookOpen } from '@lucide/vue'
import type { Course, PlayerMode, Section } from '~/types/course'

defineProps<{ course: Course; mode: PlayerMode; section: Section; isFullscreen: boolean }>()
defineEmits<{ 'switch-mode': [mode: PlayerMode]; 'toggle-fullscreen': []; help: [] }>()

const { notesOpen } = useUi()
</script>

<template>
  <header class="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-surface/80 px-3 backdrop-blur sm:px-4">
    <SidebarToggle only-when-hidden />

    <div class="flex min-w-0 flex-1 items-center gap-2 text-sm">
      <NuxtLink :to="`/cours/${course.id}`" class="hidden truncate text-muted hover:text-fg md:block">{{ course.title }}</NuxtLink>
      <span class="hidden text-subtle md:block" aria-hidden="true">/</span>
      <span class="flex min-w-0 items-center gap-2 font-semibold">
        <span class="grid size-6 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-fg"><AppIcon :name="section.icon" :size="14" /></span>
        <span class="truncate">{{ section.title }}</span>
      </span>
    </div>

    <!-- Choix du mode -->
    <div class="hidden items-center rounded-xl border border-border bg-surface-2 p-0.5 sm:flex" role="group" aria-label="Mode de consultation">
      <button
        class="inline-flex items-center gap-1.5 rounded-[0.6rem] px-2.5 py-1 text-xs font-semibold transition"
        :class="mode === 'complet' ? 'bg-surface text-fg shadow-sm' : 'text-muted hover:text-fg'"
        :aria-pressed="mode === 'complet'"
        @click="$emit('switch-mode', 'complet')"
      >
        <BookOpen :size="14" /> Complet
      </button>
      <button
        class="inline-flex items-center gap-1.5 rounded-[0.6rem] px-2.5 py-1 text-xs font-semibold transition"
        :class="mode === 'express' ? 'bg-surface text-fg shadow-sm' : 'text-muted hover:text-fg'"
        :aria-pressed="mode === 'express'"
        @click="$emit('switch-mode', 'express')"
      >
        <Timer :size="14" /> Express {{ course.expressDuration ?? 15 }} min
      </button>
    </div>

    <div class="flex items-center">
      <NuxtLink :to="`/cours/${course.id}`" class="icon-btn" title="Sommaire du cours" aria-label="Sommaire du cours">
        <LayoutList :size="18" />
      </NuxtLink>
      <button
        class="icon-btn"
        :class="notesOpen ? 'bg-accent-soft text-accent-fg' : ''"
        title="Notes du formateur (N)"
        aria-label="Notes du formateur"
        :aria-pressed="notesOpen"
        @click="notesOpen = !notesOpen"
      >
        <NotebookPen :size="18" />
      </button>
      <ThemeToggle class="hidden sm:inline-flex" />
      <button class="icon-btn hidden sm:inline-flex" title="Raccourcis clavier (?)" aria-label="Raccourcis clavier" @click="$emit('help')">
        <CircleHelp :size="18" />
      </button>
      <button
        class="icon-btn"
        :title="isFullscreen ? 'Quitter le plein écran (F)' : 'Plein écran (F)'"
        :aria-label="isFullscreen ? 'Quitter le plein écran' : 'Plein écran'"
        @click="$emit('toggle-fullscreen')"
      >
        <Minimize v-if="isFullscreen" :size="18" />
        <Maximize v-else :size="18" />
      </button>
    </div>
  </header>
</template>
