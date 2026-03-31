import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github } from 'lucide-react'

import { authApi } from '../api'

export const LoginPage = ({ onLogin, onNavigateToSignup }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await authApi.login(formData)
      onLogin(data)
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-background" />

      <div className="login-card-container">
        <div className="login-card card glass">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Log in to order your favorite meals</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  required
                  disabled={loading}
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <button type="button" className="forgot-btn">Forgot Password?</button>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={20} />
            </button>
          </form>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="social-login">
            <button className="social-btn">
              <img src="https://www.google.com/favicon.ico" alt="Google" />
              <span>Google</span>
            </button>
            <button className="social-btn">
              <img src="https://web.facebook.com/favicon.ico" alt="Facebook" />
              <span>Facebook</span>
            </button>
          </div>

          <p className="signup-prompt">
            Don't have an account? <button onClick={onNavigateToSignup} className="link-btn">Create an Account</button>
          </p>
        </div>

        <div className="login-footer">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
        </div>
      </div>

      <style jsx>{`
  .login-page {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
}

        .login-background {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7) blur(5px);
}

        .login-card-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

        .login-card {
  width: 100%;
  padding: 3rem 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
}

        .login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

        .login-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text);
}

        .login-header p {
  color: var(--text-muted);
}

        .login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

        .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

        .label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

        .form-group label {
  font-weight: 600;
  font-size: 0.9rem;
}

        .input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

        .input-icon {
  position: absolute;
  left: 16px;
  color: var(--text-muted);
}

        input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 77, 0, 0.1);
}

        .eye-btn {
  position: absolute;
  right: 16px;
  background: none;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

        .forgot-btn {
  background: none;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 600;
}

        .submit-btn {
  margin-top: 1rem;
  padding: 14px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

        .divider {
  margin: 2rem 0;
  position: relative;
  text-align: center;
}

        .divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: var(--border);
}

        .divider span {
  position: relative;
  background: white;
  padding: 0 15px;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

        .social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

        .social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: white;
  border: 1px solid var(--border);
  font-weight: 600;
  font-size: 0.95rem;
}

        .social-btn:hover {
  background: var(--surface);
  border-color: var(--text-muted);
}

        .social-btn img {
  width: 18px;
}

        .signup-prompt {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.95rem;
}

        .link-btn {
  background: none;
  color: var(--primary);
  font-weight: 700;
}

        .login-footer {
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
}

        .login-footer a {
  text-decoration: none;
  color: white;
  font-size: 0.85rem;
  opacity: 0.8;
}
        
        .login-footer a:hover { opacity: 1; }
      `}</style>
    </div>
  )
}
