import { useNavigate } from "react-router-dom"
import { useStore } from "../lib/store"

export default function Header() {
  const navigate = useNavigate()
  const user = useStore((s) => s.user)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm px-6 py-3 flex items-center justify-between border-b border-gray-200">

      <button
        onClick={() => navigate("/")}
        className="text-3xl font-black text-orange-500 tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-md"
        aria-label="Ir al inicio"
      >
        QuienSera<span className="text-gray-800">Ganador</span>
      </button>

      <button
        onClick={() => navigate("/parties")}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        aria-label="Ir a mis Parties"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
          alt={`Avatar de ${user.name}`}
          className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
        />

        <div className="hidden sm:block text-left">
          <p className="text-sm font-bold text-gray-800 leading-none">{user.name}</p>
          <p className="text-xs text-gray-500 mt-1">Mis Parties</p>
        </div>
      </button>

    </header>
  )
}
