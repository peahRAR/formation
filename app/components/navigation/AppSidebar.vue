<script setup lang="ts">
/** Barre latérale : parcours, cours, sections et progression. */
import { PanelLeftClose, ShieldCheck, X } from '@lucide/vue'
import { learningPaths } from '~/content/catalog'

const props = defineProps<{ mobile?: boolean }>()
const { setSidebarCollapsed, mobileMenuOpen } = useUi()

function close() {
  if (props.mobile) mobileMenuOpen.value = false
  else setSidebarCollapsed(true)
}
</script>

<template>
  <aside class="flex h-full w-72 flex-col border-r border-border bg-surface" aria-label="Navigation des cours">
    <div class="flex items-center gap-2 px-4 pt-4 pb-3">
      <AppLogo class="flex-1" />
      <button
        class="icon-btn"
        :title="mobile ? 'Fermer le menu' : 'Masquer la barre latérale (S)'"
        :aria-label="mobile ? 'Fermer le menu' : 'Masquer la barre latérale'"
        @click="close"
      >
        <X v-if="mobile" :size="18" />
        <PanelLeftClose v-else :size="18" />
      </button>
    </div>

    <nav class="min-h-0 flex-1 space-y-6 overflow-y-auto px-2 pt-3 pb-6">
      <section v-for="path in learningPaths" :key="path.id">
        <h2 class="mb-1.5 flex items-center gap-2 px-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-subtle">
          <AppIcon :name="path.icon" :size="13" />
          {{ path.title }}
        </h2>
        <ul class="space-y-0.5">
          <SidebarCourse v-for="entry in path.courses" :key="entry.id" :entry="entry" />
        </ul>
      </section>
    </nav>

    <div class="flex items-center gap-2 border-t border-border px-4 py-3">
      <p class="flex flex-1 items-center gap-1.5 text-[0.7rem] leading-tight text-subtle">
        <ShieldCheck :size="14" class="shrink-0" />
        Progression enregistrée sur cet appareil, sans compte.
      </p>
      <ThemeToggle />
    </div>
  </aside>
</template>
