import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import GlobalVolunteer from './GlobalVolunteer.tsx'
import GlobalTalent from './GlobalTalent.tsx'
import GlobalTeacher from './GlobalTeacher.tsx'
import Member from './Member.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/global-volunteer" element={<GlobalVolunteer />} />
      <Route path="/global-talent" element={<GlobalTalent />} />
      <Route path="/global-teacher" element={<GlobalTeacher />} />
      <Route path="/member" element={<Member />} />
    </Routes>
  </BrowserRouter>
)
