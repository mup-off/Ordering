import React, { useState } from 'react'
import { MapPin, Phone, CreditCard, ChevronRight, User } from 'lucide-react'

export const CheckoutPage = ({ cartItems, onPlaceOrder, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        notes: ''
    })

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add items before placing an order.')
            return
        }
        // Simple validation
        if (formData.phone.length < 10) {
            alert('Please enter a valid phone number')
            return
        }
        onPlaceOrder(formData)
    }

    return (
        <div className="checkout-page">
            <div className="checkout-content">
                <div className="checkout-form-section card">
                    <div className="section-header">
                        <h2>Delivery Details</h2>
                        <p>Complete your information to place the order.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label><User size={18} /> Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label><Phone size={18} /> Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="0912 345 6789"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label><MapPin size={18} /> City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    placeholder="Tehran"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label><MapPin size={18} /> Delivery Address</label>
                            <textarea
                                name="address"
                                required
                                placeholder="Street, Building, Apartment No."
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Special Instructions (Optional)</label>
                            <textarea
                                name="notes"
                                placeholder="e.g. Please ring the bell twice"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="payment-method">
                            <h3>Payment Method</h3>
                            <div className="payment-option selected">
                                <CreditCard size={20} />
                                <span>Cash on Delivery</span>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary submit-btn" disabled={cartItems.length === 0}>
                            Place Order <ChevronRight size={20} />
                        </button>
                    </form>
                </div>

                <div className="order-summary-section">
                    <div className="card summary-card">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {cartItems.map((item, idx) => (
                                <div key={idx} className="summary-item">
                                    <span>{item.name}</span>
                                    <span>${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-footer">
                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>
                    </div>
                    <button className="back-btn" onClick={onBack}>← Back to Menu</button>
                </div>
            </div>

            <style jsx>{`
        .checkout-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .checkout-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 2rem;
          align-items: flex-start;
        }
        .checkout-form-section {
          padding: 2.5rem;
        }
        .section-header { margin-bottom: 2rem; }
        .section-header h2 { font-size: 2rem; margin-bottom: 0.5rem; }
        .section-header p { color: var(--text-muted); }

        .checkout-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-group label { display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--text); }
        
        input, textarea {
          padding: 12px 16px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary);
        }
        textarea { min-height: 100px; resize: vertical; }

        .payment-method { margin-top: 1rem; }
        .payment-method h3 { margin-bottom: 1rem; }
        .payment-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 2px solid var(--primary);
          border-radius: var(--radius);
          background: rgba(255, 77, 0, 0.05);
          color: var(--primary);
          font-weight: 700;
        }

        .submit-btn {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 1.1rem;
        }

        .summary-card { padding: 2rem; }
        .summary-items { margin-bottom: 1.5rem; }
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
          color: var(--text-muted);
        }
        .summary-footer { border-top: 1px solid var(--border); padding-top: 1.5rem; }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
        }
        .summary-row.total {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text);
          margin-top: 1rem;
        }

        .back-btn {
          background: none;
          color: var(--text-muted);
          margin-top: 1rem;
          font-weight: 600;
        }
        .back-btn:hover { color: var(--primary); }

        @media (max-width: 900px) {
          .checkout-content { grid-template-columns: 1fr; }
          .checkout-form-section { padding: 1.5rem; }
        }
      `}</style>
        </div>
    )
}
