export type TrainingType = 'gym' | 'home'

export type Page = 'schedule' | 'diet' | 'videos' | 'advice' | 'analysis'

export type ChatMessage = {
  sender: 'user' | 'assistant'
  text: string
  createdAt: string
}

export type ChatbotReply = {
  text: string
  fallback: boolean
  error?: string
}

export type AIResponse = {
  choices?: {
    message?: { content?: string }
    text?: string
  }[]
  generated_text?: string
  output?: string
  text?: string
  outputs?: {
    generated_text?: string
    data?: { text?: string }[]
  }[]
}

type ExerciseDetail = {
  name: string
  sets: string
  reps: string
  notes: string
}

export type WeeklyItem = {
  day: string
  focus: string
  workout: string
  meal: string
  notes: string
  videoUrl?: string
  exercises: ExerciseDetail[]
}

export type VideoGuideItem = {
  title: string
  description: string
  assetSrc: string
}

export type VideoGuideDay = {
  day: string
  videos: VideoGuideItem[]
}

type NutritionInfo = {
  calories: string
  protein: string
  carbs: string
  fat: string
}

export type MealDetail = {
  name: string
  description: string
  preparation: string
  alternatives: string[]
  nutrition: NutritionInfo
}

export type DietItem = {
  day: string
  meals: MealDetail[]
}

export type AdviceItem = {
  day: string
  summary: string
  details: string[]
}

export type Profile = {
  age: number
  weight: number
  height: number
  goal: string
}
