import { createContext, useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(window.localStorage.getItem('cart')) || [])

  const addItemToCart = (product, decreaseStock) => {
    const isStock = decreaseStock(product.id)
    if (!isStock) {
      Swal.fire({
        icon: 'error',
        title: 'No hay más stock del producto',
        background: '#000',
        color: '#fff',
        showConfirmButton: false,
        timer: 1500
      })
      return
    }
    const productCartIndex = cart.findIndex(item => item.id === product.id)
    if (productCartIndex !== -1) {
      const newCart = [...cart]
      newCart[productCartIndex].quantity += 1
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return
    }
    const newCart = [...cart, { ...product, quantity: 1 }]
    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeItemFromCart = (product, increaseStock) => {
    const productCartIndex = cart.findIndex(item => item.id === product.id)
    increaseStock(product.id)
    if (cart[productCartIndex].quantity > 1) {
      const newCart = [...cart]
      newCart[productCartIndex].quantity -= 1
      setCart(newCart)
      window.localStorage.setItem('cart', JSON.stringify(newCart))
      return
    }
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeProductFromCart = (product, increaseStock) => {
    increaseStock(product.id, cart.find(item => item.id === product.id).quantity)
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = increaseStock => {
    cart?.forEach(product => {
      increaseStock(product.id, product.quantity)
    })
    setCart([])
    window.localStorage.removeItem('cart')
  }

  const confirmCart = resetStock => {
    if (cart.length === 0) return
    resetStock()
    setCart([])
    window.localStorage.removeItem('cart')
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con exito',
      background: '#000',
      color: '#fff',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <CartContext.Provider value={
        {
          cart,
          addItemToCart,
          removeItemFromCart,
          removeProductFromCart,
          clearCart,
          confirmCart
        }
    }
    >
      {children}
    </CartContext.Provider>
  )
}
