/**
 * Appel réel à l'API publique Dog CEO, depuis le navigateur.
 *
 * Le déroulé est découpé en phases pour pouvoir l'animer pas à pas :
 * idle → loading → request → response → read → update (ou error).
 * Un « ralenti pédagogique » impose une durée minimale à chaque phase.
 */
import { DOG_API_URL } from '~/content/courses/site-web/fil-rouge'

export type DogPhase = 'idle' | 'loading' | 'request' | 'response' | 'read' | 'update' | 'error'

export interface DogApiResponse {
  message: string
  status: string
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Extrait le nom de la race depuis l'URL de l'image (« hound-afghan » → « hound afghan »). */
export function breedFromUrl(url: string): string | null {
  const m = url.match(/breeds\/([^/]+)\//)
  return m ? m[1]!.replace(/-/g, ' ') : null
}

export function useDogApi(options: { slowMotion?: Ref<boolean>; stepDelay?: number } = {}) {
  const phase = ref<DogPhase>('idle')
  const image = ref<string | null>(null)
  const json = ref<DogApiResponse | null>(null)
  const error = ref<string | null>(null)
  const duration = ref<number | null>(null)
  const requests = ref(0)
  const simulateFailure = ref(false)
  let run = 0

  const busy = computed(() => ['loading', 'request', 'response', 'read'].includes(phase.value))

  async function pause() {
    if (options.slowMotion?.value ?? true) await sleep(options.stepDelay ?? 750)
  }

  function preload(src: string) {
    return new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Image indisponible'))
      img.src = src
    })
  }

  async function fetchDog() {
    if (busy.value) return
    const id = ++run
    error.value = null
    json.value = null
    duration.value = null
    requests.value++

    phase.value = 'loading'
    await pause()
    if (id !== run) return

    phase.value = 'request'
    const started = performance.now()
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      let data: DogApiResponse
      try {
        if (simulateFailure.value) {
          await sleep(600)
          throw new TypeError('Failed to fetch')
        }
        const res = await fetch(DOG_API_URL, { signal: controller.signal })
        if (!res.ok) throw new Error(`Réponse inattendue (${res.status})`)
        data = (await res.json()) as DogApiResponse
      } finally {
        clearTimeout(timeout)
      }
      duration.value = Math.round(performance.now() - started)
      await pause()
      if (id !== run) return

      phase.value = 'response'
      json.value = data
      await pause()
      if (id !== run) return

      phase.value = 'read'
      await Promise.all([preload(data.message), pause()])
      if (id !== run) return

      image.value = data.message
      phase.value = 'update'
    } catch (e) {
      if (id !== run) return
      phase.value = 'error'
      error.value =
        e instanceof TypeError || (e instanceof DOMException && e.name === 'AbortError')
          ? 'Impossible de joindre l’API. Vérifiez la connexion.'
          : 'L’API a répondu de façon inattendue.'
    }
  }

  function reset() {
    run++
    phase.value = 'idle'
    image.value = null
    json.value = null
    error.value = null
    duration.value = null
  }

  return { phase, image, json, error, duration, requests, busy, simulateFailure, fetchDog, reset }
}
