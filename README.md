# 🍔 FoodDash — Food Ordering App

A full-stack food ordering web application with a Django REST API backend and a React/Vite frontend.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Vanilla CSS |
| **Backend** | Django, Django REST Framework |
| **Auth** | JWT (SimpleJWT) |
| **Database** | SQLite (dev) |

---

## 🚀 Getting Started

### 1. Backend (Django API)

```bash
# From the root of the project
cd food_ordering/

# Activate virtual environment
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the server
python manage.py runserver
```

Backend runs at: **http://127.0.0.1:8000**  
Visiting `/` will redirect you to the frontend automatically.

---

### 2. Frontend (React/Vite)

```bash
cd frontend/
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 📡 API Endpoints

Base URL: `http://127.0.0.1:8000/api/`

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/register/` | Register a new user |
| `POST` | `/api/token/` | Login — get JWT access & refresh tokens |
| `POST` | `/api/token/refresh/` | Refresh an access token |

### Resources
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/restaurants/` | List all restaurants |
| `GET` | `/api/meals/` | List all meals |
| `GET/POST` | `/api/orders/` | List or place an order (auth required) |
| `POST` | `/api/contact/` | Send a contact message |

### Admin
| URL | Description |
|---|---|
| `/admin/` | Django admin panel |

---

## 📁 Project Structure

```
food_ordering/
├── api/                    # Django app — models, views, serializers
│   ├── models.py           # Restaurant, Meal, Order, OrderItem, ContactMessage
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── food_ordering_project/  # Django project settings
│   ├── settings.py
│   └── urls.py
├── frontend/               # React/Vite app
│   └── src/
│       ├── pages/          # MenuPage, CheckoutPage, ContactPage, etc.
│       ├── components/     # Layout, CartDrawer, etc.
│       └── index.css       # Global design tokens
├── manage.py
└── DESIGN.md               # Design system reference
```

---

## 🗂 Data Models

- **Restaurant** — name, description, address, phone
- **Category** — food categories (Pizza, Burger, etc.)
- **Meal** — linked to Restaurant & Category, with price, image, availability
- **Order** — linked to User & Restaurant, with status (`Pending → Accepted → Completed`)
- **OrderItem** — individual items in an order
- **ContactMessage** — messages from the contact form

---

## 🎨 Design

See [`DESIGN.md`](./DESIGN.md) for the full design system — color palette, typography, component styles, and layout principles.

**Color highlights:**
- 🟠 Primary: `#ff4d00` (Searing Flame Orange)
- 🟡 Accent: `#ffcc00` (Sunburst Yellow)
- ⚫ Dark mode: `#121212` background

---

## 🔑 Environment & Configuration

The app uses Django's `DEBUG = True` for local development. Before deploying to production:
- Set `DEBUG = False` in `settings.py`
- Configure `ALLOWED_HOSTS`
- Switch to a production database (PostgreSQL recommended)
- Set a strong `SECRET_KEY`

---

## 📬 Contact

Built with ❤️ as a food ordering showcase project.
