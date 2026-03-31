import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'food_ordering_project.settings')
django.setup()

from api.models import Restaurant, Category, Meal
from decimal import Decimal

def populate():
    # Create a restaurant
    restaurant, _ = Restaurant.objects.get_or_create(
        name="FoodDash Gourmet",
        defaults={
            "description": "Premium gourmet meals delivered to your door.",
            "address": "123 Gourmet St, Food City",
            "phone": "+1 (555) 123-4567"
        }
    )

    # Create categories
    categories = ['Pizza', 'Burgers', 'Pasta', 'Sushi']
    cat_objs = {}
    for cat_name in categories:
        cat, _ = Category.objects.get_or_create(name=cat_name)
        cat_objs[cat_name] = cat

    # Create meals
    meals = [
        {
            "name": 'Gourmet Pepperoni Pizza',
            "description": 'Artisan sourdough crust, premium pepperoni, and fresh mozzarella cheese.',
            "price": Decimal('18.99'),
            "category": 'Pizza'
        },
        {
            "name": 'Ultimate Wagyu Burger',
            "description": 'Juicy Wagyu beef patty with truffle aioli, aged cheddar, and caramelized onions.',
            "price": Decimal('22.50'),
            "category": 'Burgers'
        },
        {
            "name": 'Truffle Carbonara',
            "description": 'Authentic Italian pasta with fresh eggs, pecorino romano, and black truffle.',
            "price": Decimal('24.00'),
            "category": 'Pasta'
        },
        {
            "name": 'Signature Sushi Platter',
            "description": 'A selection of fresh salmon nigiri, spicy tuna rolls, and avocado maki.',
            "price": Decimal('32.00'),
            "category": 'Sushi'
        }
    ]

    for m_data in meals:
        Meal.objects.get_or_create(
            name=m_data['name'],
            restaurant=restaurant,
            defaults={
                "description": m_data['description'],
                "price": m_data['price'],
                "category": cat_objs[m_data['category']],
                "is_available": True
            }
        )

    print("Database populated successfully!")

if __name__ == "__main__":
    populate()
