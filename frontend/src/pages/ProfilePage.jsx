import React, { useState, useEffect } from 'react'
import { User, Mail, Calendar, Package, ArrowLeft, LogOut } from 'lucide-react'
import { orderApi } from '../api'

export const ProfilePage = ({ user, onLogout, onHome }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderApi.getOrders()
      .then(data => {
        // Backend returns either an array or { results: [...] } depending on pagination
        const list = data.results ?? data
        // Sort orders descending by created_at (id fallback)
        list.sort((a, b) => b.id - a.id)
        setOrders(list)
      })
      .catch(err => console.error("Failed to load orders", err))
      .finally(() => setLoading(false))
  }, [])

  if (!user) {
    return (
      <div className="profile-page flex-center">
        <p>Please log in to view your profile.</p>
        <button onClick={onHome} className="btn-primary" style={{marginTop: '1rem'}}>Go Home</button>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header container">
        <button className="back-btn" onClick={onHome}>
          <ArrowLeft size={20} />
          <span>Back to Menu</span>
        </button>
        <h1 className="page-title">My Profile</h1>
      </div>

      <div className="profile-content container">
        {/* User Details Card */}
        <div className="profile-card card glass">
          <div className="user-avatar">
            <User size={48} />
          </div>
          <div className="user-info">
            <h2>{user.first_name || user.username || 'User'}</h2>
            <div className="info-row">
              <Mail size={16} />
              <span>{user.email || 'No email provided'}</span>
            </div>
            {user.date_joined && (
              <div className="info-row">
                <Calendar size={16} />
                <span>Joined {new Date(user.date_joined).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          <button className="logout-btn btn-outline" onClick={onLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* Order History Section */}
        <div className="orders-section">
          <h2 className="section-title">
            <Package size={24} />
            Order History
          </h2>

          {loading ? (
            <div className="loading-state">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="empty-state card glass">
              <div className="empty-icon">🍽️</div>
              <h3>No orders yet!</h3>
              <p>Looks like you haven't placed any orders. Discover our delicious menu to get started.</p>
              <button onClick={onHome} className="btn-primary mt-4">Browse Menu</button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card card glass">
                  <div className="order-header">
                    <div>
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>
                    <span className={`order-status status-${order.status?.toLowerCase()}`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="order-items">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <span className="item-qty">{item.quantity}x</span>
                        <span className="item-name">{item.meal_name || `Meal #${item.meal}`}</span>
                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span className="total-label">Total Amount:</span>
                    <span className="total-amount">${parseFloat(order.total_price).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          padding-top: 2rem;
          padding-bottom: 4rem;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .flex-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          color: var(--text);
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: white;
          color: var(--primary);
          border-color: var(--primary);
        }

        .page-title {
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .profile-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .profile-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .user-avatar {
          width: 90px;
          height: 90px;
          background: rgba(255, 77, 0, 0.1);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .user-info h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .info-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .logout-btn {
          margin-top: 2rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .loading-state, .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-muted);
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .mt-4 {
          margin-top: 1rem;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .order-card {
          padding: 1.5rem;
          border-left: 4px solid var(--primary);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .order-id {
          display: block;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text);
          margin-bottom: 0.2rem;
        }

        .order-date {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .order-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: capitalize;
          background: var(--surface);
          color: var(--text-muted);
        }

        .status-pending { background: #fff3cd; color: #856404; }
        .status-completed { background: #d4edda; color: #155724; }
        .status-cancelled { background: #f8d7da; color: #721c24; }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .order-item-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 0.95rem;
        }

        .item-qty {
          font-weight: 700;
          color: var(--primary);
          min-width: 30px;
        }

        .item-name {
          flex: 1;
          color: var(--text);
        }

        .item-price {
          font-weight: 600;
          color: var(--text-muted);
        }

        .order-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px dashed var(--border);
        }

        .total-label {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .total-amount {
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .profile-content {
            grid-template-columns: 1fr;
          }
          .profile-card {
            position: static;
          }
        }
      `}</style>
    </div>
  )
}
