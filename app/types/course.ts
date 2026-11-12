/**
 * Modèle de données des cours.
 *
 * Le contenu (app/content) ne dépend que de ces types : aucun composant
 * d'interface n'y est référencé directement. Les diapositives de type
 * « demo » et « illustration » désignent leur composant par une clé,
 * résolue dans app/components/registry.ts.
 */

export type CourseStatus = 'published' | 'draft' | 'coming-soon'
export type CourseLevel = 'Découverte' | 'Débutant' | 'Intermédiaire' | 'Avancé'

/** Couleur d'accent associée à une section (codes couleur par technologie). */
export type Accent = 'indigo' | 'orange' | 'blue' | 'sky' | 'amber' | 'emerald' | 'violet' | 'rose'

/** Mode de consultation d'un cours. */
export type PlayerMode = 'complet' | 'express'

export type CodeLang = 'html' | 'css' | 'js' | 'json' | 'vue' | 'text'

export interface CodeFile {
  /** Nom affiché dans l'onglet (ex. « index.html »). */
  name: string
  lang: CodeLang
  code: string
  /** Lignes mises en évidence (numérotées à partir de 1). */
  highlight?: number[]
}

interface SlideBase {
  /** Identifiant unique dans le cours, utilisé dans l'URL. */
  id: string
  title: string
  /** Petite ligne au-dessus du titre (ex. « Section 2 · HTML »). */
  eyebrow?: string
  subtitle?: string
  /** La diapositive fait partie du parcours express (~15 min). */
  express?: boolean
  /** Notes du formateur, en texte simple (un paragraphe par ligne vide). */
  notes?: string
}

/** Diapositive de couverture ou d'ouverture de section. */
export interface TitleSlide extends SlideBase {
  kind: 'title'
  /** Icône Lucide (nom en PascalCase, ex. « Globe »). */
  icon?: string
}

export interface TextPoint {
  icon?: string
  title: string
  text?: string
}

/** Peu de texte : quelques points clés ou une grande question. */
export interface TextSlide extends SlideBase {
  kind: 'text'
  /** Affiche le titre en très grand, comme une question posée à la salle. */
  statement?: boolean
  lead?: string
  points?: TextPoint[]
  /** Encadré « À retenir ». */
  takeaway?: string
}

/** Schéma animé, désigné par une clé du registre. */
export interface IllustrationSlide extends SlideBase {
  kind: 'illustration'
  illustration: string
  caption?: string
  props?: Record<string, unknown>
}

/** Code, éventuellement accompagné de son résultat. */
export interface CodeSlide extends SlideBase {
  kind: 'code'
  files: CodeFile[]
  /** Affiche le rendu à côté du code. */
  preview?: { html: string; css?: string; js?: string }
  explanation?: string
}

/** Démonstration interactive, désignée par une clé du registre. */
export interface DemoSlide extends SlideBase {
  kind: 'demo'
  demo: string
  props?: Record<string, unknown>
}

/** Comparaison avant / après de deux rendus. */
export interface ComparisonSlide extends SlideBase {
  kind: 'comparison'
  before: { label: string; html: string; css?: string }
  after: { label: string; html: string; css?: string }
  caption?: string
}

export interface QuizChoice {
  text: string
  correct?: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  choices: QuizChoice[]
  /** Correction affichée après la réponse. */
  explanation: string
}

export interface QuizSlide extends SlideBase {
  kind: 'quiz'
  questions: QuizQuestion[]
}

export type Slide =
  | TitleSlide
  | TextSlide
  | IllustrationSlide
  | CodeSlide
  | DemoSlide
  | ComparisonSlide
  | QuizSlide

export type SlideKind = Slide['kind']

export interface Section {
  id: string
  title: string
  /** Titre court pour la sidebar. */
  shortTitle?: string
  accent: Accent
  icon: string
  slides: Slide[]
}

export interface Course {
  id: string
  title: string
  description: string
  /** Identifiant du parcours (catégorie). */
  category: string
  level: CourseLevel
  /** Durée indicative du mode complet, en minutes. */
  duration: number
  /** Durée indicative du parcours express, en minutes. */
  expressDuration?: number
  status: CourseStatus
  icon: string
  /** Ce que l'apprenant saura faire à la fin. */
  objectives?: string[]
  sections: Section[]
}

/** Cours annoncé mais pas encore rédigé : il n'a pas de sections. */
export interface CourseStub {
  id: string
  title: string
  description: string
  category: string
  level: CourseLevel
  duration: number
  status: 'coming-soon'
  icon: string
}

export type CatalogEntry = Course | CourseStub

export interface LearningPath {
  id: string
  title: string
  description: string
  icon: string
  courses: CatalogEntry[]
}

/** Diapositive enrichie de sa position, utilisée par le lecteur. */
export interface PlayerSlide {
  slide: Slide
  section: Section
  /** Index dans la séquence du mode courant. */
  index: number
  /** Index de la section dans le cours. */
  sectionIndex: number
}
