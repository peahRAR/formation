<script setup lang="ts">
/**
 * Quiz à choix multiples : une question à la fois, correction expliquée
 * immédiatement, score final. Les réponses sont mémorisées localement.
 */
import { ArrowRight, CircleCheck, CircleX, RotateCcw, Trophy } from '@lucide/vue'
import type { QuizQuestion } from '~/types/course'

const props = defineProps<{ questions: QuizQuestion[]; courseId: string }>()

const progress = useProgress()
const answers = ref<Record<string, number>>({})
const current = ref(0)
const finished = ref(false)

onMounted(() => {
  answers.value = { ...progress.get(props.courseId).quiz }
  const firstUnanswered = props.questions.findIndex((q) => answers.value[q.id] === undefined)
  if (firstUnanswered === -1 && props.questions.length) finished.value = true
  else current.value = Math.max(0, firstUnanswered)
})

const question = computed(() => props.questions[current.value]!)
const answered = computed(() => answers.value[question.value.id])
const isCorrect = (q: QuizQuestion, choice?: number) => choice !== undefined && !!q.choices[choice]?.correct
const score = computed(() => props.questions.filter((q) => isCorrect(q, answers.value[q.id])).length)

function choose(i: number) {
  if (answered.value !== undefined) return
  answers.value = { ...answers.value, [question.value.id]: i }
  progress.saveQuizAnswer(props.courseId, question.value.id, i)
}

function next() {
  if (current.value < props.questions.length - 1) current.value++
  else finished.value = true
}

function restart() {
  answers.value = {}
  progress.resetQuiz(props.courseId)
  current.value = 0
  finished.value = false
}

const letters = ['A', 'B', 'C', 'D', 'E']
</script>

<template>
  <div class="flex flex-col">
    <!-- Pastilles de progression -->
    <div class="mb-5 flex items-center gap-2" aria-hidden="true">
      <button
        v-for="(q, i) in questions"
        :key="q.id"
        class="h-2 flex-1 rounded-full transition-colors"
        :class="[
          answers[q.id] === undefined ? 'bg-surface-3' : isCorrect(q, answers[q.id]) ? 'bg-emerald-500' : 'bg-rose-500',
          i === current && !finished ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg' : '',
        ]"
        tabindex="-1"
        @click="answers[q.id] !== undefined && ((current = i), (finished = false))"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <!-- Score final -->
      <div v-if="finished" key="score" class="card flex flex-col items-center p-[clamp(1.5rem,3cqi,3rem)] text-center">
        <div class="animate-pop mb-4 grid size-16 place-items-center rounded-2xl bg-accent-soft text-accent-fg">
          <Trophy :size="32" />
        </div>
        <p class="slide-title">{{ score }} / {{ questions.length }}</p>
        <p class="slide-subtitle mt-2 max-w-[40ch]">
          {{
            score === questions.length
              ? 'Parfait ! Vous avez une vision claire du fonctionnement d’un site web.'
              : score >= questions.length / 2
                ? 'Très bien ! Revoyez les questions manquées pour consolider.'
                : 'C’est un début ! N’hésitez pas à revoir les sections du cours.'
          }}
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <button class="btn-secondary" @click="((current = 0), (finished = false))">Revoir les corrections</button>
          <button class="btn-primary" @click="restart"><RotateCcw :size="16" /> Recommencer</button>
        </div>
      </div>

      <!-- Question -->
      <div v-else :key="question.id" class="flex flex-col">
        <p class="slide-small mb-2 font-semibold text-muted">Question {{ current + 1 }} sur {{ questions.length }}</p>
        <h3 class="slide-title mb-5 text-[clamp(1.3rem,2.4cqi,2.4rem)]">{{ question.question }}</h3>
        <div class="grid gap-3">
          <button
            v-for="(choice, i) in question.choices"
            :key="i"
            class="slide-body flex items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left transition"
            :class="[
              answered === undefined
                ? 'border-border bg-surface hover:border-accent hover:bg-accent-soft'
                : choice.correct
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : answered === i
                    ? 'border-rose-500 bg-rose-500/10'
                    : 'border-border bg-surface opacity-60',
            ]"
            :disabled="answered !== undefined"
            @click="choose(i)"
          >
            <span
              class="grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold"
              :class="answered !== undefined && choice.correct ? 'bg-emerald-500 text-white' : answered === i ? 'bg-rose-500 text-white' : 'bg-surface-3 text-muted'"
            >
              {{ letters[i] }}
            </span>
            <span class="flex-1">{{ choice.text }}</span>
            <CircleCheck v-if="answered !== undefined && choice.correct" class="shrink-0 text-emerald-500" />
            <CircleX v-else-if="answered === i" class="shrink-0 text-rose-500" />
          </button>
        </div>

        <Transition name="fade">
          <div
            v-if="answered !== undefined"
            class="mt-4 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center"
            :class="isCorrect(question, answered) ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-rose-500/40 bg-rose-500/10'"
            aria-live="polite"
          >
            <p class="slide-small flex-1 leading-relaxed">
              <strong>{{ isCorrect(question, answered) ? 'Bonne réponse !' : 'Pas tout à fait.' }}</strong>
              {{ question.explanation }}
            </p>
            <button class="btn-primary shrink-0" @click="next">
              {{ current < questions.length - 1 ? 'Question suivante' : 'Voir mon score' }}
              <ArrowRight :size="16" />
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
