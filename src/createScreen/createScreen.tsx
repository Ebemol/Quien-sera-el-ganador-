import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function createScreen(){
    const navigate = useNavigate();
   return (
    <div>
      <Header></Header>
      <main className="bg-gray-100 mx-3">
        <p className="text-2xl  font-semibold py-8 text-start">Crear uan Party</p>

      </main>

    </div>
  );
}