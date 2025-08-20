import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar__pill">
          <div className="navbar__brand">
            <Link to="/jobs" className="navbar__logo" aria-label="Home">💼</Link>
          </div>
          <nav className="navbar__tabs">
            <NavLink to="/jobs" className={({ isActive }) => `navbar__tab${isActive ? ' is-active' : ''}`}>Home</NavLink>
            <a href="#" className="navbar__tab">Find Talents</a>
            <a href="#" className="navbar__tab">About us</a>
            <a href="#" className="navbar__tab">Testimonials</a>
          </nav>
          <button className="navbar__cta" onClick={() => navigate('/jobs/new')}>Create Jobs</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

