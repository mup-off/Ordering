from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Restaurant, Category, Meal, Order, OrderItem

class APITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.restaurant = Restaurant.objects.create(
            name="Test Restaurant", address="123 Test St", phone="1234567890"
        )
        self.category = Category.objects.create(name="Main Course")
        self.meal = Meal.objects.create(
            restaurant=self.restaurant, category=self.category,
            name="Test Burger", price="9.99"
        )

    def test_registration_and_token(self):
        # Register user
        register_data = {
            "username": "testuser",
            "password": "testpassword123",
            "email": "test@example.com"
        }
        response = self.client.post('/api/register/', register_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Get token
        token_data = {
            "username": "testuser",
            "password": "testpassword123"
        }
        token_response = self.client.post('/api/token/', token_data)
        self.assertEqual(token_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', token_response.data)

        return token_response.data['access']

    def test_get_restaurants(self):
        response = self.client.get('/api/restaurants/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_meals(self):
        response = self.client.get('/api/meals/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_place_order(self):
        access_token = self.test_registration_and_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)

        order_data = {
            "restaurant_id": self.restaurant.id,
            "items": [
                {
                    "meal_id": self.meal.id,
                    "quantity": 2
                }
            ]
        }
        
        response = self.client.post('/api/orders/', order_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify order total price (9.99 * 2 = 19.98)
        order_id = response.data['id']
        order_response = self.client.get(f'/api/orders/{order_id}/')
        self.assertEqual(float(order_response.data['total_price']), 19.98)
