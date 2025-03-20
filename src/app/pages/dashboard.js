import React from 'react'
import PatientCard from '../components/PatientCard'

const Dashboard = () => {
  return (
    <div>
      <h1>Панель управління</h1>
      <PatientCard name="Іван Петренко" age={30} diagnosis="Грип" status="Хворий" />
    </div>
  )
}

export default Dashboard
