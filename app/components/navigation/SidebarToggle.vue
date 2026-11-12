<script setup lang="ts">
/**
 * Ouvre ou masque la sidebar : repli complet sur grand écran,
 * menu coulissant sur mobile.
 */
import { Menu, PanelLeftOpen } from '@lucide/vue'

const props = defineProps<{ onlyWhenHidden?: boolean }>()
const { sidebarCollapsed, mobileMenuOpen, toggleSidebar } = useUi()

function onClick() {
  if (window.matchMedia('(min-width: 1024px)').matches) toggleSidebar()
  else mobileMenuOpen.value = true
}
</script>

<template>
  <button
    class="icon-btn"
    :class="props.onlyWhenHidden && !sidebarCollapsed ? 'lg:hidden' : ''"
    title="Afficher le menu (S)"
    aria-label="Afficher le menu"
    @click="onClick"
  >
    <Menu :size="18" class="lg:hidden" />
    <PanelLeftOpen :size="18" class="hidden lg:block" />
  </button>
</template>
