
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between border-b border-gray-200">
        
        <div className="text-2xl font-black text-orange-500 tracking-tight">
          QuienSera<span className="text-gray-800">Ganador</span>
        </div>

        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
          
          <img 
            src="https://ui-avatars.com/api/?name=Eber+Sotelo&background=6366f1&color=fff" 
            alt="Avatar" 
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
          />
          
          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-gray-800 leading-none">Eber Sotelo</p>
            <p className="text-xs text-gray-500 mt-1">Informacion</p>
          </div>

          <span className="text-gray-400 text-xs ml-1">▼</span>

        </button>
        
      </header>
    
      <main className="p-8">
      <div className="bg-gray-200 px-6 py-3 rounded-lg flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-800">Como jugar? </h1>
        <p className="text-gray-600 mt-2">Crea con tus amigos una party y apuesten quienes seran los ganadores de las sigueintes competiciones </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white px-6 py-3">
            <span>Premios oscar</span>
              <img src="./Oscars.png" alt="" />
          </div>
          <div className="bg-white px-6 py-3">
            <span>Premios Grammy</span>
              <img src="./Grammy.webp" alt="" />
          </div>
          <div className="bg-white px-6 py-3">
            <span>Premios putos</span>
            <img src="./Mati.png" alt="" />
          </div>
        </div>

      </div>
      </main>

    </div>
  )
}