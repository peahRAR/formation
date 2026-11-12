<script setup lang="ts">
/** La même fiche écrite en CSS maison, avec Bootstrap et avec Tailwind CSS. */
import { WifiOff } from '@lucide/vue'
import { CSS_FRAMEWORK_EXAMPLES, CSS_FRAMEWORK_STAGE } from '~/content/courses/site-web/fil-rouge'
import type { CodeFile } from '~/types/course'

const active = ref(0)
const example = computed(() => CSS_FRAMEWORK_EXAMPLES[active.value]!)
const files = computed<CodeFile[]>(() => {
  const f: CodeFile[] = [{ name: 'index.html', lang: 'html', code: example.value.html }]
  if (example.value.css) f.push({ name: 'style.css', lang: 'css', code: example.value.css })
  return f
})
</script>

<template>
  <div class="flex h-full flex-col gap-4">
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3" role="tablist">
      <button
        v-for="(ex, i) in CSS_FRAMEWORK_EXAMPLES"
        :key="ex.id"
        role="tab"
        :aria-selected="active === i"
        class="rounded-2xl border p-3 text-left transition"
        :class="active === i ? 'border-accent bg-accent-soft' : 'border-border bg-surface hover:border-border-strong'"
        @click="active = i"
      >
        <span class="slide-body block font-semibold">{{ ex.label }}</span>
        <span class="slide-small mt-0.5 block leading-snug text-muted">{{ ex.description }}</span>
      </button>
    </div>
    <div class="grid grid-cols-1 min-h-0 flex-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <CodeViewer :key="example.id" class="min-h-[14rem]" :files="files" />
      <div class="flex min-h-[16rem] flex-col gap-2">
        <LivePreview
          :key="example.id"
          class="flex-1"
          :html="example.html"
          :css="`${CSS_FRAMEWORK_STAGE}\n${example.css}`"
          :head="example.head"
          :debounce="0"
        />
        <p v-if="example.head" class="flex items-center gap-1.5 text-xs text-subtle">
          <WifiOff :size="13" /> Le framework est chargé depuis Internet pour cet aperçu.
        </p>
      </div>
    </div>
  </div>
</template>
