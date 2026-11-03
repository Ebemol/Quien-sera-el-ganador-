import { useSyncExternalStore } from "react"
import type { AppState, Category, CategoryDraft, Party, RankRow, Status, User } from "./types"

/* ------------------------------------------------------------------
   Almacén de datos de la app.

   IMPORTANTE: por ahora todo vive en localStorage del navegador, así
   que las Parties NO se comparten entre dispositivos. Para que tus
   amigos se unan desde su propio celular hay que reemplazar este
   archivo por llamadas a un backend (Supabase, Firebase, tu API...).
   Mientras la API de este archivo se mantenga igual (createParty,
   joinParty, setPrediction, ...), las pantallas no necesitan cambios.
------------------------------------------------------------------- */

const KEY = "qsg:v1"
const listeners = new Set<() => void>()
let cache: AppState | null = null

export const uid = (): string =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`

const shortId = (): string => Math.random().toString(36).slice(2, 8)

function persist(data: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* almacenamiento lleno o bloqueado: seguimos en memoria */
  }
}

function load(): AppState {
  let raw: Partial<AppState> | null = null
  try {
    raw = JSON.parse(localStorage.getItem(KEY) ?? "null")
  } catch {
    raw = null
  }
  const data: AppState = {
    user: raw?.user ?? { id: uid(), name: "Ebemol" },
    parties: raw?.parties ?? {},
  }
  if (!raw?.user) persist(data)
  return data
}

function read(): AppState {
  if (!cache) cache = load()
  return cache
}

function commit(next: AppState): void {
  cache = next
  persist(next)
  listeners.forEach((l) => l())
}

if (typeof window !== "undefined") {
  // Mantiene sincronizadas varias pestañas abiertas
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = null
      listeners.forEach((l) => l())
    }
  })
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Hook: useStore(s => s.parties[code]). El selector debe devolver referencias estables. */
export function useStore<T>(selector: (state: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(read()))
}

/* ----------------------------- utilidades ----------------------------- */

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // sin 0/O/1/I para evitar confusiones

function newCode(existing: Record<string, Party>): string {
  let code: string
  do {
    code = Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("")
  } while (existing[code])
  return code
}

function updateParty(code: string, fn: (party: Party) => Party): boolean {
  const s = read()
  const party = s.parties[code]
  if (!party) return false
  commit({ ...s, parties: { ...s.parties, [code]: fn(party) } })
  return true
}

/* ------------------------------ acciones ------------------------------ */

export function setUserName(name: string): void {
  const s = read()
  const clean = name.trim()
  if (!clean) return
  commit({ ...s, user: { ...s.user, name: clean } })
}

interface CreatePartyInput {
  name: string
  hostName: string
  eventSlug: string
  eventName: string
  categories: CategoryDraft[]
}

export function createParty({ name, hostName, eventSlug, eventName, categories }: CreatePartyInput): string {
  const s = read()
  const user: User = { ...s.user, name: hostName.trim() || s.user.name }
  const code = newCode(s.parties)

  const party: Party = {
    code,
    name: name.trim(),
    eventSlug,
    eventName,
    hostId: user.id,
    status: "open",
    createdAt: Date.now(),
    categories: categories.map(
      (c): Category => ({
        id: shortId(),
        title: c.title.trim(),
        points: Number(c.points) || 1,
        winnerId: null,
        options: c.options
          .map((o) => o.trim())
          .filter(Boolean)
          .map((label) => ({ id: shortId(), label })),
      })
    ),
    members: [{ id: user.id, name: user.name }],
    predictions: {},
  }

  commit({ ...s, user, parties: { ...s.parties, [code]: party } })
  return code
}

export type JoinResult = { ok: true; code: string } | { ok: false; error: string }

export function joinParty(rawCode: string, name: string): JoinResult {
  const code = rawCode.trim().toUpperCase()
  const s = read()
  const party = s.parties[code]

  if (!party) return { ok: false, error: "No encontramos ninguna Party con ese código." }

  const user: User = { ...s.user, name: name.trim() || s.user.name }
  const already = party.members.some((m) => m.id === user.id)

  if (!already && party.status === "finished") {
    return { ok: false, error: "Esta Party ya terminó y no admite más jugadores." }
  }

  const members = already
    ? party.members.map((m) => (m.id === user.id ? { ...m, name: user.name } : m))
    : [...party.members, { id: user.id, name: user.name }]

  commit({ ...s, user, parties: { ...s.parties, [code]: { ...party, members } } })
  return { ok: true, code }
}

export function setPrediction(code: string, categoryId: string, optionId: string): boolean {
  const s = read()
  const party = s.parties[code]
  if (!party || party.status !== "open") return false
  const me = s.user.id
  return updateParty(code, (p) => ({
    ...p,
    predictions: {
      ...p.predictions,
      [me]: { ...(p.predictions[me] ?? {}), [categoryId]: optionId },
    },
  }))
}

export function setStatus(code: string, status: Status): boolean {
  const s = read()
  const party = s.parties[code]
  if (!party || party.hostId !== s.user.id) return false
  return updateParty(code, (p) => ({ ...p, status }))
}

/** Marca (o desmarca, si se repite) la opción ganadora de una categoría. */
export function setWinner(code: string, categoryId: string, optionId: string): boolean {
  const s = read()
  const party = s.parties[code]
  if (!party || party.hostId !== s.user.id) return false
  return updateParty(code, (p) => ({
    ...p,
    categories: p.categories.map((c) =>
      c.id === categoryId ? { ...c, winnerId: c.winnerId === optionId ? null : optionId } : c
    ),
  }))
}

export function deleteParty(code: string): boolean {
  const s = read()
  const party = s.parties[code]
  if (!party || party.hostId !== s.user.id) return false
  const { [code]: _removed, ...rest } = s.parties
  commit({ ...s, parties: rest })
  return true
}

/* ------------------------------ derivados ------------------------------ */

export const isMember = (party: Party | undefined, user: User): boolean =>
  !!party && party.members.some((m) => m.id === user.id)

export const isHost = (party: Party | undefined, user: User): boolean =>
  !!party && party.hostId === user.id

export function answeredCount(party: Party, userId: string): number {
  const mine = party.predictions[userId] ?? {}
  return party.categories.filter((c) => mine[c.id]).length
}

export function computeRanking(party: Pick<Party, "members" | "categories" | "predictions">): RankRow[] {
  const rows = party.members.map((m) => {
    const picks = party.predictions[m.id] ?? {}
    let points = 0
    let hits = 0
    for (const c of party.categories) {
      if (c.winnerId && picks[c.id] === c.winnerId) {
        points += c.points
        hits += 1
      }
    }
    return { ...m, points, hits, answered: party.categories.filter((c) => picks[c.id]).length }
  })

  rows.sort((a, b) => b.points - a.points || b.hits - a.hits || a.name.localeCompare(b.name))

  let rank = 0
  let prevPoints: number | null = null
  return rows.map((r, i) => {
    if (r.points !== prevPoints) {
      rank = i + 1
      prevPoints = r.points
    }
    return { ...r, rank }
  })
}
