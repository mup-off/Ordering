import React, { useState, useEffect } from 'react'
import { Layout } from './components/Layout'
import { MenuPage } from './pages/MenuPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { CartDrawer } from './components/CartDrawer'

function App() {
    const [currentPage, setCurrentPage] = useState('menu')
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [lastOrderDetails, setLastOrderDetails] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simple loading simulation
        const timer = setTimeout(() => setLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    const addToCart = (meal) => {
        setCartItems([...cartItems, meal])
        setIsCartOpen(true)
    }

    const removeFromCart = (index) => {
        const newCart = [...cartItems]
        newCart.splice(index, 1)
        setCartItems(newCart)
    }

    const handleCheckout = () => {
        setIsCartOpen(false)
        setCurrentPage('checkout')
        window.scrollTo(0, 0)
    }

    const handlePlaceOrder = (details) => {
        setLastOrderDetails({ ...details, orderId: Math.floor(Math.random() * 100000) })
        setCurrentPage('confirmation')
        setCartItems([])
        window.scrollTo(0, 0)
    }

    const handleLogin = (data) => {
        setUser({ name: 'User', email: data.email })
        setCurrentPage('menu')
    }

    const handleSignup = (data) => {
        setUser({ name: data.name, email: data.email })
        setCurrentPage('menu')
    }

    const handleLogout = () => {
        setUser(null)
        setCurrentPage('menu')
    }

    if (loading) return <div className="loading-screen">Loading...</div>

    return (
        <Layout
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            user={user}
            onLogout={handleLogout}
        >
            <div className="app-container">
                {currentPage === 'menu' && (
                    <MenuPage onAddToCart={addToCart} />
                )}

                {currentPage === 'checkout' && (
                    <CheckoutPage
                        cartItems={cartItems}
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
                    />
                )}

                {currentPage === 'signup' && (
                    <SignupPage
                        onSignup={handleSignup}
                        onNavigateToLogin={() => setCurrentPage('login')}
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
