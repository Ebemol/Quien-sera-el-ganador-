import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

const steps = [
  {
    title: "Crea tu Party",
    text: "Elige un evento y genera un código único para tu sala privada.",
    icon: <path d="M12 5v14M5 12h14" strokeLinecap="round" />,
  },
  {
    title: "Invita a tus amigos",
    text: "Comparte el código para que se unan a la competencia.",
    icon: (
      <path
        d="M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zM8 13c-2.8 0-5 1.7-5 4v2h10v-2c0-2.3-2.200-4-5-4zm8 0c-.4 0-.8 0-1.2.1 1.3.9 2.2 2.2 2.2 3.9v2h4v-2c0-2.3-2.2-4-5-4z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  {
    title: "Haz tu pronóstico",
    text: "Vota por tus favoritos y suma puntos cada vez que aciertes.",
    icon: <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />,
  },
]

const events = [
  { slug: "oscars", name: "Premios Oscar", tag: "Cine", img: "./Oscars.png" },
  { slug: "grammy", name: "Premios Grammy", tag: "Música", img: "./Grammy.webp" },
  { slug: "mati", name: "Premios Mati", tag: "Entre amigos", img: "./Mati.png" },
]

const ranking = [
  { name: "Lucía", pts: 18, bar: "w-full", color: "bg-gradient-to-r from-orange-400 to-orange-500" },
  { name: "Eber", pts: 15, bar: "w-5/6", color: "bg-violet-400" },
  { name: "Diego", pts: 11, bar: "w-3/5", color: "bg-indigo-300" },
]

const ribbon = ["Oscars", "Grammy", "Mundial", "Eurovisión", "Balón de Oro", "Series del año", "Tus propios premios"]

export default function App() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 via-white to-orange-50/40"
          aria-hidden="true"
        />
        {/* Patrón de puntos */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(#c7d2fe_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -right-24 -z-10 w-96 h-96 rounded-full bg-violet-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-48 -left-24 -z-10 w-80 h-80 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-14 items-center">
          {/* Texto */}
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600 shadow-sm">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-orange-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-orange-500" />
              </span>
              Predicciones entre amigos
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Demuestra{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  quién sabe más
                </span>
                {/* Subrayado dibujado a mano */}
                <svg
                  className="absolute left-0 -bottom-1 w-full h-3 text-indigo-600/80"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8c30-6 60-6 98-3s68 3 98-2"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              Arma tu sala privada, invita a tus amigos y descubran quién tiene
              el mejor instinto prediciendo los eventos del año.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                type="button"
                onClick={() => navigate("/create")}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 transition-all"
              >
                Crear Party
              </button>
              <button
                type="button"
                onClick={() => navigate("/join")}
                className="px-8 py-3.5 rounded-xl font-bold text-indigo-700 bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-colors"
              >
                Unirme a una Party
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Gratis y sin dinero de por medio: solo puntos y orgullo.
            </p>
          </div>

          {/* Tarjeta ilustrativa de una sala */}
          <div className="relative mx-auto w-full max-w-sm">
            {/* Sticker */}
            <span className="absolute -top-4 -right-3 z-10 rotate-6 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/30">
              Sala privada
            </span>

            <div className="rotate-1 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-indigo-500/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Tu sala
                  </p>
                  <p className="mt-1 font-bold text-slate-900">Noche de Oscars</p>
                </div>
                <span className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1.5 font-mono text-sm font-bold tracking-widest text-indigo-700">
                  OSC-24X
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {ranking.map((p, i) => (
                  <li key={p.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700">
                        {i === 0 ? "👑" : `${i + 1}.`} {p.name}
                      </span>
                      <span className="text-slate-500">{p.pts} pts</span>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-slate-100">
                      <div className={`h-2.5 rounded-full ${p.bar} ${p.color}`} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 rounded-2xl bg-white border border-slate-200 shadow-lg px-4 py-2.5 -rotate-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-black">
                ✓
              </span>
              <span className="text-sm font-bold text-slate-700">
                ¡Acertaste Mejor Película!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CINTA DE EVENTOS */}
      <div className="bg-indigo-700 -rotate-1 scale-105 shadow-lg overflow-hidden" aria-hidden="true">
        <ul className="flex items-center gap-8 whitespace-nowrap py-3 px-6 justify-center flex-wrap">
          {ribbon.map((r) => (
            <li key={r} className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white">
              {r}
              <span className="text-orange-400">★</span>
            </li>
          ))}
        </ul>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-24">
        {/* CÓMO FUNCIONA */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              ¿Cómo <span className="text-orange-500">funciona</span>?
            </h2>
            <p className="mt-2 text-slate-500">Tres pasos y a competir.</p>
          </div>

          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="group relative rounded-2xl bg-white border border-slate-200 p-6 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all"
              >
                <span className="absolute top-4 right-5 text-6xl font-black text-slate-100 group-hover:text-orange-100 transition-colors select-none">
                  {i + 1}
                </span>
                <span className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md shadow-orange-500/30">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="relative mt-1.5 text-sm text-slate-500 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* EVENTOS */}
        <section>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Elige tu <span className="text-orange-500">evento</span>
            </h2>
            <p className="mt-2 text-slate-500">
              Empieza una Party con uno de los eventos disponibles.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {events.map((e) => (
              <button
                key={e.slug}
                type="button"
                onClick={() => navigate("/create", { state: { event: e.slug } })}
                className="group text-left rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-orange-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 transition-all"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={e.img}
                    alt={`Imagen de ${e.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700 shadow">
                    {e.tag}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <p className="font-bold text-slate-900">{e.name}</p>
                  <span className="text-sm font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                    Crear →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 to-violet-700 px-6 py-14 text-center text-white shadow-2xl shadow-indigo-500/25">
          <div
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-orange-500/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-violet-400/30 blur-3xl"
            aria-hidden="true"
          />
          <h2 className="relative text-3xl md:text-4xl font-black tracking-tight">
            ¿Listo para saber quién <span className="text-orange-400">manda</span>?
          </h2>
          <p className="relative mt-3 text-indigo-100">
            Crea tu sala en menos de un minuto.
          </p>
          <button
            type="button"
            onClick={() => navigate("/create")}
            className="relative mt-8 px-9 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-900/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700 transition-all"
          >
            Crear Party
          </button>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-400">
        Quién será <span className="font-bold text-orange-500">ganador</span> · Hecho para competir con amigos
      </footer>
    </div>
  )
}
