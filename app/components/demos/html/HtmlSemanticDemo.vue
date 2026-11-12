<script setup lang="ts">
/**
 * HTML sémantique : la même page écrite « tout en div » ou avec des balises
 * qui ont du sens. Le rendu est identique, mais ce que comprend un lecteur
 * d'écran (ou un moteur de recherche) change complètement.
 */
import { Ear, Eye, TriangleAlert } from '@lucide/vue'

const DIVS = `<div class="haut">
  <div class="titre">Le chien du jour</div>
</div>
<div class="contenu">
  <div class="fiche">
    <div class="sous-titre">Rex, golden retriever</div>
    <div class="texte">Un nouveau compagnon chaque jour.</div>
    <div class="bouton">Découvrir un chien</div>
  </div>
</div>
<div class="bas">© 2026 Le chien du jour</div>`

const SEMANTIC = `<header>
  <h1>Le chien du jour</h1>
</header>
<main>
  <article class="fiche">
    <h2>Rex, golden retriever</h2>
    <p>Un nouveau compagnon chaque jour.</p>
    <button>Découvrir un chien</button>
  </article>
</main>
<footer>© 2026 Le chien du jour</footer>`

const CSS = `body { font-family: system-ui, sans-serif; background: #fdf2e4; margin: 0; padding: 18px; color: #1c1917; }
header, .haut { text-align: center; }
h1, .titre { color: #9a3412; font-size: 24px; font-weight: 700; margin: 0 0 14px; }
.fiche { display: block; background: white; border-radius: 18px; padding: 18px; max-width: 280px; margin: 0 auto; text-align: center; box-shadow: 0 8px 24px rgb(0 0 0 / .1); }
h2, .sous-titre { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
p, .texte { color: #57534e; margin: 0 0 14px; }
button, .bouton { display: inline-block; background: #ea580c; color: white; border: none; border-radius: 999px; padding: 10px 18px; font: inherit; font-weight: 600; cursor: pointer; }
footer, .bas { text-align: center; font-size: 12px; color: #78716c; margin-top: 16px; }`

/** Ce qu'annonce un lecteur d'écran, ligne par ligne. */
interface ReaderItem {
  line: number
  say: string
  note: string
  warn?: boolean
}
const READER: Record<'divs' | 'semantic', ReaderItem[]> = {
  divs: [
    { line: 2, say: '« Le chien du jour »', note: 'du texte, sans plus' },
    { line: 6, say: '« Rex, golden retriever »', note: 'du texte' },
    { line: 7, say: '« Un nouveau compagnon… »', note: 'du texte' },
    { line: 8, say: '« Découvrir un chien »', note: 'du texte : impossible de l’atteindre au clavier', warn: true },
    { line: 11, say: '« © 2026… »', note: 'du texte' },
  ],
  semantic: [
    { line: 1, say: 'Bannière', note: 'l’en-tête du site' },
    { line: 2, say: 'Titre de niveau 1', note: '« Le chien du jour »' },
    { line: 4, say: 'Contenu principal', note: 'on peut y sauter directement' },
    { line: 5, say: 'Article', note: 'un contenu autonome' },
    { line: 6, say: 'Titre de niveau 2', note: '« Rex, golden retriever »' },
    { line: 7, say: 'Paragraphe', note: '« Un nouveau compagnon… »' },
    { line: 8, say: 'Bouton', note: '« Découvrir un chien », cliquable et accessible au clavier' },
    { line: 11, say: 'Pied de page', note: 'les informations du site' },
  ],
}

const mode = ref<'divs' | 'semantic'>('divs')
const code = computed(() => (mode.value === 'divs' ? DIVS : SEMANTIC))
const reader = computed(() => READER[mode.value])
const hovered = ref<number | null>(null)
const lines = computed(() => (hovered.value ? [hovered.value] : []))

const tags = ['header', 'main', 'article', 'h1', 'h2', 'p', 'button', 'footer']
</script>

<template>
  <div class="flex h-full min-h-0 flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <div class="inline-flex rounded-xl border border-border bg-surface-2 p-1" role="group" aria-label="Version du code">
        <button
          class="rounded-lg px-3 py-1.5 text-sm font-semibold transition"
          :class="mode === 'divs' ? 'bg-surface text-fg shadow-sm' : 'text-muted hover:text-fg'"
          :aria-pressed="mode === 'divs'"
          @click="mode = 'divs'"
        >
          Tout en &lt;div&gt;
        </button>
        <button
          class="rounded-lg px-3 py-1.5 text-sm font-semibold transition"
          :class="mode === 'semantic' ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-fg'"
          :aria-pressed="mode === 'semantic'"
          @click="mode = 'semantic'"
        >
          HTML sémantique
        </button>
      </div>
      <p class="slide-small flex flex-wrap items-center gap-1.5 text-muted">
        Balises sémantiques :
        <code v-for="t in tags" :key="t" class="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-[var(--tok-tag)]">&lt;{{ t }}&gt;</code>
      </p>
    </div>

    <div class="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
      <CodeViewer
        class="min-h-[14rem]"
        :files="[{ name: 'index.html', lang: 'html', code }]"
        :active-lines="lines"
        interactive
        @hover-line="hovered = $event"
      />

      <div class="flex min-h-[16rem] flex-col gap-2">
        <p class="slide-small flex items-center gap-1.5 font-semibold"><Eye :size="16" /> Ce que l’on voit</p>
        <LivePreview class="flex-1" :html="code" :css="CSS" :show-console="false" />
        <p class="text-xs text-muted">Le rendu est le même dans les deux versions.</p>
      </div>

      <div class="card flex min-h-0 flex-col p-3">
        <p class="slide-small mb-2 flex items-center gap-1.5 font-semibold"><Ear :size="16" /> Ce qu’entend un lecteur d’écran</p>
        <TransitionGroup tag="ul" name="fade" class="min-h-0 flex-1 space-y-1 overflow-auto">
          <li
            v-for="r in reader"
            :key="`${mode}-${r.line}`"
            class="flex cursor-default items-start gap-2 rounded-lg px-2 py-1 text-[clamp(0.78rem,0.95cqi,0.95rem)] transition"
            :class="hovered === r.line ? 'bg-accent-soft' : ''"
            @mouseenter="hovered = r.line"
            @mouseleave="hovered = null"
          >
            <TriangleAlert v-if="r.warn" :size="15" class="mt-0.5 shrink-0 text-rose-500" />
            <span>
              <strong :class="mode === 'semantic' ? 'text-accent-fg' : ''">{{ r.say }}</strong>
              <span class="text-muted"> · {{ r.note }}</span>
            </span>
          </li>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>
