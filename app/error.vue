<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error.statusCode === 404)
</script>

<template>
  <div class="grid min-h-dvh place-items-center bg-bg px-6 text-center text-fg" data-accent="indigo">
    <div>
      <p class="text-7xl font-extrabold text-accent">{{ error.statusCode }}</p>
      <h1 class="mt-4 text-2xl font-bold">{{ is404 ? 'Cette page n’existe pas' : 'Une erreur est survenue' }}</h1>
      <p class="mt-2 text-muted">{{ is404 ? 'Le lien est peut-être incomplet, ou le cours a changé d’adresse.' : error.message }}</p>
      <button class="btn-primary mt-6" @click="clearError({ redirect: '/' })">Retour à l’accueil</button>
    </div>
  </div>
</template>
