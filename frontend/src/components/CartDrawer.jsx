import React from 'react'
import { X, ShoppingBag, Trash2 } from 'lucide-react'

export const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onCheckout }) => {
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <div className={`cart-drawer glass ${isOpen ? 'active' : ''}`}>
                <div className="cart-header">
                    <div className="cart-title">
                        <ShoppingBag size={24} />
                        <h2>Your Cart</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                            <button className="btn-primary" onClick={onClose}>Browse Menu</button>
                        </div>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div key={idx} className="cart-item">
                                <img src={item.image} alt={item.name} className="item-img" />
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">${item.price}</p>
                                </div>
                                <button className="remove-btn" onClick={() => onRemove(idx)}><Trash2 size={18} /></button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span className="total-amount">${total}</span>
                        </div>
                        <button className="checkout-btn btn-primary" onClick={onCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
        .cart-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 2000;
        }
        .cart-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: -400px;
          width: 400px;
          height: 100vh;
          background: var(--background);
          z-index: 2001;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
        }
        .cart-drawer.active {
          right: 0;
        }
        .cart-header {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }
        .cart-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
        }
        .cart-title h2 { font-size: 1.5rem; margin: 0; }
        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }
        .item-img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; }
        .item-info { flex: 1; }
        .item-info h4 { margin: 0 0 4px; font-size: 1rem; }
        .item-price { color: var(--primary); font-weight: 700; margin: 0; }
        .remove-btn { background: none; color: var(--text-muted); padding: 4px; }
        .remove-btn:hover { color: var(--error); }
        .cart-footer {
          padding: 2rem;
          border-top: 1px solid var(--border);
          background: var(--surface);
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }
        .total-amount { color: var(--primary); }
        .checkout-btn { width: 100%; }
        .empty-cart { text-align: center; margin-top: 5rem; color: var(--text-muted); }

        @media (max-width: 480px) {
          .cart-drawer { width: 100%; right: -100%; }
        }
      `}</style>
        </>
    )
}
