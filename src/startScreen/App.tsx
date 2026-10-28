
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header></Header>
      <section className="justify-center py-1 flex flex-col sm:flex-row pt-2 space-y-4">
        <div className="gap-6 flex flex-col">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 text-center">Demuestra quién sabe más </h1>
          <p className="text-gray-600 mt-2">Arma tu sala privada, invita a tus amigos y descubran quién tiene el mejor instinto prediciendo los eventos del año.</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => navigate("/create")}
            className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-colors"
          >
            Crear Party
          </button>
          <button
            type="button"
            onClick={() => navigate("/join")}
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-lg border-2 border-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-colors"
          >
            Unirme a una Party
          </button>

        </div>

        </div>
      </section>


      <main className="max-w-4xl mx-auto p-6 md:p-6">

        <div className=" px-6 py-3 rounded-lg flex flex-col gap-2">
                  <h1 className="text-2xl md:text-2xl font-extrabold text-gray-800 text-center">¿Cómo funciona? </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
              <span className="text-3xl block mb-2">1️⃣</span>
              <h3 className="font-bold text-gray-800 text-lg">1.Crea tu Party</h3>
              <p className="text-gray-500 text-sm mt-1">Elige un evento y genera un código único para tu sala.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
              <span className="text-3xl block mb-2">🤝</span>
              <h3 className="font-bold text-gray-800 text-lg">2.Invita amigos</h3>
              <p className="text-gray-500 text-sm mt-1">Comparte el código para que se unan a la competencia.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl text-center border border-gray-100">
              <span className="text-3xl block mb-2">🎯</span>
              <h3 className="font-bold text-gray-800 text-lg">3.Haz tu pronóstico</h3>
              <p className="text-gray-500 text-sm mt-1">Vota por tus favoritos y suma puntos si aciertas.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">


            <div className="bg-white px-6 py-3">
              <span className="font-semibold">Premios oscar</span>
              <img src="./Oscars.png" alt="" />
            </div>
            <div className="bg-white px-6 py-3">
              <span className="font-semibold">Premios Grammy</span>
              <img src="./Grammy.webp" alt="" />
            </div>
            <div className="bg-white px-6 py-3">
              <span className="font-semibold">Premios putos</span>
              <img src="./Mati.png" alt="" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">


          </div>


        </div>
      </main>


    </div>
  )
}