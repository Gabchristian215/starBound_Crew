import { CATEGORIES, CATEGORY_NAMES, COLORS, colorHex, crewStats, missionSuccess } from '../lib/crew.js'

export default function Stats({ crew }) {
  const stats = crewStats(crew)
  const success = missionSuccess(crew)

  return (
    <section className="stats">
      <div className={`success-card tier-${success.tier}`}>
        <div className="success-score">{success.score}%</div>
        <div>
          <h3>Mission success: {success.label}</h3>
          <p>{success.message}</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <h4>Roles</h4>
          {CATEGORY_NAMES.map((c) => {
            const n = stats.byCategory[c] ?? 0
            return (
              <div className="bar-row" key={c}>
                <span>{CATEGORIES[c].icon} {c}</span>
                <div className="bar"><div style={{ width: `${stats.pct(n)}%` }} /></div>
                <span className="num">{stats.pct(n)}%</span>
              </div>
            )
          })}
        </div>
        <div className="stat-card">
          <h4>Suit colors</h4>
          {COLORS.filter((c) => stats.byColor[c.name]).map((c) => {
            const n = stats.byColor[c.name]
            return (
              <div className="bar-row" key={c.name}>
                <span><span className="swatch" style={{ background: colorHex(c.name) }} /> {c.name}</span>
                <div className="bar"><div style={{ width: `${stats.pct(n)}%`, background: c.hex }} /></div>
                <span className="num">{stats.pct(n)}%</span>
              </div>
            )
          })}
          {stats.total === 0 && <p className="hint">No data yet.</p>}
        </div>
      </div>
    </section>
  )
}
