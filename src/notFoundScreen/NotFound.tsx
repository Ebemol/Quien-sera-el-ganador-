import { Link } from "react-router-dom"
import PageLayout from "../components/PageLayout"
import { btnPrimary, btnSecondary } from "../lib/ui"

export default function NotFound() {
  return (
    <PageLayout width="max-w-xl">
      <div className="py-12 text-center">
        <p className="text-7xl font-black tracking-tight text-orange-500">404</p>
        <h1 className="mt-3 text-2xl font-black text-slate-900">Esta página no existe</h1>
        <p className="mt-2 text-slate-500">Puede que el enlace esté mal escrito o que la página se haya movido.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className={btnPrimary}>
            Ir al inicio
          </Link>
          <Link to="/join" className={btnSecondary}>
            Unirme a una Party
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
