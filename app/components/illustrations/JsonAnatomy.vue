<script setup lang="ts">
/** Une vraie réponse de l'API Dog CEO, annotée. */
const json = `{
  "message": "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
  "status": "success"
}`

const notes = [
  { id: 'obj', lines: [1, 4], title: 'Des accolades { }', text: 'Elles regroupent les données : c’est un « objet ».' },
  { id: 'key', lines: [2], title: '"message" : une étiquette', text: 'Chaque donnée a un nom, suivi de deux-points.' },
  { id: 'value', lines: [2], title: 'Sa valeur : l’adresse de la photo', text: 'C’est elle que JavaScript placera dans l’image.' },
  { id: 'status', lines: [3], title: '"status" : "success"', text: 'L’API confirme que tout s’est bien passé.' },
]
const active = ref(notes[1]!)
</script>

<template>
  <div class="grid grid-cols-1 h-full items-center gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
    <div class="flex flex-col gap-3">
      <CodeViewer :files="[{ name: 'réponse.json', lang: 'json', code: json }]" :active-lines="active.lines" size="lg" />
      <div class="code-surface rounded-2xl border border-border px-4 py-3 font-mono text-[clamp(0.8rem,1.1cqi,1.1rem)]">
        <span class="text-subtle">// Dans notre script :</span><br>
        <span class="tok-plain">image</span><span class="tok-punctuation">.</span><span class="tok-property">src</span>
        <span class="tok-punctuation"> = </span><span class="tok-plain">donnees</span><span class="tok-punctuation">.</span><span
          class="tok-property rounded px-0.5 transition"
          :class="active.id === 'key' || active.id === 'value' ? 'bg-[var(--code-line)]' : ''"
        >message</span><span class="tok-punctuation">;</span>
      </div>
    </div>
    <ul class="grid gap-2">
      <li v-for="n in notes" :key="n.id">
        <button
          class="w-full rounded-xl border px-4 py-3 text-left transition"
          :class="active.id === n.id ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-border-strong'"
          :aria-pressed="active.id === n.id"
          @click="active = n"
        >
          <span class="slide-small block font-semibold">{{ n.title }}</span>
          <span class="slide-small block text-muted">{{ n.text }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
