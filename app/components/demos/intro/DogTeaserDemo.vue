<script setup lang="ts">
/** Aperçu de la fiche terminée et des étapes pour y arriver. */
const dog = useDogApi({ slowMotion: ref(false) })

const steps = [
  { accent: 'orange', icon: 'FileCode2', title: 'HTML', text: 'Le contenu : titre, image, texte, bouton.' },
  { accent: 'blue', icon: 'Paintbrush', title: 'CSS', text: 'Les couleurs, les arrondis, la mise en page.' },
  { accent: 'amber', icon: 'Braces', title: 'DOM et JavaScript', text: 'Le bouton réagit au clic.' },
  { accent: 'emerald', icon: 'ArrowLeftRight', title: 'API', text: 'Une vraie photo arrive d’Internet.' },
  { accent: 'violet', icon: 'Component', title: 'Framework', text: 'Le tout organisé en composant.' },
]
</script>

<template>
  <div class="grid grid-cols-1 h-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
    <div class="grid place-items-center rounded-3xl bg-[#fdf2e4] p-[clamp(1.25rem,3cqi,3rem)]">
      <DogCardView
        :image="dog.image.value"
        :loading="dog.busy.value"
        :text="dog.phase.value === 'update' ? 'Voici votre chien du jour !' : dog.error.value ?? undefined"
        @discover="dog.fetchDog"
      />
    </div>
    <ol class="space-y-3">
      <li
        v-for="(s, i) in steps"
        :key="s.title"
        :data-accent="s.accent"
        class="animate-pop flex items-center gap-4 rounded-2xl border border-border bg-surface p-[clamp(0.7rem,1.2cqi,1.1rem)]"
        :style="{ animationDelay: `${i * 100}ms` }"
      >
        <span class="grid size-[clamp(2.4rem,3.2cqi,3.2rem)] shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-fg">
          <AppIcon :name="s.icon" :size="'50%'" />
        </span>
        <span class="min-w-0">
          <span class="slide-body block font-semibold">{{ i + 1 }}. {{ s.title }}</span>
          <span class="slide-small block text-muted">{{ s.text }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>
