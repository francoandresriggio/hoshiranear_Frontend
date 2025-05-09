import { createContext, useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(window.localStorage.getItem('cart')) || [])

  const addItemToCart = (product, products, setProducts) => {
    const productStock = products.find(item => item.id === product.id)
    if (productStock.quantity <= 0) {
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
    const productStockIndex = products.findIndex(item => item.id === product.id)
    const newStock = [...products]
    newStock[productStockIndex].quantity -= 1
    setProducts(newStock)
    window.localStorage.setItem('stock_available', JSON.stringify(newStock))
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

  const removeItemFromCart = (product, products, setProducts) => {
    const productCartIndex = cart.findIndex(item => item.id === product.id)
    const productStockIndex = products.findIndex(item => item.id === product.id)
    const newStock = [...products]
    newStock[productStockIndex].quantity += 1
    setProducts(newStock)
    window.localStorage.setItem('stock_available', JSON.stringify(newStock))
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

  const removeProductFromCart = (product, products, setProducts) => {
    const newStock = [...products]
    const productStockIndex = products.findIndex(item => item.id === product.id)
    newStock[productStockIndex].quantity += cart.find(item => item.id === product.id).quantity
    setProducts(newStock)
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = (products, setProducts) => {
    cart?.forEach(product => {
      const newStock = [...products]
      const productStockIndex = products.findIndex(item => item.id === product.id)
      newStock[productStockIndex].quantity += product.quantity
      setProducts(newStock)
      window.localStorage.setItem('stock_available', JSON.stringify(newStock))
    })
    setCart([])
    window.localStorage.removeItem('cart')
  }

  const confirmCart = () => {
    if (cart.length === 0) return
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
