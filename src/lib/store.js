// Data layer. Uses Supabase when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set,
// otherwise falls back to localStorage so the app works with no setup.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = url && key ? createClient(url, key) : null

export const backend = supabase ? 'Supabase' : 'localStorage'

const TABLE = 'crewmates'
const LS_KEY = 'starbound-crew'

const readLocal = () => JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
const writeLocal = (rows) => localStorage.setItem(LS_KEY, JSON.stringify(rows))
const newestFirst = (a, b) => new Date(b.created_at) - new Date(a.created_at)

const pick = ({ name, category, color, specialty, speed }) => ({ name: name.trim(), category, color, specialty, speed })

export async function listCrewmates() {
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  }
  return readLocal().sort(newestFirst)
}

export async function getCrewmate(id) {
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data
  }
  return readLocal().find((m) => m.id === id) ?? null
}

export async function createCrewmate(values) {
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).insert(pick(values)).select().single()
    if (error) throw error
    return data
  }
  const row = { id: crypto.randomUUID(), created_at: new Date().toISOString(), ...pick(values) }
  writeLocal([...readLocal(), row])
  return row
}

export async function updateCrewmate(id, values) {
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).update(pick(values)).eq('id', id).select().single()
    if (error) throw error
    return data
  }
  let updated = null
  writeLocal(readLocal().map((m) => (m.id === id ? (updated = { ...m, ...pick(values) }) : m)))
  return updated
}

export async function deleteCrewmate(id) {
  if (supabase) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw error
    return
  }
  writeLocal(readLocal().filter((m) => m.id !== id))
}
