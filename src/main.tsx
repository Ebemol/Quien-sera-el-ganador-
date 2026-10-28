import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './index.css'
import App from './startScreen/App.tsx'
import Create from './createScreen/createScreen.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<App/>}/>
    <Route path='/create' element={<Create/>}/>

   </Routes>
   </BrowserRouter>
  </StrictMode>,
)
