import { useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import PageLayout from "../components/PageLayout"
import { joinParty, useStore } from "../lib/store"
import { btnPrimary, card, inputCls } from "../lib/ui"

export default function Join() {
  const { code: codeParam } = useParams()
  const navigate = useNavigate()
  const user = useStore((s) => s.user)

  const clean = (v: string): string => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
  const [code, setCode] = useState(clean(codeParam ?? ""))
  const [name, setName] = useState(user.name)
  const [error, setError] = useState("")

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (code.length !== 6) return setError("El código tiene 6 caracteres.")
    if (!name.trim()) return setError("Escribe tu nombre.")
    const res = joinParty(code, name)
    if (!res.ok) return setError(res.error)
    navigate(`/party/${res.code}`)
  }

  return (
    <PageLayout width="max-w-lg">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">Únete a una Party</h1>
        <p className="mt-2 text-slate-500">Pídele el código a quien la creó y entra a competir.</p>
      </div>

      <form onSubmit={submit} noValidate className={`${card} mt-8 p-6 space-y-5`}>
        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Código de la Party</span>
          <input
            className={`${inputCls} mt-1.5 text-center font-mono text-3xl font-black tracking-[0.35em] uppercase`}
            value={code}
            onChange={(e) => {
              setCode(clean(e.target.value))
              setError("")
            }}
            placeholder="ABC123"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoFocus={!codeParam}
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Tu nombre</span>
          <input
            className={`${inputCls} mt-1.5`}
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError("")
            }}
            maxLength={30}
          />
        </label>

        <button type="submit" className={`${btnPrimary} w-full`}>
          Entrar a la Party
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        ¿No tienes código?{" "}
        <Link to="/create" className="font-semibold text-orange-600 hover:text-orange-700">
          Crea tu propia Party
        </Link>
      </p>
    </PageLayout>
  )
}
