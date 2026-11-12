<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'

const { isDark, toggle, sync } = useTheme()
onMounted(sync)
</script>

<template>
  <button
    class="icon-btn"
    :title="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    @click="toggle"
  >
    <Sun v-if="isDark" :size="18" />
    <Moon v-else :size="18" />
  </button>
</template>
