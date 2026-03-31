import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        // In a real app, this would call the API
    }

    return (
        <div className="contact-page">
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>Have questions? We're here to help you with your order.</p>
            </div>

            <div className="contact-container">
                <div className="contact-info card">
                    <div className="info-item">
                        <div className="icon-box"><Phone size={24} /></div>
                        <div>
                            <h3>Call Us</h3>
                            <p>+1 (555) 123-4567</p>
                            <p>Mon - Sun: 9:00 AM - 11:00 PM</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box"><Mail size={24} /></div>
                        <div>
                            <h3>Email Us</h3>
                            <p>support@fooddash.com</p>
                            <p>queries@fooddash.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box"><MapPin size={24} /></div>
                        <div>
                            <h3>Location</h3>
                            <p>123 Gourmet Street, Food City</p>
                            <p>New York, NY 10001</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-section card">
                    {submitted ? (
                        <div className="success-message">
                            <Send size={48} className="send-icon" />
                            <h2>Message Sent!</h2>
                            <p>Our team will get back to you within 24 hours.</p>
                            <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    required
                                    placeholder="How can we help?"
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn-primary">
                                Send Message <Send size={18} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div className="map-section card">
                <div className="map-placeholder">
                    <img src="https://maps.googleapis.com/maps/api/staticmap?center=40.712776,-74.005974&zoom=14&size=1200x400&key=YOUR_API_KEY_HERE" alt="Location Map" className="static-map" />
                    <div className="map-overlay-text">
                        <h3>Find us in the heart of NYC</h3>
                        <p>123 Gourmet Street, New York, NY</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .contact-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 1.5rem;
        }
        .contact-header { text-align: center; margin-bottom: 4rem; }
        .contact-header h1 { font-size: 3rem; margin-bottom: 1rem; }
        .contact-header p { font-size: 1.2rem; color: var(--text-muted); }

        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        .contact-info { padding: 3rem; display: flex; flex-direction: column; gap: 2.5rem; }
        .info-item { display: flex; gap: 1.5rem; }
        .icon-box {
          min-width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 77, 0, 0.1);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info-item h3 { margin: 0 0 5px; font-size: 1.25rem; }
        .info-item p { margin: 0; color: var(--text-muted); line-height: 1.4; }

        .contact-form-section { padding: 3rem; }
        .contact-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-group label { font-weight: 600; }
        input, textarea {
          padding: 12px 16px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-family: inherit;
        }
        input:focus, textarea:focus { outline: none; border-color: var(--primary); }

        .success-message { text-align: center; padding: 2rem; }
        .send-icon { color: var(--success); margin-bottom: 1.5rem; }

        .map-section {
          height: 400px;
          overflow: hidden;
          position: relative;
        }
        .static-map { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.5) contrast(1.2); }
        .map-overlay-text {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          background: var(--background);
          padding: 1.5rem 2rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }

        @media (max-width: 768px) {
          .contact-container { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    )
}
