import React, { useState } from 'react'
import { User, Mail, Lock, Phone, ArrowRight, Github, ArrowLeft } from 'lucide-react'

import { authApi } from '../api'

export const SignupPage = ({ onSignup, onNavigateToLogin, onHome }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authApi.register(formData)
      // Automatically login after signup
      const loginData = await authApi.login({ email: formData.email, password: formData.password })
      onSignup({ ...loginData, name: formData.name })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-image-side">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Vibrant Food" />
          <div className="image-overlay">
            <div className="overlay-content">
              <h1>Join FoodDash Today</h1>
              <p>Discover the best meals from local favorites delivered right to your door.</p>
              <div className="overlay-stats">
                <div className="stat">
                  <strong>500+</strong>
                  <span>Restaurants</span>
                </div>
                <div className="stat">
                  <strong>30min</strong>
                  <span>Avg Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="signup-form-side">
          <div className="form-container">
            <button className="back-home-btn" onClick={onHome} aria-label="Back to Home">
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </button>
            <div className="signup-header">
              <h2>Create New Account</h2>
              <p>Fill in the details below to get started</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="signup-form">
              <div className="floating-group">
                <input
                  type="text"
                  name="name"
                  required
                  disabled={loading}
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label><User size={16} /> Full Name</label>
              </div>

              <div className="floating-group">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={loading}
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label><Mail size={16} /> Email Address</label>
              </div>

              <div className="floating-group">
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled={loading}
                  placeholder=" "
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <label><Phone size={16} /> Phone Number</label>
              </div>

              <div className="floating-group">
                <input
                  type="password"
                  name="password"
                  required
                  disabled={loading}
                  placeholder=" "
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <label><Lock size={16} /> Password</label>
              </div>

              <p className="terms-text">
                By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </p>

              <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={20} />
              </button>
            </form>

            <div className="login-link">
              Already have an account? <button onClick={onNavigateToLogin} className="link-btn">Sign In</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-page {
          position: fixed;
          inset: 0;
          background: white;
          z-index: 3000;
        }

        .signup-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          height: 100vh;
        }

        .signup-image-side {
          position: relative;
          overflow: hidden;
        }

        .signup-image-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: flex-end;
          padding: 4rem;
          color: white;
        }

        .overlay-content h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .overlay-content p {
          font-size: 1.2rem;
          opacity: 0.9;
          max-width: 450px;
          margin-bottom: 2.5rem;
        }

        .overlay-stats {
          display: flex;
          gap: 3rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat strong {
          font-size: 2rem;
          color: var(--primary);
        }

        .stat span {
          font-size: 0.9rem;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .signup-form-side {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 4rem 2rem;
          background: var(--surface);
          overflow-y: auto;
        }

        .form-container {
          width: 100%;
          max-width: 450px;
          position: relative;
          margin: auto 0;
        }

        .back-home-btn {
          position: absolute;
          top: -2.5rem;
          left: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          color: var(--text-muted);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
          border: 1px solid var(--border);
        }

        .back-home-btn:hover {
          background: white;
          color: var(--primary);
        }

        .signup-header {
          margin-bottom: 3rem;
        }

        .signup-header h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: var(--text);
        }

        .signup-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Floating Label Styles */
        .floating-group {
          position: relative;
        }

        .floating-group input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: white;
          font-family: inherit;
          font-size: 1rem;
          color: var(--text);
          transition: all 0.2s;
        }

        .floating-group label {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          pointer-events: none;
          transition: all 0.2s;
          background: white;
          padding: 0 4px;
        }

        .floating-group input:focus,
        .floating-group input:not(:placeholder-shown) {
          border-color: var(--primary);
          outline: none;
        }

        .floating-group input:focus + label,
        .floating-group input:not(:placeholder-shown) + label {
          top: 0;
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 700;
        }

        .terms-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .terms-text a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }

        .submit-btn {
          padding: 16px;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .login-link {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-muted);
        }

        .link-btn {
          background: none;
          color: var(--primary);
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .signup-container { grid-template-columns: 1fr; }
          .signup-image-side { display: none; }
          .signup-form-side { padding: 2rem; }
        }
      `}</style>
    </div>
  )
}
