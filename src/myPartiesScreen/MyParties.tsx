import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import EmptyState from "../components/EmptyState"
import PageLayout from "../components/PageLayout"
import StatusBadge from "../components/StatusBadge"
import { computeRanking, setUserName, useStore } from "../lib/store"
import { btnGhost, btnPrimary, btnSecondary, card, inputCls } from "../lib/ui"

export default function MyParties() {
  const parties = useStore((s) => s.parties)
  const user = useStore((s) => s.user)
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)

  const mine = Object.values(parties)
    .filter((p) => p.members.some((m) => m.id === user.id))
    .sort((a, b) => b.createdAt - a.createdAt)

  const saveName = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setUserName(name)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Mis Parties</h1>
            <p className="mt-1 text-slate-500">Las salas que creaste o a las que te uniste.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/join" className={btnSecondary}>
              Unirme
            </Link>
            <Link to="/create" className={btnPrimary}>
              Crear Party
            </Link>
          </div>
        </div>

        {/* Perfil */}
        <form onSubmit={saveName} className={`${card} flex flex-wrap items-end gap-3 p-5`}>
          <label className="block flex-1 min-w-[12rem]">
            <span className="text-sm font-semibold text-slate-700">Tu nombre de jugador</span>
            <input className={`${inputCls} mt-1.5 !py-2`} value={name} onChange={(e) => setName(e.target.value)} maxLength={30} />
          </label>
          <button type="submit" className={btnGhost}>
            {saved ? "¡Guardado!" : "Guardar"}
          </button>
        </form>

        {mine.length === 0 ? (
          <EmptyState
            title="Aún no estás en ninguna Party"
            text="Crea una sala para tus amigos o únete con un código y demuestra quién sabe más."
            to="/create"
            cta="Crear mi primera Party"
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {mine.map((p) => {
              const ranking = computeRanking(p)
              const me = ranking.find((r) => r.id === user.id)
              return (
                <li key={p.code}>
                  <Link
                    to={`/party/${p.code}`}
                    className={`${card} block p-5 transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-orange-600">{p.eventName}</p>
                      <StatusBadge status={p.status} />
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-slate-900 leading-snug">{p.name}</h2>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                      <span>
                        {p.members.length} {p.members.length === 1 ? "jugador" : "jugadores"}
                      </span>
                      <span>
                        Puesto <b className="text-slate-900">{me?.rank ?? "-"}</b> · <b className="text-slate-900">{me?.points ?? 0}</b> pts
                      </span>
                    </div>
                    <p className="mt-3 font-mono text-xs font-bold tracking-[0.25em] text-slate-400">{p.code}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </PageLayout>
  )
}
