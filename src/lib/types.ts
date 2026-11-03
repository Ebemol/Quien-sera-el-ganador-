export type Status = "open" | "closed" | "finished"

export interface Option {
  id: string
  label: string
}

export interface Category {
  id: string
  title: string
  points: number
  winnerId: string | null
  options: Option[]
}

export interface Member {
  id: string
  name: string
}

export interface Party {
  code: string
  name: string
  eventSlug: string
  eventName: string
  hostId: string
  status: Status
  createdAt: number
  categories: Category[]
  members: Member[]
  /** { [userId]: { [categoryId]: optionId } } */
  predictions: Record<string, Record<string, string>>
}

export interface User {
  id: string
  name: string
}

export interface AppState {
  user: User
  parties: Record<string, Party>
}

export interface RankRow extends Member {
  points: number
  hits: number
  answered: number
  rank: number
}

/** Categoría tal como se edita en el formulario de creación */
export interface CategoryDraft {
  title: string
  points: number
  options: string[]
}
