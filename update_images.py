import os
import django
import urllib.request
from django.core.files import File
from tempfile import NamedTemporaryFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'food_ordering_project.settings')
django.setup()

from api.models import Meal

# Generated images mappings (Meal name -> local generated image name)
# We will find the actual file in the brain directory
brain_dir = r"C:\Users\delta computer\.gemini\antigravity\brain\4c3e76c4-a52d-4809-adc1-7647f61fe10a"

generated_map = {
    "BBQ Chicken": "bbq_chicken_meal",
    "Sprite Fanta": "sprite_fanta_drink",
    "Garden Burger": "garden_burger_meal",
    "Choco Heaven": "choco_heaven_drink",
    "Gourmet Pepperoni Pizza": "pepperoni_pizza_meal",
    "Ultimate Wagyu Burger": "wagyu_burger_meal",
}

# Image queries for the rest
download_map = {
    "Truffle Carbonara": "carbonara,pasta",
    "Signature Sushi Platter": "sushi,platter",
    "Espresso": "espresso,coffee",
    "Cappuccino": "cappuccino,coffee",
    "Iced Latte": "iced,latte,coffee",
    "Tiramisu": "tiramisu,dessert",
    "Cheesecake": "cheesecake,dessert",
}

def get_generated_file_path(prefix):
    # Find the exact filename that starts with the prefix in the brain_dir
    if not os.path.exists(brain_dir):
        return None
    for f in os.listdir(brain_dir):
        if f.startswith(prefix) and f.endswith(".png"):
            return os.path.join(brain_dir, f)
    return None

def update_meals():
    meals = Meal.objects.all()
    for meal in meals:
        print(f"Processing {meal.name}...")
        
        # 1. Check if it's in the generated map
        if meal.name in generated_map:
            prefix = generated_map[meal.name]
            file_path = get_generated_file_path(prefix)
            if file_path:
                print(f"  -> Found local generated image: {file_path}")
                with open(file_path, 'rb') as f:
                    meal.image.save(f"{prefix}.png", File(f), save=True)
            else:
                print(f"  -> ERROR: Local generated image for {prefix} not found!")
                
        # 2. Check if it's in the download map
        elif meal.name in download_map:
            query = download_map[meal.name]
            url = f"https://loremflickr.com/800/600/{query}/all"
            print(f"  -> Downloading from {url}")
            try:
                # Use a temp file to download the image
                img_temp = NamedTemporaryFile(delete=True)
                
                # add user agent to avoid 403
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as response:
                    img_temp.write(response.read())
                
                img_temp.flush()
                file_name = f"{meal.name.replace(' ', '_').lower()}.jpg"
                meal.image.save(file_name, File(img_temp), save=True)
            except Exception as e:
                print(f"  -> ERROR downloading {meal.name}: {e}")
        else:
            print(f"  -> WARNING: No image mapping found for {meal.name}")

if __name__ == "__main__":
    update_meals()
    print("Done!")
