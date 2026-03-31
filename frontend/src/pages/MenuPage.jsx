import React, { useState, useEffect } from 'react'
import { MealCard } from '../components/MealCard'
import { menuApi } from '../api'

const FALLBACK_MEALS = [
    { id: 1, name: 'Gourmet Burger', price: '15.99', category: { name: 'Burgers' }, description: 'Juicy beef patty with premium toppings.', image: null },
    { id: 2, name: 'Margherita Pizza', price: '18.50', category: { name: 'Pizza' }, description: 'Fresh basil and mozzarella.', image: null },
    { id: 3, name: 'Creamy Pasta', price: '14.50', category: { name: 'Pasta' }, description: 'Hand-made pasta with white sauce.', image: null },
    { id: 4, name: 'Fresh Sushi', price: '22.00', category: { name: 'Sushi' }, description: 'Premium selection of fresh fish.', image: null },
]

const CATEGORY_IMAGES = {
    'Burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    'Pizza':   'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    'Pasta':   'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80',
    'Sushi':   'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80',
    'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
}

export function getMealImage(meal) {
    if (meal.image) {
        // If already a full URL (Unsplash etc), use as-is
        if (meal.image.startsWith('http')) return meal.image
        // Otherwise prefix with Django origin
        return `http://127.0.0.1:8000${meal.image}`
    }
    const catName = meal.category?.name || ''
    return CATEGORY_IMAGES[catName] || CATEGORY_IMAGES['default']
}

export const MenuPage = ({ onAddToCart }) => {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('All')
    const [categories, setCategories] = useState(['All'])

    useEffect(() => {
        menuApi.getMeals()
            .then(data => {
                const list = data.results ?? data   // handle paginated or plain
                setMeals(list)
                const cats = ['All', ...new Set(list.map(m => m.category?.name).filter(Boolean))]
                setCategories(cats)
            })
            .catch(() => {
                // API unavailable — use static fallback data
                setMeals(FALLBACK_MEALS)
                setCategories(['All', 'Burgers', 'Pizza', 'Pasta', 'Sushi'])
            })
            .finally(() => setLoading(false))
    }, [])

    const filteredMeals = activeCategory === 'All'
        ? meals
        : meals.filter(m => m.category?.name === activeCategory)

    if (loading) return <div className="loading-screen">Loading menu...</div>

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
                    <MealCard key={meal.id} meal={meal} onAdd={onAddToCart} getImage={getMealImage} />
                ))}
            </div>

            {filteredMeals.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    No meals found in this category.
                </div>
            )}

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
        .text-primary { color: var(--primary); }
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
