import { useEffect, type ElementType } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import EmptyState from "../components/EmptyState"
import PageLayout from "../components/PageLayout"
import { isHost, isMember, setStatus, setWinner, useStore } from "../lib/store"
import { btnGhost, btnPrimary, card } from "../lib/ui"

export default function Results() {
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

  const host = isHost(party, user)
  const open = party.status === "open"
  const finished = party.status === "finished"
  const canSet = host && !open && !finished
  const revealPicks = !open // mientras estén abiertos, nadie ve los votos de los demás
  const mine = party.predictions[user.id] || {}
  const allSet = party.categories.every((c) => c.winnerId)
  const setCount = party.categories.filter((c) => c.winnerId).length

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <Link to={`/party/${party.code}`} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
            ← {party.name}
          </Link>
          <h1 className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-slate-900">Resultados</h1>
          <p className="mt-1 text-slate-500">
            {host
              ? canSet
                ? "Toca la opción ganadora de cada categoría. Toca de nuevo para quitarla."
                : open
                ? "Cierra los pronósticos para poder cargar los resultados."
                : "La Party ya está finalizada."
              : `${setCount} de ${party.categories.length} categorías con resultado.`}
          </p>
        </div>

        {host && open && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <span>Los pronósticos siguen abiertos.</span>
            <button type="button" onClick={() => setStatus(party.code, "closed")} className={btnGhost}>
              Cerrar pronósticos ahora
            </button>
          </div>
        )}

        {!host && open && (
          <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
            Los votos de los demás se mostrarán cuando el anfitrión cierre los pronósticos.
          </p>
        )}

        {party.categories.map((c, idx) => {
          const counts: Record<string, number> = Object.fromEntries(c.options.map((o) => [o.id, 0]))
          for (const m of party.members) {
            const pick = party.predictions[m.id]?.[c.id]
            if (pick && pick in counts) counts[pick] += 1
          }
          const voters = Object.values(counts).reduce((a, b) => a + b, 0)
          const winner = c.options.find((o) => o.id === c.winnerId)
          const correct = winner
            ? party.members.filter((m) => party.predictions[m.id]?.[c.id] === winner.id)
            : []
          const iGotIt = winner && mine[c.id] === winner.id

          return (
            <section key={c.id} className={`${card} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-bold text-slate-900">
                  <span className="mr-2 text-orange-500">{idx + 1}.</span>
                  {c.title}
                </h2>
                <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
                  {c.points} {c.points === 1 ? "punto" : "puntos"}
                </span>
              </div>

              <ul className="mt-4 space-y-2">
                {c.options.map((o) => {
                  const isWinner = c.winnerId === o.id
                  const isMine = mine[c.id] === o.id
                  const pct = voters ? Math.round((counts[o.id] / voters) * 100) : 0
                  const Row: ElementType = canSet ? "button" : "div"
                  const rowProps: Record<string, unknown> = canSet
                    ? { type: "button", onClick: () => setWinner(party.code, c.id, o.id), "aria-pressed": isWinner }
                    : {}

                  return (
                    <li key={o.id}>
                      <Row
                        {...rowProps}
                        className={`relative block w-full overflow-hidden rounded-xl border-2 px-4 py-3 text-left transition ${
                          isWinner ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"
                        } ${canSet ? "cursor-pointer hover:border-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400" : ""}`}
                      >
                        {revealPicks && (
                          <span
                            className={`absolute inset-y-0 left-0 ${isWinner ? "bg-emerald-100" : "bg-slate-100"}`}
                            style={{ width: `${pct}%` }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative flex items-center justify-between gap-3">
                          <span className="flex flex-wrap items-center gap-2 font-medium text-slate-800">
                            {o.label}
                            {isWinner && (
                              <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                Ganador
                              </span>
                            )}
                            {isMine && (
                              <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700">
                                Tu voto
                              </span>
                            )}
                          </span>
                          {revealPicks && (
                            <span className="shrink-0 text-sm text-slate-500">
                              {counts[o.id]} · {pct}%
                            </span>
                          )}
                        </span>
                      </Row>
                    </li>
                  )
                })}
              </ul>

              {winner && (
                <p className="mt-3 text-sm text-slate-600">
                  {iGotIt ? (
                    <span className="font-bold text-emerald-600">¡Acertaste! +{c.points} {c.points === 1 ? "punto" : "puntos"}. </span>
                  ) : mine[c.id] ? (
                    <span className="font-semibold text-slate-500">No acertaste esta vez. </span>
                  ) : null}
                  {correct.length > 0
                    ? `Acertaron: ${correct.map((m) => m.name).join(", ")}.`
                    : "Nadie acertó esta categoría."}
                </p>
              )}
            </section>
          )
        })}

        {host && !open && (
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              {finished
                ? "La Party está finalizada."
                : allSet
                ? "Ya cargaste todos los resultados. Puedes finalizar la Party y mostrar al ganador."
                : `Faltan ${party.categories.length - setCount} categorías por cargar.`}
            </p>
            {!finished && (
              <button
                type="button"
                disabled={!allSet}
                onClick={() => {
                  setStatus(party.code, "finished")
                  navigate(`/party/${party.code}`)
                }}
                className={btnPrimary}
              >
                Finalizar Party
              </button>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
