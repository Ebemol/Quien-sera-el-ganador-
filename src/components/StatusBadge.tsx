import type { Status } from "../lib/types"

const MAP: Record<Status, { label: string; cls: string; dot: string }> = {
  open: { label: "Pronósticos abiertos", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  closed: { label: "Pronósticos cerrados", cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  finished: { label: "Party finalizada", cls: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
}

export default function StatusBadge({ status }: { status: Status }) {
  const s = MAP[status] ?? MAP.open
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${s.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}
