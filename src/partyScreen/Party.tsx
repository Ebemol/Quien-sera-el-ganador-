import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Avatar from "../components/Avatar"
import EmptyState from "../components/EmptyState"
import PageLayout from "../components/PageLayout"
import StatusBadge from "../components/StatusBadge"
import { answeredCount, computeRanking, deleteParty, isHost, isMember, setStatus, useStore } from "../lib/store"
import { btnGhost, btnPrimary, btnSecondary, card } from "../lib/ui"

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

export default function Party() {
  const { code = "" } = useParams()
  const navigate = useNavigate()
  const party = useStore((s) => s.parties[code])
  const user = useStore((s) => s.user)
  const [copied, setCopied] = useState<"" | "code" | "link">("")

  const member = isMember(party, user)

  // Si todavía no eres parte de la sala, te llevamos a unirte
  useEffect(() => {
    if (party && !member) navigate(`/join/${code}`, { replace: true })
  }, [party, member, code, navigate])

  if (!party) {
    return (
      <PageLayout>
        <EmptyState
          title="No encontramos esta Party"
          text="Revisa que el código esté bien escrito, o crea una Party nueva."
          to="/join"
          cta="Ingresar un código"
        />
      </PageLayout>
    )
  }
  if (!member) return null

  const host = isHost(party, user)
  const ranking = computeRanking(party)
  const total = party.categories.length
  const answered = answeredCount(party, user.id)
  const finished = party.status === "finished"
  const open = party.status === "open"
  const winners = finished ? ranking.filter((r) => r.rank === 1) : []
  const link = `${window.location.origin}/join/${party.code}`

  const copy = async (text: string, label: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(""), 1800)
    } catch {
      window.prompt("Copia este texto:", text)
    }
  }

  const remove = () => {
    if (window.confirm("¿Eliminar esta Party? Esta acción no se puede deshacer.")) {
      deleteParty(party.code)
      navigate("/parties")
    }
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Encabezado */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{party.eventName}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{party.name}</h1>
            <StatusBadge status={party.status} />
          </div>
        </div>

        {/* Ganador */}
        {finished && winners.length > 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg shadow-orange-500/20 text-center">
            <p className="text-4xl" aria-hidden="true">🏆</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-orange-100">
              {winners.length > 1 ? "Empate en el primer lugar" : "El que más sabe"}
            </p>
            <p className="mt-1 text-2xl font-black">{winners.map((w) => w.name).join(" y ")}</p>
            <p className="text-orange-100">{winners[0].points} puntos</p>
          </div>
        )}

        {/* Código para invitar */}
        <section className={`${card} p-6`}>
          <p className="text-sm font-semibold text-slate-500">Código de invitación</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="rounded-xl bg-orange-50 border border-orange-200 px-5 py-3 font-mono text-3xl font-black tracking-[0.3em] text-orange-600">
              {party.code}
            </span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => copy(party.code, "code")} className={btnGhost}>
                {copied === "code" ? "¡Copiado!" : "Copiar código"}
              </button>
              <button type="button" onClick={() => copy(link, "link")} className={btnGhost}>
                {copied === "link" ? "¡Copiado!" : "Copiar enlace"}
              </button>
            </div>
          </div>
        </section>

        {/* Mi progreso */}
        <section className={`${card} p-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-[12rem] flex-1">
              <p className="font-bold text-slate-900">Tus pronósticos</p>
              <p className="text-sm text-slate-500">
                {answered} de {total} categorías respondidas
              </p>
              <div className="mt-2 h-2.5 rounded-full bg-slate-100" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={answered}>
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all"
                  style={{ width: `${total ? (answered / total) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Link to={`/party/${party.code}/predict`} className={open ? btnPrimary : btnSecondary}>
                {open ? (answered ? "Editar pronósticos" : "Hacer mis pronósticos") : "Ver mis pronósticos"}
              </Link>
            </div>
          </div>
        </section>

        {/* Ranking */}
        <section className={card}>
          <div className="flex items-center justify-between px-6 pt-6">
            <h2 className="font-bold text-slate-900">Ranking</h2>
            <Link to={`/party/${party.code}/results`} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              Ver resultados →
            </Link>
          </div>
          <ol className="p-3 mt-2">
            {ranking.map((r) => {
              const me = r.id === user.id
              return (
                <li
                  key={r.id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 ${me ? "bg-orange-50 border border-orange-200" : ""}`}
                >
                  <span className="w-8 text-center text-lg font-black text-slate-400">
                    {r.points > 0 && MEDALS[r.rank] ? MEDALS[r.rank] : r.rank}
                  </span>
                  <Avatar name={r.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">
                      {r.name}
                      {me && <span className="ml-1.5 text-xs font-bold text-orange-600">(tú)</span>}
                      {r.id === party.hostId && (
                        <span className="ml-1.5 rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-600">
                          Anfitrión
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
                      {r.answered}/{total} respondidas · {r.hits} {r.hits === 1 ? "acierto" : "aciertos"}
                    </p>
                  </div>
                  <p className="text-right">
                    <span className="text-xl font-black text-slate-900">{r.points}</span>
                    <span className="ml-1 text-xs text-slate-500">pts</span>
                  </p>
                </li>
              )
            })}
          </ol>
          {party.categories.every((c) => !c.winnerId) && (
            <p className="px-6 pb-5 text-sm text-slate-500">
              Los puntos aparecerán cuando el anfitrión cargue los resultados.
            </p>
          )}
        </section>

        {/* Panel del anfitrión */}
        {host && (
          <section className={`${card} p-6`}>
            <h2 className="font-bold text-slate-900">Panel del anfitrión</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {open && (
                <button type="button" onClick={() => setStatus(party.code, "closed")} className={btnGhost}>
                  Cerrar pronósticos
                </button>
              )}
              {party.status === "closed" && (
                <button type="button" onClick={() => setStatus(party.code, "open")} className={btnGhost}>
                  Reabrir pronósticos
                </button>
              )}
              {finished && (
                <button type="button" onClick={() => setStatus(party.code, "closed")} className={btnGhost}>
                  Reabrir Party
                </button>
              )}
              <Link to={`/party/${party.code}/results`} className={btnGhost}>
                Cargar resultados
              </Link>
              <button
                type="button"
                onClick={remove}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Eliminar Party
              </button>
            </div>
            {open && (
              <p className="mt-3 text-sm text-slate-500">
                Cierra los pronósticos cuando empiece el evento para que nadie pueda cambiar su voto.
              </p>
            )}
          </section>
        )}
      </div>
    </PageLayout>
  )
}
