<script setup lang="ts">
/**
 * Lecteur de diapositives.
 *
 * - La diapositive courante est dans l'URL (?diapo=identifiant) : un lien
 *   permet de retrouver directement une diapositive précise.
 * - Navigation : boutons, barre de progression, clavier (← → Espace Début Fin).
 * - Raccourcis : F plein écran, S barre latérale, N notes, ? aide.
 */
import type { Course } from '~/types/course'

const props = defineProps<{ course: Course }>()

const route = useRoute()
const router = useRouter()
const progress = useProgress()
const { notesOpen, toggleSidebar, mobileMenuOpen } = useUi()

const root = ref<HTMLElement>()
const stage = ref<HTMLElement>()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(root)
const helpOpen = ref(false)

const sequence = computed(() => buildSequence(props.course))
const index = computed(() => {
  const id = String(route.query.diapo ?? '')
  const i = sequence.value.findIndex((s) => s.slide.id === id)
  return i === -1 ? 0 : i
})
const current = computed(() => sequence.value[index.value]!)
const direction = ref<'slide-next' | 'slide-prev'>('slide-next')

function goTo(i: number) {
  const target = sequence.value[Math.min(sequence.value.length - 1, Math.max(0, i))]
  if (!target || target.index === index.value) return
  direction.value = target.index > index.value ? 'slide-next' : 'slide-prev'
  router.replace({ query: { ...route.query, diapo: target.slide.id } })
}
const next = () => goTo(index.value + 1)
const prev = () => goTo(index.value - 1)

// Mémorise la progression et remet le défilement en haut à chaque diapositive.
watch(
  () => current.value.slide.id,
  (id) => {
    progress.markSeen(props.course.id, id)
    stage.value?.scrollTo({ top: 0 })
  },
)
onMounted(() => progress.markSeen(props.course.id, current.value.slide.id))

function isTyping(el: EventTarget | null) {
  const t = el as HTMLElement | null
  return !!t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))
}

function onKeydown(e: KeyboardEvent) {
  if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return
  if (mobileMenuOpen.value) return
  const onButton = (e.target as HTMLElement)?.closest?.('button, a, [role="slider"]')
  switch (e.key) {
    case 'ArrowRight':
    case 'PageDown':
      e.preventDefault()
      next()
      break
    case ' ':
      if (onButton) return
      e.preventDefault()
      if (e.shiftKey) prev()
      else next()
      break
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault()
      prev()
      break
    case 'Home':
      e.preventDefault()
      goTo(0)
      break
    case 'End':
      e.preventDefault()
      goTo(sequence.value.length - 1)
      break
    case 'f':
    case 'F':
      toggleFullscreen()
      break
    case 's':
    case 'S':
      toggleSidebar()
      break
    case 'n':
    case 'N':
      notesOpen.value = !notesOpen.value
      break
    case '?':
      helpOpen.value = !helpOpen.value
      break
    case 'Escape':
      if (helpOpen.value) helpOpen.value = false
      else if (notesOpen.value) notesOpen.value = false
      break
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

useHead(() => ({
  title: `${current.value.slide.title} · ${props.course.title}`,
}))
</script>

<template>
  <div ref="root" class="flex h-full flex-col bg-bg" :data-accent="current.section.accent">
    <PlayerTopbar
      :course="course"
      :section="current.section"
      :is-fullscreen="isFullscreen"
      @toggle-fullscreen="toggleFullscreen"
      @help="helpOpen = true"
    />

    <div class="relative flex min-h-0 flex-1">
      <div ref="stage" class="slide-stage relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <Transition :name="direction" mode="out-in">
          <section
            :key="current.slide.id"
            class="mx-auto flex min-h-full w-full max-w-[1500px] flex-col px-[clamp(1rem,4.5cqi,5rem)] py-[clamp(1.25rem,3.2cqi,3.5rem)]"
            :aria-label="`Diapositive ${index + 1} sur ${sequence.length} : ${current.slide.title}`"
          >
            <SlideRenderer class="flex-1" :slide="current.slide" :course-id="course.id" />
          </section>
        </Transition>
      </div>

      <NotesPanel v-if="notesOpen" :slide="current.slide" :course-id="course.id" @close="notesOpen = false" />
    </div>

    <PlayerControls :sequence="sequence" :index="index" :course="course" @go="goTo" @prev="prev" @next="next" />

    <KeyboardHelp v-if="helpOpen" @close="helpOpen = false" />
  </div>
</template>
