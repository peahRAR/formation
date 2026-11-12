<script setup lang="ts">
/**
 * La fiche « Le chien du jour », rendue directement par Vue (hors iframe).
 * Ses styles reproduisent ceux de CSS_CARD (fil-rouge.ts). Utilisée par les
 * démonstrations qui ont besoin d'animer finement la fiche.
 */
type Part = 'fiche' | 'h1' | 'img' | 'p' | 'button'

const props = withDefaults(
  defineProps<{
    image?: string | null
    text?: string
    loading?: boolean
    buttonLabel?: string
    /** Parties à entourer (mise en évidence pédagogique). */
    highlight?: Part[]
    /** Change de valeur pour déclencher un flash sur le paragraphe. */
    flashKey?: number
    /** Masque l'image (première version de la fiche). */
    noImage?: boolean
    disabled?: boolean
    /** Version plus petite, pour les démonstrations chargées. */
    compact?: boolean
  }>(),
  { text: 'Chaque jour, un nouveau compagnon à découvrir.', buttonLabel: 'Découvrir un chien', highlight: () => [] },
)

defineEmits<{ discover: [] }>()

const hl = (part: Part) => props.highlight.includes(part)
const imgLoaded = ref(false)
watch(
  () => props.image,
  () => (imgLoaded.value = false),
)
</script>

<template>
  <div class="dog-card" :class="{ 'is-hl': hl('fiche'), compact }">
    <h1 :class="{ 'is-hl': hl('h1') }">Le chien du jour</h1>
    <div v-if="!noImage" class="img-wrap" :class="{ 'is-hl': hl('img') }">
      <img
        :key="image ?? 'placeholder'"
        :src="image || '/images/chien.svg'"
        alt="Un chien"
        :class="{ loaded: imgLoaded || !image }"
        @load="imgLoaded = true"
      >
      <div v-if="loading" class="img-loading" aria-hidden="true"><span /></div>
    </div>
    <p :key="flashKey" :class="{ 'is-hl': hl('p'), flash: flashKey }" aria-live="polite">{{ text }}</p>
    <button type="button" :class="{ 'is-hl': hl('button') }" :disabled="disabled || loading" @click="$emit('discover')">
      {{ loading ? 'Chargement…' : buttonLabel }}
    </button>
  </div>
</template>

<style scoped>
.dog-card {
  font-family: system-ui, sans-serif;
  background: white;
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.12);
  width: 100%;
  max-width: 300px;
  text-align: center;
  color: #1c1917;
  transition: outline-color 0.2s;
}
h1 {
  color: #9a3412;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px;
}
.img-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 190px;
  background: #fde7c8;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.04);
  transition: opacity 0.5s ease, transform 0.6s ease;
}
img.loaded {
  opacity: 1;
  transform: none;
}
.img-loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(255 255 255 / 0.55);
  backdrop-filter: blur(2px);
}
.img-loading span {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 4px solid #fed7aa;
  border-top-color: #ea580c;
  animation: spin 0.8s linear infinite;
}
p {
  color: #57534e;
  line-height: 1.5;
  margin: 16px 0 20px;
  border-radius: 8px;
}
p.flash {
  animation: text-flash 1.1s ease-out;
}
button {
  background: #ea580c;
  color: white;
  font: inherit;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 12px 22px;
  transition: transform 0.15s, filter 0.15s;
}
button:hover:not(:disabled) {
  filter: brightness(1.08);
}
button:active:not(:disabled) {
  transform: scale(0.96);
}
button:disabled {
  opacity: 0.7;
}
.is-hl {
  outline: 3px solid var(--accent, #6366f1);
  outline-offset: 4px;
  border-radius: 10px;
}
.dog-card.is-hl,
.img-wrap.is-hl {
  border-radius: 24px;
}
.compact {
  padding: 18px;
  max-width: 260px;
}
.compact h1 {
  font-size: 21px;
  margin-bottom: 12px;
}
.compact .img-wrap {
  height: 140px;
}
.compact p {
  font-size: 14px;
  margin: 12px 0 14px;
}
.compact button {
  padding: 10px 18px;
  font-size: 15px;
}
button.is-hl {
  border-radius: 999px;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes text-flash {
  0% {
    background: #fde68a;
    transform: scale(1.04);
  }
  100% {
    background: transparent;
    transform: none;
  }
}
</style>
