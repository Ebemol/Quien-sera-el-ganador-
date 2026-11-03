import { Link } from "react-router-dom"
import { btnPrimary, card } from "../lib/ui"

interface EmptyStateProps {
  title: string
  text: string
  to?: string
  cta?: string
}

export default function EmptyState({ title, text, to, cta }: EmptyStateProps) {
  return (
    <div className={`${card} px-6 py-14 text-center`}>
      <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-500 max-w-md mx-auto">{text}</p>
      {to && (
        <Link to={to} className={`${btnPrimary} mt-6`}>
          {cta}
        </Link>
      )}
    </div>
  )
}
