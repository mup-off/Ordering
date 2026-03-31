import requests
import json
import random

BASE_URL = "http://127.0.0.1:8000/api"

def test_flow():
    # 1. Register a new user
    username = f"user_{random.randint(1000, 9999)}"
    password = "testpassword123"
    email = f"{username}@example.com"
    
    print(f"--- Registering user: {username} ---")
    reg_data = {
        "username": username,
        "password": password,
        "email": email
    }
    response = requests.post(f"{BASE_URL}/register/", json=reg_data)
    print(f"Register Status: {response.status_code}")
    print(f"Register Response: {response.json()}")

    if response.status_code != 201:
        print("Registration failed. Exiting.")
        return

    # 2. Login to get token
    print(f"\n--- Logging in as: {username} ---")
    login_data = {
        "username": username,
        "password": password
    }
    response = requests.post(f"{BASE_URL}/token/", json=login_data)
    print(f"Login Status: {response.status_code}")
    token_data = response.json()
    
    if response.status_code != 200:
        print("Login failed. Exiting.")
        return

    access_token = token_data['access']
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    print("Login successful! Token obtained.")

    # 3. Fetch Restaurants and Meals to get valid IDs
    print("\n--- Fetching Restaurants ---")
    response = requests.get(f"{BASE_URL}/restaurants/", headers=headers)
    restaurants = response.json()
    if not restaurants:
        print("No restaurants found. Please add a restaurant in admin first.")
        return
    
    restaurant_id = restaurants[0]['id']
    print(f"Using Restaurant ID: {restaurant_id} ({restaurants[0]['name']})")

    print("\n--- Fetching Meals ---")
    response = requests.get(f"{BASE_URL}/meals/", headers=headers, params={"restaurant": restaurant_id})
    meals = response.json()
    if not meals:
        print("No meals found for this restaurant. Please add a meal in admin first.")
        return
    
    meal_id = meals[0]['id']
    print(f"Using Meal ID: {meal_id} ({meals[0]['name']} - ${meals[0]['price']})")

    # 4. Place an Order
    print("\n--- Placing Order ---")
    order_data = {
        "restaurant_id": restaurant_id,
        "items": [
            {
                "meal_id": meal_id,
                "quantity": 2
            }
        ]
    }
    response = requests.post(f"{BASE_URL}/orders/", json=order_data, headers=headers)
    print(f"Order Status: {response.status_code}")
    if response.status_code == 201:
        print("Order placed successfully!")
        print(f"Order Details: {json.dumps(response.json(), indent=2)}")
    else:
        print(f"Order failed: {response.text}")

if __name__ == "__main__":
    try:
        test_flow()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Is 'python manage.py runserver' running?")
