# Food Ordering API

This project is a Django-based API for a food ordering platform. It provides endpoints for user registration, authentication (JWT), viewing restaurants and menus, placing orders, and contacting پشتیبانی.

## Project Setup

1. **Virtual Environment**:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On Linux/macOS
   ```

2. **Install Dependencies**:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

3. **Migrations**:
   ```bash
   python manage.py migrate
   ```

4. **Run Server**:
   ```bash
   python manage.py runserver
   ```

## Authentication

The API uses **JWT (JSON Web Token)** for authentication.

- **Login**: `POST /api/token/` with `username` and `password`. Returns `access` and `refresh` tokens.
- **Authorize**: For protected endpoints, include the header: `Authorization: Bearer <your_access_token>`.

## API Endpoints

### User & Authentication
- `POST /api/register/`: Register a new user.
- `POST /api/token/`: Obtain access and refresh tokens (Login).
- `POST /api/token/refresh/`: Refresh an expired access token.

### Restaurants
- `GET /api/restaurants/`: List all restaurants.
- `GET /api/restaurants/{id}/`: Get detailed information about a specific restaurant.

### Meals
- `GET /api/meals/`: List all available meals.
- `GET /api/meals/?restaurant={id}`: Filter meals by restaurant.
- `GET /api/meals/{id}/`: Get detailed information about a specific meal.

### Orders (Authentication Required)
- `GET /api/orders/`: List all orders placed by the current user.
- `POST /api/orders/`: Place a new order.
    - **Payload Example**:
      ```json
      {
        "restaurant_id": 1,
        "items": [
          {"meal_id": 1, "quantity": 2},
          {"meal_id": 2, "quantity": 1}
        ]
      }
      ```
- `GET /api/orders/{id}/`: Get details of a specific order.

### Contact
- `POST /api/contact/`: Send a message to the support team.
- `GET /api/contact/`: View all contact messages.

## Data Models

- **User**: Standard Django user for accounts.
- **Restaurant**: Stores restaurant name, address, phone, and description.
- **Category**: Meal categories (e.g., Pizza, Burgers).
- **Meal**: Individual food items linked to a restaurant and category.
- **Order**: Stores order status, total price, and the user who placed it.
- **OrderItem**: Link between orders and specific meals with quantities.
- **ContactMessage**: Stores support messages from users.
