<script setup lang="ts">
const { sidebarCollapsed, mobileMenuOpen } = useUi()
const route = useRoute()

// Le menu mobile se referme après chaque navigation.
watch(
  () => route.fullPath,
  () => (mobileMenuOpen.value = false),
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && mobileMenuOpen.value) mobileMenuOpen.value = false
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="flex h-dvh overflow-hidden">
    <!-- Sidebar grand écran : entièrement masquable -->
    <div
      class="hidden shrink-0 overflow-hidden transition-[width] duration-300 ease-out lg:block"
      :class="sidebarCollapsed ? 'w-0' : 'w-72'"
      :inert="sidebarCollapsed || undefined"
    >
      <AppSidebar />
    </div>

    <!-- Menu mobile -->
    <Transition name="fade">
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" @click="mobileMenuOpen = false" />
    </Transition>
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-200 ease-in"
      enter-from-class="-translate-x-full"
      leave-to-class="-translate-x-full"
    >
      <div v-if="mobileMenuOpen" class="fixed inset-y-0 left-0 z-50 shadow-2xl lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
        <AppSidebar mobile />
      </div>
    </Transition>

    <main id="contenu" class="min-w-0 flex-1 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
