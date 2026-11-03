import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './startScreen/App.tsx'
import Create from './createScreen/createScreen.tsx'
import Join from './joinScreen/Join.tsx'
import MyParties from './myPartiesScreen/MyParties.tsx'
import NotFound from './notFoundScreen/NotFound.tsx'
import Party from './partyScreen/Party.tsx'
import Predict from './partyScreen/Predict.tsx'
import Results from './partyScreen/Results.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create' element={<Create />} />
        <Route path='/join' element={<Join />} />
        <Route path='/join/:code' element={<Join />} />
        <Route path='/parties' element={<MyParties />} />
        <Route path='/party/:code' element={<Party />} />
        <Route path='/party/:code/predict' element={<Predict />} />
        <Route path='/party/:code/results' element={<Results />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
