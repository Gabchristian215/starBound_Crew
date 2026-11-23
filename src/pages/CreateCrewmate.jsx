import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CrewmateForm from '../components/CrewmateForm.jsx'
import Avatar from '../components/Avatar.jsx'
import { createCrewmate } from '../lib/store.js'

const EMPTY = { name: '', category: '', color: '', specialty: '', speed: '' }

export default function CreateCrewmate() {
  const [form, setForm] = useState(EMPTY)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleCreate() {
    setBusy(true)
    setError('')
    try {
      await createCrewmate(form)
      navigate('/crew')
    } catch (e) {
      setError(e.message)
      setBusy(false)
    }
  }

  return (
    <section>
      <header className="page-head">
        <Avatar color={form.color} size={72} />
        <div>
          <h1>Recruit a crewmate</h1>
          <p>Choose a role first; it decides which colors, specialties and speeds are available.</p>
        </div>
      </header>
      {error && <p className="error">{error}</p>}
      <CrewmateForm form={form} setForm={setForm} onSubmit={handleCreate} submitLabel="Create crewmate" busy={busy} />
    </section>
  )
}
