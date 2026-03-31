import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children, onPageChange, currentPage, user, onLogout, cartCount, onCartClick }) => {
  return (
    <div className="layout-container">
      <Navbar
        onPageChange={onPageChange}
        currentPage={currentPage}
        user={user}
        onLogout={onLogout}
        cartCount={cartCount}
        onCartClick={onCartClick}
      />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer-glass glass">
        <p>&copy; 2026 FoodDash. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .layout-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
          padding-top: 80px; /* space for fixed navbar */
        }
        .footer-glass {
          padding: 2rem;
          text-align: center;
          margin-top: 4rem;
          border-top: 1px solid var(--border);
        }
      `}</style>
    </div>
  )
}
