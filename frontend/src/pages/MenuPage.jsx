import React, { useState, useEffect } from 'react'
import { MealCard } from '../components/MealCard'
import { menuApi } from '../api'

export const MenuPage = ({ onAddToCart }) => {
  const [meals] = useState([
    { id: 1, name: 'Gourmet Burger', price: 15.99, category: 'Burgers', description: 'Juicy beef patty with premium toppings.', image: '/images/burger.png' },
    { id: 2, name: 'Margherita Pizza', price: 18.50, category: 'Pizza', description: 'Fresh basil and mozzarella.', image: '/images/pizza.png' },
    { id: 3, name: 'Creamy Pasta', price: 14.50, category: 'Pasta', description: 'Hand-made pasta with white sauce.', image: '/images/pasta.png' },
    { id: 4, name: 'Fresh Sushi', price: 22.00, category: 'Sushi', description: 'Premium selection of fresh fish.', image: '/images/sushi.png' }
  ])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(false)
  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Sushi']


  const filteredMeals = activeCategory === 'All'
    ? meals
    : meals.filter(m => m.category === activeCategory)

  if (loading) return <div className="loading-screen">Menu Loading...</div>

  return (
    <div className="menu-page">
      <header className="menu-header">
        <h1 className="hero-title">Delicious Food, <br /><span className="text-primary">Delivered to You</span></h1>
        <p className="hero-subtitle">Choose from our selected premium restaurants and enjoy gourmet meals at home.</p>
      </header>

      <nav className="category-nav">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="meal-grid">
        {filteredMeals.map(meal => (
          <MealCard key={meal.id} meal={meal} onAdd={onAddToCart} />
        ))}
      </div>
      <style jsx>{`
        .menu-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: var(--text);
        }

        .text-primary {
          color: var(--primary);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .category-nav {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          position: sticky;
          top: 90px;
          z-index: 100;
          padding: 10px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .cat-btn {
          padding: 10px 24px;
          border-radius: 30px;
          background: var(--surface);
          color: var(--text);
          font-weight: 600;
        }

        .cat-btn.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 77, 0, 0.3);
        }

        .meal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .category-nav { 
            overflow-x: auto; 
            justify-content: flex-start;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
