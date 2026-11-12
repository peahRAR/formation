<script setup lang="ts">
/**
 * Arbre DOM simplifié : document → html → body → éléments du fragment.
 * Les nœuds texte apparaissent comme de petites feuilles.
 */
import type { ElementInfo } from '~/utils/previewDocument'

const props = withDefaults(
  defineProps<{
    elements: ElementInfo[]
    /** Nombre d'éléments déjà construits (animation de construction). */
    visible?: number
    selected?: number | null
    interactive?: boolean
    /** Affiche les nœuds texte. */
    showText?: boolean
  }>(),
  { visible: Infinity, selected: null, interactive: false, showText: true },
)
defineEmits<{ select: [index: number] }>()

const label = (el: ElementInfo) => (el.attrs.class ? `${el.tag}.${el.attrs.class}` : el.tag)
const shown = computed(() => props.elements.map((el, i) => ({ el, i })).filter(({ i }) => i < props.visible))
</script>

<template>
  <div class="font-mono text-[clamp(0.8rem,1.05cqi,1.05rem)]">
    <div class="flex items-center gap-2 text-subtle">
      <span class="rounded-md border border-dashed border-border-strong px-2 py-0.5">document</span>
    </div>
    <div class="ml-3 border-l-2 border-border pl-4 pt-1.5">
      <span class="rounded-md bg-surface-2 px-2 py-0.5 text-muted">html</span>
      <div class="ml-3 border-l-2 border-border pl-4 pt-1.5">
        <span class="rounded-md bg-surface-2 px-2 py-0.5 text-muted">body</span>
        <ul class="ml-3 border-l-2 border-border pt-1">
          <li v-for="{ el, i } in shown" :key="i" class="animate-pop relative py-[0.2rem]" :style="{ paddingLeft: `${el.depth * 1.6 + 1}rem` }">
            <span class="absolute top-1/2 h-0.5 bg-border" :style="{ left: 0, width: `${el.depth * 1.6 + 0.8}rem` }" aria-hidden="true" />
            <component
              :is="interactive ? 'button' : 'span'"
              class="relative inline-flex items-center gap-2 rounded-lg border px-2 py-0.5 transition"
              :class="
                selected === i
                  ? 'border-accent bg-accent text-white shadow-md'
                  : 'border-[var(--accent-soft)] bg-accent-soft text-accent-fg ' + (interactive ? 'hover:border-accent' : '')
              "
              :aria-pressed="interactive ? selected === i : undefined"
              @click="interactive && $emit('select', i)"
            >
              {{ label(el) }}
            </component>
            <span v-if="showText && el.text" class="ml-2 inline-block max-w-[16rem] truncate align-middle font-sans text-[0.85em] text-subtle italic">
              « {{ el.text }} »
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
