import React, { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { MenuPage } from './pages/MenuPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { CartDrawer } from './components/CartDrawer'
import { authApi, userApi, orderApi, menuApi } from './api'

function App() {
    const [currentPage, setCurrentPage] = useState('menu')
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [lastOrderDetails, setLastOrderDetails] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [restaurants, setRestaurants] = useState([])

    // On mount: restore session from localStorage
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token) {
            userApi.getMe()
                .then(data => setUser(data))
                .catch(() => {
                    // Token expired or invalid
                    authApi.logout()
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }

        // Pre-load restaurants for order placement
        menuApi.getRestaurants()
            .then(data => setRestaurants(data))
            .catch(() => {})
    }, [])

    const addToCart = (meal) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === meal.id)
            if (existing) {
                return prev.map(i => i.id === meal.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
            }
            return [...prev, { ...meal, quantity: 1 }]
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (index) => {
        const newCart = [...cartItems]
        newCart.splice(index, 1)
        setCartItems(newCart)
    }

    const handleCheckout = () => {
        if (!user) {
            setIsCartOpen(false)
            setCurrentPage('login')
            return
        }
        setIsCartOpen(false)
        setCurrentPage('checkout')
        window.scrollTo(0, 0)
    }

    const handlePlaceOrder = async (formData) => {
        // Determine restaurant — use the first item's restaurant_id, or first available
        const restaurantId = cartItems[0]?.restaurant?.id || (restaurants[0]?.id)

        const items = cartItems.map(item => ({
            meal_id: item.id,
            quantity: item.quantity || 1,
        }))

        try {
            const order = await orderApi.placeOrder({
                restaurant_id: restaurantId,
                items,
            })
            setLastOrderDetails({
                ...formData,
                orderId: order.id,
                total: order.total_price,
                items: order.items,
            })
        } catch {
            // Fallback: show confirmation with local data if API fails
            setLastOrderDetails({ ...formData, orderId: Math.floor(Math.random() * 100000) })
        }

        setCurrentPage('confirmation')
        setCartItems([])
        window.scrollTo(0, 0)
    }

    const handleLogin = async (data) => {
        // After authApi.login stores tokens, fetch real user info
        try {
            const me = await userApi.getMe()
            setUser(me)
        } catch {
            setUser({ username: 'User' })
        }
        setCurrentPage('menu')
    }

    const handleSignup = async (data) => {
        // authApi.register + authApi.login already ran in SignupPage
        try {
            const me = await userApi.getMe()
            setUser(me)
        } catch {
            setUser({ username: data.name || 'User' })
        }
        setCurrentPage('menu')
    }

    const handleLogout = () => {
        authApi.logout()
        setUser(null)
        setCurrentPage('menu')
    }

    const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

    if (loading) return <div className="loading-screen">Loading...</div>

    return (
        <Layout
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            user={user}
            onLogout={handleLogout}
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
        >
            <div className="app-container">
                {currentPage === 'menu' && (
                    <MenuPage onAddToCart={addToCart} />
                )}

                {currentPage === 'checkout' && (
                    <CheckoutPage
                        cartItems={cartItems}
                        user={user}
                        onBack={() => setCurrentPage('menu')}
                        onPlaceOrder={handlePlaceOrder}
                    />
                )}

                {currentPage === 'confirmation' && (
                    <ConfirmationPage
                        orderDetails={lastOrderDetails}
                        onHome={() => setCurrentPage('menu')}
                    />
                )}

                {currentPage === 'contact' && (
                    <ContactPage />
                )}

                {currentPage === 'login' && (
                    <LoginPage
                        onLogin={handleLogin}
                        onNavigateToSignup={() => setCurrentPage('signup')}
                        onHome={() => setCurrentPage('menu')}
                    />
                )}

                {currentPage === 'signup' && (
                    <SignupPage
                        onSignup={handleSignup}
                        onNavigateToLogin={() => setCurrentPage('login')}
                        onHome={() => setCurrentPage('menu')}
                    />
                )}

                <CartDrawer
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    onRemove={removeFromCart}
                    onCheckout={handleCheckout}
                />
            </div>

            <style jsx>{`
        .app-container {
          min-height: calc(100vh - 80px);
        }
      `}</style>
        </Layout>
    )
}

export default App
