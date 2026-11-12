<script setup lang="ts">
import { X } from '@lucide/vue'

defineEmits<{ close: [] }>()

const shortcuts = [
  { keys: ['→', 'Espace'], label: 'Diapositive suivante' },
  { keys: ['←', 'Maj + Espace'], label: 'Diapositive précédente' },
  { keys: ['Début', 'Fin'], label: 'Première / dernière diapositive' },
  { keys: ['F'], label: 'Plein écran' },
  { keys: ['S'], label: 'Masquer / afficher la barre latérale' },
  { keys: ['N'], label: 'Notes du formateur' },
  { keys: ['Échap'], label: 'Fermer / quitter un éditeur de code' },
  { keys: ['?'], label: 'Afficher cette aide' },
]
</script>

<template>
  <div class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="card animate-pop w-full max-w-md p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="kbd-title">
      <div class="mb-4 flex items-center">
        <h2 id="kbd-title" class="flex-1 text-lg font-bold">Raccourcis clavier</h2>
        <button class="icon-btn" aria-label="Fermer" @click="$emit('close')"><X :size="18" /></button>
      </div>
      <ul class="space-y-2.5">
        <li v-for="s in shortcuts" :key="s.label" class="flex items-center gap-3 text-sm">
          <span class="flex-1 text-muted">{{ s.label }}</span>
          <span class="flex gap-1">
            <kbd v-for="k in s.keys" :key="k" class="rounded-md border border-border-strong bg-surface-2 px-2 py-0.5 font-mono text-xs">{{ k }}</kbd>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
