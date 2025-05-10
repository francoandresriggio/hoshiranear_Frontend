import { createContext, useReducer } from 'react'
import { cartReducer, cartInitialState } from '../reducers/cart'
import { getTotal } from '../utils/cartUtils'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

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
    dispatch({
      type: 'ADD_ITEM_TO_CART',
      payload: product
    })
  }

  const removeItemFromCart = (product, increaseStock) => {
    increaseStock(product.id)
    dispatch({
      type: 'REMOVE_ITEM_FROM_CART',
      payload: product
    })
  }

  const removeProductFromCart = (product, increaseStock) => {
    increaseStock(product.id, state.find(item => item.id === product.id).quantity)
    dispatch({
      type: 'REMOVE_PRODUCT_FROM_CART',
      payload: product
    })
  }

  const clearCart = (cart, increaseStock) => {
    cart?.forEach(product => {
      increaseStock(product.id, product.quantity)
    })
    dispatch({ type: 'CLEAR_CART' })
  }

  const confirmCart = resetStock => {
    resetStock()
    dispatch({ type: 'CONFIRM_CART' })
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con exito',
      background: '#000',
      color: '#fff',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return { state, addItemToCart, removeItemFromCart, removeProductFromCart, clearCart, confirmCart }
}

export function CartProvider ({ children }) {
  const { state, addItemToCart, removeItemFromCart, removeProductFromCart, clearCart, confirmCart } = useCartReducer()

  return (
    <CartContext.Provider value={
        {
          cart: state,
          addItemToCart,
          removeItemFromCart,
          removeProductFromCart,
          clearCart,
          confirmCart,
          getTotal
        }
    }
    >
      {children}
    </CartContext.Provider>
  )
}
