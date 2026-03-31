import React from 'react'
import { Plus } from 'lucide-react'

export const MealCard = ({ meal, onAdd, getImage }) => {
    const imageUrl = getImage ? getImage(meal) : (meal.image ? (meal.image.startsWith('http') ? meal.image : `http://127.0.0.1:8000${meal.image}`) : '/images/placeholder_food.png')
    const categoryName = typeof meal.category === 'object' ? meal.category?.name : meal.category

    return (
        <div className="meal-card card animate-in">
            <div className="meal-image-container">
                <img src={imageUrl} alt={meal.name} className="meal-image" />
                <div className="meal-overlay">
                    <button
                        className="add-btn btn-primary"
                        aria-label="Add to cart"
                        onClick={() => onAdd(meal)}
                    >
                        <Plus size={20} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            <div className="meal-content">
                <div className="meal-header">
                    <h3 className="meal-name">{meal.name}</h3>
                    <span className="meal-price">${meal.price}</span>
                </div>
                <p className="meal-description">{meal.description}</p>
                <div className="meal-footer">
                    <span className="meal-category">{categoryName}</span>
                    <div className="meal-rating">
                        ⭐ 4.8 (120+)
                    </div>
                </div>
            </div>

            <style jsx>{`
        .meal-card {
           display: flex;
           flex-direction: column;
           height: 100%;
        }
        
        .meal-image-container {
           position: relative;
           height: 200px;
           overflow: hidden;
        }

        .meal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .meal-card:hover .meal-image {
          transform: scale(1.1);
        }

        .meal-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .meal-card:hover .meal-overlay {
          opacity: 1;
        }

        .meal-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .meal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.8rem;
        }

        .meal-name {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text);
        }

        .meal-price {
          font-weight: 800;
          color: var(--primary);
          font-size: 1.2rem;
        }

        .meal-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .meal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .meal-category {
          background: var(--surface);
          padding: 4px 12px;
          border-radius: 20px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .meal-rating {
          font-weight: 600;
        }
      `}</style>
        </div>
    )
}
