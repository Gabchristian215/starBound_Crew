import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty">
      <h1>Lost in space</h1>
      <p>This page drifted out of range.</p>
      <Link to="/" className="btn">Return home</Link>
    </div>
  )
}
