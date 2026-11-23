import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateCrewmate from './pages/CreateCrewmate.jsx'
import CrewGallery from './pages/CrewGallery.jsx'
import CrewmateDetail from './pages/CrewmateDetail.jsx'
import EditCrewmate from './pages/EditCrewmate.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/" className="brand">✦ Starbound Crew</NavLink>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/create">Recruit a Crewmate</NavLink>
          <NavLink to="/crew">Crew Roster</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/crew" element={<CrewGallery />} />
          <Route path="/crewmate/:id" element={<CrewmateDetail />} />
          <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
