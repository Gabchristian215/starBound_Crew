import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import { CATEGORIES, formatDate, powerLevel } from '../lib/crew.js'
import { getCrewmate } from '../lib/store.js'

const SPEED_NOTES = {
  Slow: 'Prefers to double-check everything before moving.',
  Steady: 'Reliable pace, never the first or last to arrive.',
  Fast: 'Usually halfway down the corridor before the alarm finishes.',
  Warp: 'Has been clocked outrunning the ship’s own announcements.',
}

export default function CrewmateDetail() {
  const { id } = useParams()
  const [mate, setMate] = useState(undefined)
  const [error, setError] = useState('')

  useEffect(() => {
    getCrewmate(id).then(setMate).catch((e) => setError(e.message))
  }, [id])

  if (error) return <p className="error">{error}</p>
  if (mate === undefined) return <p className="hint">Loading…</p>
  if (mate === null) return <NotFoundMate />

  const role = CATEGORIES[mate.category]
  const power = powerLevel(mate)

  return (
    <section className="detail">
      <header className="page-head">
        <Avatar color={mate.color} size={140} />
        <div>
          <h1>{mate.name}</h1>
          <p className="role-tag">{role?.icon} {mate.category} · {mate.specialty}</p>
          <p>{role?.blurb}</p>
        </div>
      </header>

      <div className="detail-grid">
        <div className="stat-card">
          <h4>Profile</h4>
          <dl>
            <dt>Suit color</dt><dd>{mate.color}</dd>
            <dt>Specialty</dt><dd>{mate.specialty}</dd>
            <dt>Speed</dt><dd>{mate.speed}</dd>
            <dt>Recruited</dt><dd>{formatDate(mate.created_at)}</dd>
            <dt>Crew ID</dt><dd className="mono">{mate.id.slice(0, 8)}</dd>
          </dl>
        </div>
        <div className="stat-card">
          <h4>Field report</h4>
          <p>{SPEED_NOTES[mate.speed]}</p>
          <div className="bar-row">
            <span>Power level</span>
            <div className="bar"><div style={{ width: `${Math.min(power, 100)}%` }} /></div>
            <span className="num">{power}</span>
          </div>
          <p className="hint">
            {mate.speed === 'Slow' || mate.speed === 'Steady'
              ? 'Tip: a faster crewmate raises your mission success score.'
              : `A ${mate.speed.toLowerCase()} ${mate.category.toLowerCase()} gives the mission a real boost.`}
          </p>
        </div>
      </div>

      <div className="form-actions">
        <Link to={`/crewmate/${mate.id}/edit`} className="btn primary">Edit crewmate</Link>
        <Link to="/crew" className="btn">Back to roster</Link>
      </div>
    </section>
  )
}

export function NotFoundMate() {
  return (
    <div className="empty">
      <p>That crewmate isn&rsquo;t aboard this ship.</p>
      <Link to="/crew" className="btn">Back to roster</Link>
    </div>
  )
}
