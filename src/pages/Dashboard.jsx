import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear login data and return to login
    localStorage.removeItem('loginData')
    navigate('/login')
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Dashboard</h1>
      <h5>Welcome — you're logged in</h5>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>You can put your protected content here.</p>
        <button className="btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard