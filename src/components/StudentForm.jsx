import { useState, useEffect } from 'react'
import { apiFetch } from '../api'

const EMPTY = { full_name: '', marks: '', fee_paid: '' }

export default function StudentForm({ onSaved, editStudent, onEditDone }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (editStudent) {
      setForm({
        full_name: editStudent.full_name,
        marks: String(editStudent.marks),
        fee_paid: editStudent.fee_paid ? 'yes' : 'no',
      })
    }
  }, [editStudent])

  function validate() {
    if (!form.full_name.trim()) { alert('Please fill in Full Name.'); return false }
    if (!form.marks) { alert('Please fill in Marks.'); return false }
    const m = Number(form.marks)
    if (!Number.isInteger(m) || m < 1 || m > 100) { alert('Marks must be a number between 1 and 100.'); return false }
    if (form.fee_paid === '') { alert('Please select Fee Paid.'); return false }
    return true
  }

  async function handleSubmit() {
    if (!validate()) return
    const payload = { full_name: form.full_name.trim(), marks: Number(form.marks), fee_paid: form.fee_paid === 'yes' }
    const url = editStudent ? `/students/${editStudent.id}` : '/students'
    const method = editStudent ? 'PUT' : 'POST'
    const res = await apiFetch(url, { method, body: JSON.stringify(payload) })
    if (res.ok) {
      setForm(EMPTY)
      onEditDone && onEditDone()
      onSaved()
    }
  }

  return (
    <div className="formDiv">
      <table className="form-spacing">
        <tbody>
          <tr>
            <td className="cell-one">Passing Marks:</td>
            <td className="cell-two">60/100</td>
          </tr>
          <tr>
            <td className="cell-one">* Full Name:</td>
            <td className="cell-two">
              <input className="big-field" type="text" value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} />
            </td>
          </tr>
          <tr>
            <td className="cell-one">* Marks:</td>
            <td className="cell-two">
              <input className="big-field" type="text" value={form.marks} onChange={e => setForm(p => ({ ...p, marks: e.target.value }))} />
            </td>
          </tr>
          <tr>
            <td valign="top" className="cell-one">Fee Paid:</td>
            <td className="two-cells">
              <input type="radio" name="fee" className="none" checked={form.fee_paid === 'yes'} onChange={() => setForm(p => ({ ...p, fee_paid: 'yes' }))} />Yes
              <input type="radio" name="fee" className="none" checked={form.fee_paid === 'no'} onChange={() => setForm(p => ({ ...p, fee_paid: 'no' }))} />No
            </td>
          </tr>
          <tr>
            <td className="cell-one"></td>
            <td className="cell-two">
              <input className="standardButton" type="button" value="Submit Data" onClick={handleSubmit} />
              {editStudent && (
                <input className="standardButton" type="button" value="Cancel" onClick={() => { setForm(EMPTY); onEditDone && onEditDone() }} style={{ marginLeft: 6 }} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
