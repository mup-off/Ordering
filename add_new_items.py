import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'food_ordering_project.settings')
django.setup()

from api.models import Category, Meal, Restaurant

def run():
    # Get any restaurant to attach the meals to
    restaurant = Restaurant.objects.first()
    if not restaurant:
        print("No restaurant found! Creating a default one.")
        restaurant = Restaurant.objects.create(name="Default Restaurant", address="123 Main St", phone="555-0100")

    # Coffee Category
    coffee_cat, _ = Category.objects.get_or_create(name='Coffee')
    
    # Coffee Meals
    Meal.objects.get_or_create(
        name='Espresso',
        defaults={'restaurant': restaurant, 'category': coffee_cat, 'description': 'Strong and bold classic espresso.', 'price': 3.50}
    )
    Meal.objects.get_or_create(
        name='Cappuccino',
        defaults={'restaurant': restaurant, 'category': coffee_cat, 'description': 'Rich espresso with steamed milk foam.', 'price': 4.50}
    )
    Meal.objects.get_or_create(
        name='Iced Latte',
        defaults={'restaurant': restaurant, 'category': coffee_cat, 'description': 'Refreshing espresso over ice and milk.', 'price': 4.99}
    )

    # Desserts Category
    dessert_cat, _ = Category.objects.get_or_create(name='Desserts')

    # Dessert Meals
    Meal.objects.get_or_create(
        name='Tiramisu',
        defaults={'restaurant': restaurant, 'category': dessert_cat, 'description': 'Classic Italian coffee-flavored dessert.', 'price': 6.99}
    )
    Meal.objects.get_or_create(
        name='Cheesecake',
        defaults={'restaurant': restaurant, 'category': dessert_cat, 'description': 'Creamy New York style cheesecake with berry compote.', 'price': 5.99}
    )

    print("Successfully added new categories and meals!")

if __name__ == '__main__':
    run()
