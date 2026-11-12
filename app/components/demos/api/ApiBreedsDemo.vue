<script setup lang="ts">
/**
 * Choisir une race : on montre où elle s'écrit dans l'adresse de l'API
 * et dans le code, puis on fait une vraie requête pour cette race.
 */
import { Dog, ExternalLink, Send } from '@lucide/vue'
import { DOG_BREEDS, DOG_BREEDS_LIST_URL, dogBreedUrl } from '~/content/courses/site-web/fil-rouge'

const breeds = [...DOG_BREEDS, { id: 'chat', name: 'Chat ?' }]
const breed = ref<string>('husky')
const current = computed(() => breeds.find((b) => b.id === breed.value)!)

const code = computed(() => `// Changez « ${breed.value} » pour une autre race
const reponse = await fetch('${dogBreedUrl(breed.value)}');
const donnees = await reponse.json();
image.src = donnees.message;`)

const loading = ref(false)
const image = ref<string | null>(null)
const json = ref<string | null>(null)
const failed = ref(false)
let run = 0

async function send() {
  const id = ++run
  loading.value = true
  failed.value = false
  json.value = null
  try {
    const res = await fetch(dogBreedUrl(breed.value))
    const data = (await res.json()) as { message: string; status: string }
    if (id !== run) return
    json.value = JSON.stringify(data, null, 2)
    if (data.status === 'success') image.value = data.message
    else {
      failed.value = true
      image.value = null
    }
  } catch {
    if (id !== run) return
    failed.value = true
    image.value = null
    json.value = null
  } finally {
    if (id === run) loading.value = false
  }
}

function choose(id: string) {
  breed.value = id
  send()
}

const cardText = computed(() => {
  if (loading.value) return 'Chargement…'
  if (failed.value) return breed.value === 'chat' ? 'Aucun chat ici : cette race n’existe pas dans l’API !' : 'Oups, la requête a échoué… Réessayez !'
  return image.value ? `Voici un ${current.value.name.toLowerCase()} !` : 'Choisissez une race.'
})
</script>

<template>
  <div class="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
    <div class="flex min-h-0 flex-col gap-3">
      <!-- L'adresse, avec la race mise en évidence -->
      <div class="card p-4">
        <p class="slide-eyebrow mb-2">L’adresse à demander</p>
        <p class="font-mono text-[clamp(0.85rem,1.25cqi,1.3rem)] leading-relaxed break-all">
          <span class="text-muted">https://dog.ceo/api/breed/</span><span
            :key="breed"
            class="animate-pop inline-block rounded-md px-1.5 font-bold"
            :class="breed === 'chat' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-accent-soft text-accent-fg ring-2 ring-accent'"
          >{{ breed }}</span><span class="text-muted">/images/random</span>
        </p>
        <p class="slide-small mt-2 text-muted">
          La race s’écrit <strong class="text-fg">entre</strong> <code class="font-mono">breed/</code> et <code class="font-mono">/images</code> :
          en anglais, en minuscules. Une sous-race s’ajoute après une barre : <code class="font-mono">retriever/golden</code>.
        </p>
      </div>

      <!-- Exemples de races -->
      <div class="flex flex-wrap gap-2" role="group" aria-label="Exemples de races">
        <button
          v-for="b in breeds"
          :key="b.id"
          class="rounded-full border px-3 py-1.5 text-left text-sm transition"
          :class="breed === b.id ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-border-strong'"
          :aria-pressed="breed === b.id"
          @click="choose(b.id)"
        >
          <span class="font-semibold">{{ b.name }}</span>
          <span class="ml-1.5 font-mono text-xs text-muted">{{ b.id }}</span>
        </button>
      </div>

      <!-- Où l'écrire dans le code -->
      <CodeViewer class="min-h-[9rem]" :files="[{ name: 'script.js', lang: 'js', code }]" :active-lines="[2]" />
      <p class="slide-small flex items-center gap-2 text-muted">
        <Dog :size="16" class="shrink-0" />
        Toutes les races :
        <a :href="DOG_BREEDS_LIST_URL" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-mono text-accent-fg underline-offset-2 hover:underline">
          {{ DOG_BREEDS_LIST_URL }} <ExternalLink :size="13" />
        </a>
      </p>
    </div>

    <!-- Le résultat -->
    <div class="flex min-h-0 flex-col items-center gap-3">
      <div class="grid w-full flex-1 place-items-center rounded-2xl bg-surface-2 p-4">
        <DogCardView compact :image="image" :loading="loading" :text="cardText" button-label="Envoyer la requête" @discover="send" />
      </div>
      <button class="btn-primary" :disabled="loading" @click="send"><Send :size="16" /> Demander un {{ breed === 'chat' ? 'chat' : current.name.toLowerCase() }}</button>
      <pre
        v-if="json"
        class="code-surface w-full overflow-auto rounded-xl border px-3 py-2 font-mono text-xs leading-5 break-all whitespace-pre-wrap"
        :class="failed ? 'border-rose-400' : 'border-border'"
        v-html="highlight(json, 'json')"
      />
    </div>
  </div>
</template>
