import { useState, useEffect } from 'react'
import { apiFetch } from './api'
import StudentForm from './components/StudentForm'
import StudentGrid from './components/StudentGrid'

export default function App() {
  const [students, setStudents] = useState([])
  const [editStudent, setEditStudent] = useState(null)

  async function loadStudents() {
    const res = await apiFetch('/students')
    setStudents(await res.json())
  }

  useEffect(() => { loadStudents() }, [])

  return (
    <>
      <StudentForm
        onSaved={loadStudents}
        editStudent={editStudent}
        onEditDone={() => setEditStudent(null)}
      />
      <StudentGrid
        students={students}
        onDelete={loadStudents}
        onEdit={setEditStudent}
      />
    </>
  )
}
