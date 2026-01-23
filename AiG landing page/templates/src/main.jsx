import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import GlobalVolunteer from './GlobalVolunteer.jsx'
import GlobalTalent from './GlobalTalent.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/global-volunteer" element={<GlobalVolunteer />} />
      <Route path="/global-talent" element={<GlobalTalent />} />
    </Routes>
  </BrowserRouter>
)
