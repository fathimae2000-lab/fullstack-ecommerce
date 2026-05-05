import { useState } from "react";
import "./login.scss";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from || "/"

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      // ✅ fix 1: save real user from API response
      localStorage.setItem("user", JSON.stringify(data.data.user))
      // ✅ fix 2: save token
      localStorage.setItem("token", data.data.token)

      // ✅ fix 3: navigate back to where user came from
      navigate(from)

    } catch (err) {
      alert("Server error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSign = () => {
    navigate('/signup')
  }

  return (
    <div className="login">
      <div className="login-card">
        <h2>Login to your account</h2>
        <p>Welcome back! Please enter your details.</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>

          {/* ✅ fix 4: removed onClick handleLoginSuccess, form onSubmit handles everything */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="signup-text">
          Don't have an account? <span onClick={handleSign}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;