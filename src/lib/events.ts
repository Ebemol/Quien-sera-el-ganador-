import type { CategoryDraft } from "./types"

// Plantillas de eventos. Las opciones son de ejemplo: el anfitrión las edita
// al crear la Party (por eso dicen "Nominada 1", "Amigo 1", etc.).

export interface EventDef {
  slug: string
  name: string
  tag: string
  img: string | null
  categories: CategoryDraft[]
}

const t = (title: string, options: string[], points = 1): CategoryDraft => ({ title, options, points })
const five = (label: string): string[] => [1, 2, 3, 4, 5].map((n) => `${label} ${n}`)

export const EVENTS: EventDef[] = [
  {
    slug: "oscars",
    name: "Premios Oscar",
    tag: "Cine",
    img: "/Oscars.png",
    categories: [
      t("Mejor película", five("Nominada"), 3),
      t("Mejor director", five("Nominado"), 2),
      t("Mejor actriz", five("Nominada"), 1),
      t("Mejor actor", five("Nominado"), 1),
    ],
  },
  {
    slug: "grammy",
    name: "Premios Grammy",
    tag: "Música",
    img: "/Grammy.webp",
    categories: [
      t("Álbum del año", five("Nominado"), 3),
      t("Canción del año", five("Nominada"), 2),
      t("Artista revelación", five("Nominado"), 1),
    ],
  },
  {
    slug: "mati",
    name: "Premios Mati",
    tag: "Entre amigos",
    img: "/Mati.png",
    categories: [
      t("El que llega más tarde", ["Amigo 1", "Amigo 2", "Amigo 3", "Amigo 4"], 1),
      t("El alma de la fiesta", ["Amigo 1", "Amigo 2", "Amigo 3", "Amigo 4"], 1),
      t("El primero en casarse", ["Amigo 1", "Amigo 2", "Amigo 3", "Amigo 4"], 2),
    ],
  },
  {
    slug: "custom",
    name: "Evento personalizado",
    tag: "Tú decides",
    img: null,
    categories: [],
  },
]

export const getEvent = (slug?: string): EventDef | undefined => EVENTS.find((e) => e.slug === slug)
