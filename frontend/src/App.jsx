import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AddStudent from './components/AddStudent'
import StudentList from './components/StudentList'
import StudentDetails from './components/StudentDetails'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/students" replace />} />
      <Route path="/students" element={<StudentList />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/student/:id" element={<StudentDetails />} />
    </Routes>
  )
}

export default App