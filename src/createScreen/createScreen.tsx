import { useState, type FormEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import PageLayout from "../components/PageLayout"
import { EVENTS, getEvent } from "../lib/events"
import { createParty, useStore } from "../lib/store"
import { btnGhost, btnPrimary, card, inputCls } from "../lib/ui"

interface CatForm {
  key: string
  title: string
  points: number
  options: string[]
}

let seq = 0
const nextKey = (): string => `k${++seq}`

const fromTemplate = (slug: string): CatForm[] =>
  (getEvent(slug)?.categories ?? []).map((c) => ({
    key: nextKey(),
    title: c.title,
    points: c.points,
    options: [...c.options],
  }))

const POINTS = [1, 2, 3, 5]

export default function Create() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useStore((s) => s.user)

  const initial: string = getEvent(location.state?.event) ? location.state.event : "oscars"
  const [eventSlug, setEventSlug] = useState(initial)
  const [name, setName] = useState("")
  const [hostName, setHostName] = useState(user.name)
  const [cats, setCats] = useState<CatForm[]>(() => fromTemplate(initial))
  const [errors, setErrors] = useState<string[]>([])

  const pickEvent = (slug: string) => {
    setEventSlug(slug)
    setCats(fromTemplate(slug))
  }

  const patchCat = (key: string, patch: Partial<CatForm>) =>
    setCats((cs) => cs.map((c) => (c.key === key ? { ...c, ...patch } : c)))
  const setOption = (key: string, i: number, value: string) =>
    setCats((cs) =>
      cs.map((c) => (c.key === key ? { ...c, options: c.options.map((o, j) => (j === i ? value : o)) } : c))
    )
  const addOption = (key: string) =>
    setCats((cs) => cs.map((c) => (c.key === key ? { ...c, options: [...c.options, ""] } : c)))
  const removeOption = (key: string, i: number) =>
    setCats((cs) =>
      cs.map((c) => (c.key === key ? { ...c, options: c.options.filter((_, j) => j !== i) } : c))
    )
  const addCat = () =>
    setCats((cs) => [...cs, { key: nextKey(), title: "", points: 1, options: ["", ""] }])
  const removeCat = (key: string) => setCats((cs) => cs.filter((c) => c.key !== key))

  const validate = (): string[] => {
    const errs: string[] = []
    if (!name.trim()) errs.push("Ponle un nombre a tu Party.")
    if (!hostName.trim()) errs.push("Escribe tu nombre.")
    if (cats.length === 0) errs.push("Agrega al menos una categoría.")
    cats.forEach((c, i) => {
      const label = c.title.trim() || `Categoría ${i + 1}`
      if (!c.title.trim()) errs.push(`La categoría ${i + 1} necesita un título.`)
      if (c.options.filter((o) => o.trim()).length < 2) errs.push(`"${label}" necesita al menos 2 opciones.`)
    })
    return errs
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (errs.length) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    const ev = getEvent(eventSlug)
    if (!ev) return
    const code = createParty({ name, hostName, eventSlug, eventName: ev.name, categories: cats })
    navigate(`/party/${code}`)
  }

  return (
    <PageLayout>
      <form onSubmit={submit} noValidate className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Crea tu Party</h1>
          <p className="mt-2 text-slate-500">
            Elige un evento, ajusta las categorías y comparte el código con tus amigos.
          </p>
        </div>

        {errors.length > 0 && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-bold">Revisa lo siguiente:</p>
            <ul className="mt-1 list-disc pl-5 space-y-0.5">
              {errors.map((er) => (
                <li key={er}>{er}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 1. Datos básicos */}
        <section className={`${card} p-6 space-y-5`}>
          <h2 className="font-bold text-slate-900">1. Datos básicos</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Nombre de la Party</span>
              <input
                className={`${inputCls} mt-1.5`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Noche de Oscars con la banda"
                maxLength={50}
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Tu nombre</span>
              <input
                className={`${inputCls} mt-1.5`}
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                maxLength={30}
              />
            </label>
          </div>
        </section>

        {/* 2. Evento */}
        <section className={`${card} p-6`}>
          <h2 className="font-bold text-slate-900">2. Elige un evento</h2>
          <div role="radiogroup" aria-label="Evento" className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {EVENTS.map((ev) => {
              const selected = ev.slug === eventSlug
              return (
                <button
                  key={ev.slug}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => pickEvent(ev.slug)}
                  className={`text-left rounded-xl border-2 overflow-hidden transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                    selected ? "border-orange-500 ring-2 ring-orange-200" : "border-slate-200 hover:border-orange-300"
                  }`}
                >
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center overflow-hidden">
                    {ev.img ? (
                      <img src={ev.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-4xl text-slate-400" aria-hidden="true">＋</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600">{ev.tag}</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{ev.name}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* 3. Categorías */}
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900">3. Categorías y opciones</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Reemplaza las opciones de ejemplo por las reales. Cada categoría suma los puntos que elijas.
              </p>
            </div>
            <button type="button" onClick={addCat} className={btnGhost}>
              ＋ Categoría
            </button>
          </div>

          {cats.length === 0 && (
            <p className={`${card} p-6 text-center text-slate-500`}>
              Aún no hay categorías. Agrega la primera con el botón de arriba.
            </p>
          )}

          {cats.map((c, idx) => (
            <div key={c.key} className={`${card} p-5 space-y-4`}>
              <div className="flex flex-wrap items-start gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-sm font-black">
                  {idx + 1}
                </span>
                <input
                  className={`${inputCls} flex-1 min-w-[10rem] !py-2 font-semibold`}
                  value={c.title}
                  onChange={(e) => patchCat(c.key, { title: e.target.value })}
                  placeholder="Título de la categoría"
                  aria-label={`Título de la categoría ${idx + 1}`}
                />
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  Puntos
                  <select
                    value={c.points}
                    onChange={(e) => patchCat(c.key, { points: Number(e.target.value) })}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm focus:outline-none focus:border-orange-500"
                  >
                    {POINTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => removeCat(c.key)}
                  className="text-sm font-semibold text-red-600 hover:text-red-700 px-2 py-2"
                  aria-label={`Quitar categoría ${idx + 1}`}
                >
                  Quitar
                </button>
              </div>

              <ul className="space-y-2">
                {c.options.map((o, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input
                      className={`${inputCls} !py-2`}
                      value={o}
                      onChange={(e) => setOption(c.key, i, e.target.value)}
                      placeholder={`Opción ${i + 1}`}
                      aria-label={`Opción ${i + 1} de la categoría ${idx + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(c.key, i)}
                      disabled={c.options.length <= 2}
                      className="w-9 h-9 shrink-0 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                      aria-label={`Quitar opción ${i + 1}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => addOption(c.key)}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                ＋ Agregar opción
              </button>
            </div>
          ))}
        </section>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button type="button" onClick={() => navigate("/")} className={btnGhost}>
            Cancelar
          </button>
          <button type="submit" className={btnPrimary}>
            Crear Party
          </button>
        </div>
      </form>
    </PageLayout>
  )
}
