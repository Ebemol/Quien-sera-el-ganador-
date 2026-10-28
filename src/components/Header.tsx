
import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate();
    return( <header className="sticky top-0  bg-white shadow-sm px-6 py-3 flex items-center justify-between border-b border-gray-200">

        <button
          onClick={() => navigate('/')}
          className="text-3xl font-black text-orange-500 tracking-tight">
          QuienSera<span className="text-gray-800">Ganador</span>
        </button>

        <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">

          <img
            src="https://ui-avatars.com/api/?name=Eber+Sotelo&background=6366f1&color=fff"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
          />

          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-gray-800 leading-none">Ebemol</p>
            <p className="text-xs text-gray-500 mt-1">Informacion</p>
          </div>

          <span className="text-gray-400 text-xs ml-1">▼</span>

        </button>

      </header>)
}