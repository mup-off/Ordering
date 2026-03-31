import React, { useState } from 'react'
import { CheckCircle, Package, ArrowLeft } from 'lucide-react'

export const ConfirmationPage = ({ orderDetails, onHome }) => {
    return (
        <div className="confirmation-page">
            <div className="confirmation-card card glass">
                <div className="success-icon">
                    <CheckCircle size={80} />
                </div>
                <h1>Order Confirmed!</h1>
                <p className="order-id">Your order #FD-{Math.floor(Math.random() * 90000 + 10000)} is on its way.</p>

                <div className="delivery-info">
                    <div className="info-item">
                        <Package size={24} />
                        <div>
                            <h4>Delivery to</h4>
                            <p>{orderDetails.name}</p>
                            <p>{orderDetails.address}, {orderDetails.city}</p>
                        </div>
                    </div>
                </div>

                <div className="animation-container">
                    <div className="car-animation">🚚</div>
                </div>

                <p className="estimated-time">Estimated arrival: <strong>25 - 35 mins</strong></p>

                <button className="btn-primary home-btn" onClick={onHome}>
                    <ArrowLeft size={20} /> Back to Home
                </button>
            </div>

            <style jsx>{`
        .confirmation-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 160px);
          padding: 2rem;
        }
        .confirmation-card {
          max-width: 500px;
          width: 100%;
          text-align: center;
          padding: 4rem 2rem;
          animation: slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .success-icon {
          color: var(--success);
          margin-bottom: 1.5rem;
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        h1 { font-size: 2.2rem; margin-bottom: 0.5rem; }
        .order-id { color: var(--text-muted); margin-bottom: 2rem; }

        .delivery-info {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: left;
          margin-bottom: 2rem;
        }
        .info-item { display: flex; gap: 1rem; color: var(--text); }
        .info-item h4 { margin: 0 0 5px; font-size: 1.1rem; }
        .info-item p { margin: 0; color: var(--text-muted); font-size: 0.95rem; }

        .animation-container {
          margin: 2rem 0;
          font-size: 3rem;
          overflow: hidden;
          position: relative;
          height: 60px;
        }
        .car-animation {
          position: absolute;
          animation: drive 3s infinite linear;
        }
        @keyframes drive {
          from { left: -50px; }
          to { left: 100%; }
        }

        .estimated-time { font-size: 1.1rem; margin-bottom: 2rem; }
        .home-btn { 
          width: 100%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px; 
        }
      `}</style>
        </div>
    )
}
