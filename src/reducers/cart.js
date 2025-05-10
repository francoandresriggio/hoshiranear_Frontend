export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

const CART_ACTION_TYPES = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  CONFIRM_CART: 'CONFIRM_CART'
}

const updateCart = cart => {
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

const deleteCart = () => { window.localStorage.removeItem('cart') }

export const cartReducer = (state, action) => {
  const { type, payload: product } = action
  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
    {
      const productCartIndex = state.findIndex(item => item.id === product.id)
      if (productCartIndex !== -1) {
        const newState = [...state]
        newState[productCartIndex].quantity += 1
        updateCart(newState)
        return newState
      }
      const newState = [...state, { ...product, quantity: 1 }]
      updateCart(newState)
      return newState
    }
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
    {
      const productCartIndex = state.findIndex(item => item.id === product.id)
      if (state[productCartIndex].quantity > 1) {
        const newState = [...state]
        newState[productCartIndex].quantity -= 1
        updateCart(newState)
        return newState
      }
      const newState = state.filter(item => item.id !== product.id)
      updateCart(newState)
      return newState
    }
    case CART_ACTION_TYPES.REMOVE_PRODUCT_FROM_CART:
    {
      const newState = state.filter(item => item.id !== product.id)
      updateCart(newState)
      return newState
    }
    case CART_ACTION_TYPES.CLEAR_CART:
    {
      deleteCart()
      return []
    }
    case CART_ACTION_TYPES.CONFIRM_CART:
    {
      deleteCart()
      return []
    }
  }
}
