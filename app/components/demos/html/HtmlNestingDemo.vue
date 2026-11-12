<script setup lang="ts">
/**
 * L'imbrication des balises expliquée avec des poupées gigognes :
 * chaque balise est une poupée qui en contient une plus petite.
 * Ouvrir une poupée révèle la suivante et surligne ses lignes dans le code.
 */
import { Check, RotateCcw, Sparkles, X } from '@lucide/vue'

const CODE = `<body>
  <div class="fiche">
    <p>
      Voici <strong>Rex</strong> !
    </p>
  </div>
</body>`

const BAD = `<p>Voici <strong>Rex</p></strong>`
const GOOD = `<p>Voici <strong>Rex</strong></p>`

const dolls = [
  { tag: 'body', label: 'Le corps de la page', color: '#e11d48', light: '#ffe4e6', scale: 1 },
  { tag: 'div', label: 'La boîte « fiche »', color: '#ea580c', light: '#ffedd5', scale: 0.82 },
  { tag: 'p', label: 'Le paragraphe', color: '#ca8a04', light: '#fef9c3', scale: 0.66 },
  { tag: 'strong', label: 'Le mot important', color: '#059669', light: '#d1fae5', scale: 0.52 },
]

const elements = parseElements(CODE)
const codeLines = highlightLines(CODE, 'html')

/** Nombre de poupées ouvertes : les poupées 0..opened sont visibles. */
const opened = ref(0)
const selected = ref(0)

function openNext() {
  if (opened.value < dolls.length - 1) {
    opened.value++
    selected.value = opened.value
  }
}
function closeAll() {
  opened.value = 0
  selected.value = 0
}
function clickDoll(i: number) {
  if (i === opened.value && i < dolls.length - 1) openNext()
  else selected.value = i
}

/** Niveaux (poupées) qui contiennent une ligne donnée. */
function levelsAt(line: number) {
  return elements.map((e, i) => (e.start <= line && line <= e.end ? i : -1)).filter((i) => i !== -1 && i <= opened.value)
}
function hoverLine(line: number) {
  const lv = levelsAt(line)
  if (lv.length) selected.value = lv[lv.length - 1]!
}

const sel = computed(() => dolls[selected.value]!)
const parent = computed(() => (selected.value > 0 ? dolls[selected.value - 1] : null))
const child = computed(() => dolls[selected.value + 1] ?? null)

const showMistake = ref(false)
const uid = useId()
</script>

<template>
  <div class="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
    <!-- Les poupées -->
    <div class="card flex min-h-[18rem] flex-col p-4">
      <div class="flex min-h-0 flex-1 items-end justify-center gap-[clamp(0.5rem,1.5cqi,1.5rem)] pb-2">
        <TransitionGroup name="doll">
          <button
            v-for="(d, i) in dolls.slice(0, opened + 1)"
            :key="d.tag"
            class="doll group relative shrink-0 outline-none"
            :style="{ width: `calc(clamp(5.5rem, 13cqi, 13rem) * ${d.scale})`, '--c': d.color, '--l': d.light }"
            :aria-label="`Poupée ${d.tag}${i === opened && i < dolls.length - 1 ? ', cliquer pour l’ouvrir' : ''}`"
            :aria-pressed="selected === i"
            @click="clickDoll(i)"
          >
            <svg viewBox="0 -40 100 200" class="w-full overflow-visible">
              <defs>
                <clipPath :id="`${uid}-top-${i}`"><rect x="-10" y="-10" width="120" height="98" /></clipPath>
                <clipPath :id="`${uid}-bot-${i}`"><rect x="-10" y="88" width="120" height="80" /></clipPath>
              </defs>
              <!-- Bas -->
              <g :clip-path="`url(#${uid}-bot-${i})`">
                <path :d="SHAPE" :fill="d.color" />
                <ellipse cx="50" cy="122" rx="30" ry="24" :fill="d.light" />
                <text x="50" y="128" text-anchor="middle" class="doll-tag" :fill="d.color" :font-size="d.tag.length > 4 ? 12 : 16">&lt;{{ d.tag }}&gt;</text>
              </g>
              <!-- Intérieur visible quand la poupée est ouverte -->
              <ellipse v-if="i < opened" cx="50" cy="88" rx="36" ry="7" fill="#00000033" />
              <!-- Haut (se soulève à l'ouverture) -->
              <g class="lid" :class="{ open: i < opened }" :clip-path="`url(#${uid}-top-${i})`">
                <path :d="SHAPE" :fill="d.color" />
                <circle cx="50" cy="44" r="21" fill="#fde2c8" />
                <path d="M29 40 q4-18 21-18 q17 0 21 18 q-10-8-21-8 q-11 0-21 8z" fill="#7c2d12" />
                <circle cx="42" cy="46" r="2.6" fill="#1c1917" />
                <circle cx="58" cy="46" r="2.6" fill="#1c1917" />
                <circle cx="37" cy="53" r="4" fill="#fda4af" opacity="0.8" />
                <circle cx="63" cy="53" r="4" fill="#fda4af" opacity="0.8" />
                <path d="M45 56 q5 4 10 0" fill="none" stroke="#9f1239" stroke-width="2" stroke-linecap="round" />
                <path d="M30 74 q20 10 40 0" fill="none" :stroke="d.light" stroke-width="4" stroke-linecap="round" />
              </g>
              <path
                v-if="selected === i"
                :d="SHAPE"
                fill="none"
                stroke="var(--accent)"
                stroke-width="4"
                stroke-dasharray="8 6"
                class="sel-outline"
                :class="{ open: i < opened }"
              />
            </svg>
            <span
              v-if="i === opened && i < dolls.length - 1"
              class="absolute -top-2 left-1/2 -translate-x-1/2 animate-bounce rounded-full bg-accent px-2 py-0.5 text-[0.7rem] font-bold whitespace-nowrap text-white shadow"
            >Ouvrir</span>
          </button>
        </TransitionGroup>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-2 border-t border-border pt-3">
        <button class="btn-primary" :disabled="opened >= dolls.length - 1" @click="openNext">
          <Sparkles :size="16" /> Ouvrir la poupée suivante
        </button>
        <button class="btn-secondary" :disabled="opened === 0" @click="closeAll"><RotateCcw :size="16" /> Tout refermer</button>
      </div>
    </div>

    <!-- Le code correspondant -->
    <div class="flex min-h-0 flex-col gap-3">
      <div class="code-surface min-h-0 overflow-auto rounded-2xl border border-border py-3">
        <pre class="font-mono text-[clamp(0.82rem,1.1cqi,1.1rem)] leading-[1.9]"><code class="block min-w-max"><span
          v-for="(line, li) in codeLines"
          :key="li"
          class="flex items-stretch pr-5 transition-opacity duration-300"
          :class="levelsAt(li + 1).length ? '' : 'opacity-25'"
          @mouseenter="hoverLine(li + 1)"
        ><span class="flex w-14 shrink-0 gap-[3px] pl-3" aria-hidden="true"><span
            v-for="lv in levelsAt(li + 1)"
            :key="lv"
            class="w-[5px] rounded-full transition-opacity"
            :style="{ background: dolls[lv]!.color, opacity: lv === selected ? 1 : 0.45 }"
          /></span><span
            class="rounded-md px-1 whitespace-pre transition-colors"
            :style="elements[selected]!.start === li + 1 || elements[selected]!.end === li + 1 ? { background: `${sel.color}22`, boxShadow: `inset 0 0 0 2px ${sel.color}` } : {}"
            v-html="line || ' '"
          /></span></code></pre>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="selected" class="card p-4">
          <p class="slide-body">
            <code class="font-mono font-bold" :style="{ color: sel.color }">&lt;{{ sel.tag }}&gt;</code>
            <span class="text-muted"> · {{ sel.label }}</span>
          </p>
          <p class="slide-small mt-1.5 text-muted">
            <template v-if="parent">Elle est rangée dans <code class="font-mono font-semibold" :style="{ color: parent.color }">&lt;{{ parent.tag }}&gt;</code>, son <strong class="text-fg">parent</strong>. </template>
            <template v-if="child">Elle contient <code class="font-mono font-semibold" :style="{ color: child.color }">&lt;{{ child.tag }}&gt;</code>, son <strong class="text-fg">enfant</strong>.</template>
            <template v-else>C’est la plus petite : elle ne contient que du texte.</template>
          </p>
        </div>
      </Transition>

      <div class="card p-4">
        <button class="slide-small flex w-full items-center justify-between gap-2 font-semibold" :aria-expanded="showMistake" @click="showMistake = !showMistake">
          L’erreur classique : refermer dans le désordre
          <span class="chip">{{ showMistake ? 'Masquer' : 'Voir' }}</span>
        </button>
        <div v-if="showMistake" class="mt-3 space-y-2">
          <p class="flex items-center gap-2 font-mono text-[clamp(0.78rem,1cqi,1rem)]">
            <X :size="18" class="shrink-0 text-rose-500" /><span class="break-all" v-html="highlight(BAD, 'html')" />
          </p>
          <p class="flex items-center gap-2 font-mono text-[clamp(0.78rem,1cqi,1rem)]">
            <Check :size="18" class="shrink-0 text-emerald-500" /><span class="break-all" v-html="highlight(GOOD, 'html')" />
          </p>
          <p class="slide-small text-muted">
            Comme avec les poupées : on referme d’abord la plus petite, celle que l’on a ouverte en dernier.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/** Silhouette d'une poupée gigogne (viewBox 100 × 160). */
const SHAPE =
  'M50 6 C78 6 86 28 82 56 C96 80 98 118 90 140 C85 154 70 158 50 158 C30 158 15 154 10 140 C2 118 4 80 18 56 C14 28 22 6 50 6 Z'
</script>

<style scoped>
.doll-tag {
  font-family: var(--font-mono, monospace);
  font-weight: 800;
}
.lid,
.sel-outline {
  transition: transform 0.6s cubic-bezier(0.3, 1.3, 0.5, 1);
  transform-box: view-box;
  transform-origin: 20px 88px;
}
.lid.open {
  transform: translateY(-34px) rotate(-10deg);
}
.sel-outline.open {
  opacity: 0;
}
.doll:hover svg,
.doll:focus-visible svg {
  filter: drop-shadow(0 6px 10px rgb(0 0 0 / 0.18));
}
.doll-enter-active {
  transition: transform 0.6s cubic-bezier(0.3, 1.4, 0.5, 1), opacity 0.4s;
}
.doll-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.doll-enter-from,
.doll-leave-to {
  opacity: 0;
  transform: translateX(-40%) scale(0.4);
}
</style>
