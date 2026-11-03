import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import EmptyState from "../components/EmptyState"
import PageLayout from "../components/PageLayout"
import { answeredCount, isMember, setPrediction, useStore } from "../lib/store"
import { btnPrimary, btnSecondary, card } from "../lib/ui"

export default function Predict() {
  const { code = "" } = useParams()
  const navigate = useNavigate()
  const party = useStore((s) => s.parties[code])
  const user = useStore((s) => s.user)

  const member = isMember(party, user)

  useEffect(() => {
    if (party && !member) navigate(`/join/${code}`, { replace: true })
  }, [party, member, code, navigate])

  if (!party) {
    return (
      <PageLayout>
        <EmptyState title="No encontramos esta Party" text="Revisa el código e inténtalo de nuevo." to="/join" cta="Ingresar un código" />
      </PageLayout>
    )
  }
  if (!member) return null

  const mine = party.predictions[user.id] || {}
  const locked = party.status !== "open"
  const total = party.categories.length
  const answered = answeredCount(party, user.id)
  const missing = total - answered

  return (
    <PageLayout>
      <div className="pb-24 space-y-6">
        <div>
          <Link to={`/party/${party.code}`} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            ← {party.name}
          </Link>
          <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-slate-900">Tus pronósticos</h1>
          <p className="mt-1 text-slate-500">
            {locked ? "Los pronósticos ya están cerrados." : "Elige una opción por categoría. Se guarda al instante."}
          </p>
        </div>

        {locked && (
          <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            El anfitrión cerró los pronósticos, así que ya no se pueden cambiar.
          </p>
        )}

        {party.categories.map((c, idx) => {
          const labelId = `cat-${c.id}`
          return (
            <section key={c.id} className={`${card} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <h2 id={labelId} className="font-bold text-slate-900">
                  <span className="mr-2 text-orange-500">{idx + 1}.</span>
                  {c.title}
                </h2>
                <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
                  {c.points} {c.points === 1 ? "punto" : "puntos"}
                </span>
              </div>

              <div role="radiogroup" aria-labelledby={labelId} className="mt-4 grid gap-2 sm:grid-cols-2">
                {c.options.map((o) => {
                  const selected = mine[c.id] === o.id
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      disabled={locked}
                      onClick={() => setPrediction(party.code, c.id, o.id)}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 disabled:cursor-not-allowed ${
                        selected
                          ? "border-orange-500 bg-orange-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 disabled:hover:border-slate-200"
                      } ${locked && !selected ? "opacity-60" : ""}`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[11px] text-white ${
                          selected ? "border-orange-500 bg-orange-500" : "border-slate-300"
                        }`}
                        aria-hidden="true"
                      >
                        {selected && "✓"}
                      </span>
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Barra inferior */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">{answered}</span> de {total} respondidas
            {!locked && missing > 0 && <span className="text-slate-400"> · faltan {missing}</span>}
          </p>
          <button
            type="button"
            onClick={() => navigate(`/party/${party.code}`)}
            className={!locked && missing === 0 ? btnPrimary : btnSecondary}
          >
            {locked ? "Volver a la sala" : missing === 0 ? "Listo, ver sala" : "Guardar y volver"}
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
