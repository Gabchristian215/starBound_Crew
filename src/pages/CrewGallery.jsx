import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import Stats from '../components/Stats.jsx'
import { CATEGORIES, missionSuccess } from '../lib/crew.js'
import { listCrewmates } from '../lib/store.js'

export default function CrewGallery() {
  const [crew, setCrew] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listCrewmates().then(setCrew).catch((e) => setError(e.message))
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!crew) return <p className="hint">Loading crew…</p>

  const { tier } = missionSuccess(crew)

  return (
    <section>
      <header className="page-head">
        <div>
          <h1>Crew roster</h1>
          <p>{crew.length} crewmate{crew.length === 1 ? '' : 's'}, newest first.</p>
        </div>
      </header>

      <Stats crew={crew} />

      {crew.length === 0 ? (
        <div className="empty">
          <p>Your ship is empty.</p>
          <Link to="/create" className="btn primary">Recruit your first crewmate</Link>
        </div>
      ) : (
        <ul className={`crew-grid tier-${tier}`}>
          {crew.map((m) => (
            <li key={m.id} className="crew-card">
              <Link to={`/crewmate/${m.id}`} className="crew-card-link">
                <Avatar color={m.color} size={84} />
                <h3>{m.name}</h3>
                <p className="role-tag">{CATEGORIES[m.category]?.icon} {m.category}</p>
                <dl>
                  <dt>Color</dt><dd>{m.color}</dd>
                  <dt>Specialty</dt><dd>{m.specialty}</dd>
                  <dt>Speed</dt><dd>{m.speed}</dd>
                </dl>
              </Link>
              <Link to={`/crewmate/${m.id}/edit`} className="btn small">Edit</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
