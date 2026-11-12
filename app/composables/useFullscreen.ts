/** Plein écran natif du navigateur sur un élément donné. */
export function useFullscreen(target: Ref<HTMLElement | null | undefined>) {
  const isFullscreen = ref(false)

  function update() {
    isFullscreen.value = !!document.fullscreenElement
  }

  async function toggle() {
    if (!import.meta.client) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await (target.value ?? document.documentElement).requestFullscreen()
    } catch {
      /* plein écran refusé par le navigateur */
    }
  }

  onMounted(() => document.addEventListener('fullscreenchange', update))
  onBeforeUnmount(() => document.removeEventListener('fullscreenchange', update))

  return { isFullscreen, toggle }
}
