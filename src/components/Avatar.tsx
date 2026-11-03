const COLORS = [
  "bg-indigo-500",
  "bg-orange-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-teal-500",
]

interface AvatarProps {
  name?: string
  size?: string
  text?: string
}

export default function Avatar({ name = "?", size = "w-9 h-9", text = "text-sm" }: AvatarProps) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "?"
  const color = COLORS[[...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % COLORS.length]

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold text-white shrink-0 ${size} ${text} ${color}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
