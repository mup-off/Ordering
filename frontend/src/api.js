const BASE_URL = 'http://127.0.0.1:8000/api'

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Generic fetch wrapper
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw { response: { data: error }, status: res.status }
  }

  return res.json()
}

// Auth API
export const authApi = {
  login: async ({ email, password }) => {
    const data = await request('/token/', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
    })
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    return data
  },

  register: async ({ name, email, phone, password }) => {
    return request('/register/', {
      method: 'POST',
      body: JSON.stringify({ username: email, email, password, first_name: name }),
    })
  },

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
}

// Menu / Meals API
export const menuApi = {
  getMeals: () => request('/meals/'),
  getRestaurants: () => request('/restaurants/'),
}

// Orders API
export const orderApi = {
  placeOrder: (orderData) =>
    request('/orders/', { method: 'POST', body: JSON.stringify(orderData) }),
  getOrders: () => request('/orders/'),
}

// Contact API
export const contactApi = {
  sendMessage: (data) =>
    request('/contact/', { method: 'POST', body: JSON.stringify(data) }),
}
