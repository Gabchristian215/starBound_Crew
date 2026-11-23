import { CATEGORIES, CATEGORY_NAMES, COLORS, SPEEDS, colorHex, isAllowed, reconcile } from '../lib/crew.js'

function OptionGroup({ label, field, options, form, setForm, render }) {
  return (
    <fieldset className="option-group">
      <legend>{label}</legend>
      {!form.category && <p className="hint">Pick a role first.</p>}
      <div className="options">
        {options.map((value) => {
          const allowed = form.category && isAllowed(form.category, field, value)
          return (
            <button
              type="button"
              key={value}
              className={`option ${form[field] === value ? 'selected' : ''}`}
              disabled={!allowed}
              onClick={() => setForm({ ...form, [field]: value })}
              title={allowed ? value : `Not available for ${form.category || 'this role'}`}
            >
              {render ? render(value) : value}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function CrewmateForm({ form, setForm, onSubmit, submitLabel, busy, children }) {
  const complete = form.name.trim() && form.category && form.color && form.specialty && form.speed
  const specialties = CATEGORY_NAMES.flatMap((c) => CATEGORIES[c].specialties)

  return (
    <form
      className="crew-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (complete && !busy) onSubmit()
      }}
    >
      <label className="field">
        <span>Name</span>
        <input
          value={form.name}
          maxLength={40}
          placeholder="e.g. Nova"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>

      <fieldset className="option-group">
        <legend>Role</legend>
        <div className="options roles">
          {CATEGORY_NAMES.map((c) => (
            <button
              type="button"
              key={c}
              className={`option role ${form.category === c ? 'selected' : ''}`}
              onClick={() => setForm(reconcile({ ...form, category: c }))}
            >
              <span className="role-icon">{CATEGORIES[c].icon}</span>
              <strong>{c}</strong>
              <small>{CATEGORIES[c].blurb}</small>
            </button>
          ))}
        </div>
      </fieldset>

      <OptionGroup
        label="Suit color"
        field="color"
        options={COLORS.map((c) => c.name)}
        form={form}
        setForm={setForm}
        render={(v) => (
          <>
            <span className="swatch" style={{ background: colorHex(v) }} /> {v}
          </>
        )}
      />
      <OptionGroup label="Specialty" field="specialty" options={specialties} form={form} setForm={setForm} />
      <OptionGroup label="Speed" field="speed" options={SPEEDS} form={form} setForm={setForm} />

      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={!complete || busy}>
          {busy ? 'Saving…' : submitLabel}
        </button>
        {children}
      </div>
    </form>
  )
}
