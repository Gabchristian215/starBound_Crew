import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import CrewmateForm from '../components/CrewmateForm.jsx'
import { NotFoundMate } from './CrewmateDetail.jsx'
import { deleteCrewmate, getCrewmate, updateCrewmate } from '../lib/store.js'

export default function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(undefined)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getCrewmate(id).then(setForm).catch((e) => setError(e.message))
  }, [id])

  if (error && form === undefined) return <p className="error">{error}</p>
  if (form === undefined) return <p className="hint">Loading…</p>
  if (form === null) return <NotFoundMate />

  async function handleUpdate() {
    setBusy(true)
    setError('')
    try {
      const updated = await updateCrewmate(id, form)
      setForm(updated) // form now reflects the saved values
      setSaved(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Remove ${form.name} from the crew? This can't be undone.`)) return
    setBusy(true)
    try {
      await deleteCrewmate(id)
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
          <h1>Edit {form.name || 'crewmate'}</h1>
          <p>Changing the role clears any attributes the new role doesn&rsquo;t allow.</p>
        </div>
      </header>
      {error && <p className="error">{error}</p>}
      {saved && <p className="success">Saved! Changes are live on the roster.</p>}
      <CrewmateForm
        form={form}
        setForm={(f) => { setSaved(false); setForm(f) }}
        onSubmit={handleUpdate}
        submitLabel="Update crewmate"
        busy={busy}
      >
        <Link to={`/crewmate/${id}`} className="btn">View profile</Link>
        <button type="button" className="btn danger" onClick={handleDelete} disabled={busy}>
          Delete crewmate
        </button>
      </CrewmateForm>
    </section>
  )
}
