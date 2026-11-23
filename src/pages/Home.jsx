import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import { backend } from '../lib/store.js'

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-avatars">
        <Avatar color="Crimson" size={80} />
        <Avatar color="Cobalt" size={110} />
        <Avatar color="Jade" size={80} />
      </div>
      <h1>Assemble your starship crew</h1>
      <p>Recruit pilots, engineers, medics and scientists, then see whether mission control thinks your crew is ready for launch.</p>
      <div className="hero-actions">
        <Link to="/create" className="btn primary">Recruit a crewmate</Link>
        <Link to="/crew" className="btn">View the roster</Link>
      </div>
      <p className="hint">Data is stored in {backend}.</p>
    </section>
  )
}
