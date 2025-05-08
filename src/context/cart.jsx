import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState(() => window.localStorage.getItem('cart') || [])

  const addToCart = product => {
    const productCartIndex = cart.findIndex(item => item.id === product.id)
    if (productCartIndex !== -1) {
      const newCart = [...cart]
      newCart[productCartIndex].quantity += 1
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return
    }
    const newCart = [...cart, { ...product, quantity: 1 }]
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeFromCart = product => {
    const productCartIndex = cart.findIndex(item => item.id === product.id)
    if (cart[productCartIndex].quantity > 1) {
      const newCart = [...cart]
      newCart[productCartIndex].quantity -= 1
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return
    }
    const newCart = cart.filter(item => item.id !== product.id)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = () => {
    setCart([])
    window.localStorage.removeItem('cart')
  }

  const confirmCart = () => {
    setCart([])
    window.localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider value={
        {
          cart,
          addToCart,
          removeFromCart,
          clearCart,
          confirmCart
        }
    }
    >
      {children}
    </CartContext.Provider>
  )
}
