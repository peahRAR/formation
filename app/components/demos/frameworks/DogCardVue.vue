<script setup lang="ts">
/**
 * La fiche « Le chien du jour » en vrai composant Vue : c'est la version
 * présentée dans le cours (VUE_CARD), avec en plus la gestion des erreurs.
 */
import { DOG_API_URL, DOG_TEXT } from '~/content/courses/site-web/fil-rouge'

const image = ref<string | null>(null)
const texte = ref(DOG_TEXT)
const chargement = ref(false)

async function decouvrir() {
  chargement.value = true
  try {
    const reponse = await fetch(DOG_API_URL)
    const donnees = await reponse.json()
    image.value = donnees.message
    texte.value = 'Voici votre chien du jour !'
  } catch {
    texte.value = 'Oups, pas de réseau… Réessayez !'
  } finally {
    chargement.value = false
  }
}
</script>

<template>
  <DogCardView :image="image" :text="texte" :loading="chargement" @discover="decouvrir" />
</template>
