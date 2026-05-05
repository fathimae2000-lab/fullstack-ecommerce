import React, { useState } from 'react'
import './signup.scss'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Signup successful')
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/checkout')
      } else {
        alert(data.message || 'Signup failed')
      }

    } catch (err) {
      console.log(err)
      alert('Server error')
    }
  }

  return (
    <div className="signup-container container-fluid">

      <div className="row justify-content-center align-items-center min-vh-100">

        <div className="col-11 col-sm-8 col-md-6 col-lg-4">

          <div className="signup-box">

            <h2 className="text-center">Create Account</h2>
            <p className="subtitle text-center">Join us today 🚀</p>

            <form onSubmit={handleSignup}>

              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control custom-input"
                  placeholder="Full Name"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control custom-input"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control custom-input"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  className="form-control custom-input"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn signup-btn w-100">
                Sign Up
              </button>

            </form>

            <p className="login-link text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Signup