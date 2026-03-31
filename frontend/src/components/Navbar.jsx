import React from 'react'
import { Utensils, ShoppingCart, User, LogOut } from 'lucide-react'

export const Navbar = ({ onPageChange, currentPage, user, onLogout, cartCount = 0, onCartClick }) => {
  return (
    <nav className="navbar glass">
      <div className="nav-brand" onClick={() => onPageChange('menu')}>
        <Utensils className="logo-icon" size={32} />
        <span className="brand-name">FoodDash</span>
      </div>

      <div className="nav-links">
        <button
          onClick={() => onPageChange('menu')}
          className={`nav-link-btn ${currentPage === 'menu' ? 'active' : ''}`}
        >
          Menu
        </button>
        <button
          onClick={() => onPageChange('contact')}
          className={`nav-link-btn ${currentPage === 'contact' ? 'active' : ''}`}
        >
          Contact
        </button>
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="user-profile">
            <button className="user-name-btn" onClick={() => onPageChange('profile')} title="View Profile">
              <User size={18} />
              <span className="user-name">Hi, {user.first_name || user.username || 'User'}</span>
            </button>
            <button className="icon-btn" onClick={onLogout} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div className="auth-btns">
            <button onClick={() => onPageChange('signup')} className="signup-link-btn">Sign Up</button>
            <button onClick={() => onPageChange('login')} className="btn-primary login-btn">Login</button>
          </div>
        )}

        <button className="icon-btn cart-toggle" onClick={onCartClick}>
          <ShoppingCart size={24} />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4rem;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: var(--glass);
          backdrop-filter: blur(10px);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
        }

        .logo-icon { color: var(--primary); }
        .brand-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.5px;
        }

        .nav-links { display: flex; gap: 1.5rem; }
        .nav-link-btn {
          background: none;
          border: none;
          color: var(--text);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
          padding: 5px 0;
        }

        .nav-link-btn:hover, .nav-link-btn.active { color: var(--primary); }
        .nav-link-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary);
          border-radius: 2px;
        }

        .nav-actions { display: flex; align-items: center; gap: 1.5rem; }
        
        .auth-btns { display: flex; align-items: center; gap: 1rem; }
        .signup-link-btn {
          background: none;
          font-weight: 700;
          color: var(--text);
        }
        .login-btn {
          padding: 8px 24px;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .user-name-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 77, 0, 0.05);
          border: 1px solid rgba(255, 77, 0, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
          color: var(--primary);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .user-name-btn:hover {
          background: rgba(255, 77, 0, 0.15);
        }
        .user-name { font-weight: 700; color: var(--primary); }

        .icon-btn {
          background: none;
          color: var(--text);
          position: relative;
          padding: 8px;
          border-radius: 50%;
        }
        .icon-btn:hover { background: rgba(255, 77, 0, 0.1); color: var(--primary); }
        
        .badge {
          position: absolute;
          top: -2px;
          right: -2px;
          background: var(--primary);
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 700;
          border: 2px solid var(--background);
        }

        @media (max-width: 768px) {
          .navbar { padding: 0 1.5rem; }
          .nav-links { display: none; }
          .user-name { display: none; }
        }
      `}</style>
    </nav>
  )
}
