import os
import django
import requests
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'food_ordering_project.settings')
django.setup()

from api.models import Category, Meal, Restaurant

# Ensure we have a default restaurant
restaurant, _ = Restaurant.objects.get_or_create(name="Default Restaurant", defaults={'address': 'Unknown', 'phone': '000'})

# Get or create categories
coffee_cat, _ = Category.objects.get_or_create(name="Coffee")
burger_cat, _ = Category.objects.get_or_create(name="Burgers")
drinks_cat, _ = Category.objects.get_or_create(name="Drinks")

def save_image_from_url(meal, url, filename):
    print(f"Downloading {filename} for {meal.name}...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            meal.image.save(filename, ContentFile(response.content), save=True)
            print(f"  Success: {filename}")
        else:
            print(f"  Failed: HTTP {response.status_code}")
    except Exception as e:
        print(f"  Error downloading image: {e}")

# COFFEE Category
print("\n--- Processing Coffee ---")
c1, _ = Meal.objects.get_or_create(name="Espresso", restaurant=restaurant, category=coffee_cat, defaults={'price': '3.50', 'description': 'Strong and bold espresso.', 'is_available': True})
save_image_from_url(c1, "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80", "espresso.jpg")

c2, _ = Meal.objects.get_or_create(name="Cappuccino", restaurant=restaurant, category=coffee_cat, defaults={'price': '4.50', 'description': 'Classic Italian cappuccino.', 'is_available': True})
save_image_from_url(c2, "https://images.unsplash.com/photo-1534687941688-192569ff2254?w=800&q=80", "cappuccino.jpg")

c3, _ = Meal.objects.get_or_create(name="Iced Latte", restaurant=restaurant, category=coffee_cat, defaults={'price': '5.00', 'description': 'Refreshing iced coffee.', 'is_available': True})
save_image_from_url(c3, "https://images.unsplash.com/photo-1461023058943-07cb1ce8dbdb?w=800&q=80", "iced_latte.jpg")

# BURGERS Category
print("\n--- Processing Burgers ---")
b1, _ = Meal.objects.get_or_create(name="Classic Cheeseburger", restaurant=restaurant, category=burger_cat, defaults={'price': '8.99', 'description': 'Beef patty with cheese.', 'is_available': True})
save_image_from_url(b1, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", "cheeseburger.jpg")

b2, _ = Meal.objects.get_or_create(name="Double Bacon Burger", restaurant=restaurant, category=burger_cat, defaults={'price': '12.50', 'description': 'Double patty with crispy bacon.', 'is_available': True})
save_image_from_url(b2, "https://images.unsplash.com/photo-1594212691516-ac0a16fb7f00?w=800&q=80", "bacon_burger.jpg")

b3, _ = Meal.objects.get_or_create(name="Spicy Chicken Burger", restaurant=restaurant, category=burger_cat, defaults={'price': '10.50', 'description': 'Crispy chicken with spicy mayo.', 'is_available': True})
save_image_from_url(b3, "https://images.unsplash.com/photo-1615486171430-8488e01dcadd?w=800&q=80", "chicken_burger.jpg")

# DRINKS Category
print("\n--- Processing Drinks ---")
d1, _ = Meal.objects.get_or_create(name="Coca Cola", restaurant=restaurant, category=drinks_cat, defaults={'price': '2.50', 'description': 'Ice cold cola.', 'is_available': True})
save_image_from_url(d1, "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&q=80", "coca_cola.jpg")

d2, _ = Meal.objects.get_or_create(name="Fresh Lemonade", restaurant=restaurant, category=drinks_cat, defaults={'price': '3.99', 'description': 'Freshly squeezed lemons.', 'is_available': True})
save_image_from_url(d2, "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80", "lemonade.jpg")

d3, _ = Meal.objects.get_or_create(name="Strawberry Smoothie", restaurant=restaurant, category=drinks_cat, defaults={'price': '5.50', 'description': 'Blended strawberries with milk.', 'is_available': True})
save_image_from_url(d3, "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=800&q=80", "strawberry_smoothie.jpg")

print("\nSuccessfully updated database images!")
