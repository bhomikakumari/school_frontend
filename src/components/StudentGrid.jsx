import { useState } from 'react'
import { apiFetch } from '../api'

function StatusLabel({ status }) {
  if (status === 'Pass') return <span className="green">Pass</span>
  if (status === 'Fail') return <span className="red">Fail</span>
  return <span className="orange">{status}</span>
}

export default function StudentGrid({ students, onDelete, onEdit }) {
  const [selected, setSelected] = useState([])

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  async function handleDelete() {
    if (!selected.length) { alert('Please select at least one record to delete.'); return }
    if (!confirm(`Delete ${selected.length} record(s)?`)) return
    await apiFetch('/students', { method: 'DELETE', body: JSON.stringify(selected) })
    setSelected([])
    onDelete()
  }

  return (
    <div className="main-grid">
      <input className="standardButton" type="button" value="Delete" onClick={handleDelete} />
      <table className="gridTable" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <td style={{ width: 20 }} className="heading-cell">&nbsp;</td>
            <td className="heading-cell">Full Name</td>
            <td className="heading-cell">Marks</td>
            <td className="heading-cell">Fee Paid</td>
            <td className="heading-cell">Pass/Fail</td>
            <td className="heading-cell">Edit</td>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id} className={i % 2 !== 0 ? 'alternateRowColor' : ''}>
              <td className="grid-cell"><input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} /></td>
              <td className="grid-cell">{s.full_name}</td>
              <td className="grid-cell">{s.marks}</td>
              <td className="grid-cell">{s.fee_paid ? 'Yes' : 'No'}</td>
              <td className="grid-cell"><StatusLabel status={s.status} /></td>
              <td className="grid-cell"><a href="#" onClick={e => { e.preventDefault(); onEdit(s) }}>Edit</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
