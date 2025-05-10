export const ProductsInitialState = JSON.parse(window.localStorage.getItem('stock_available')) || []

export const productsReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_PRODUCTS_FROM_API':
    {
      window.localStorage.setItem('stock_available', JSON.stringify(payload))
      return payload
    }
    case 'INCREASE_STOCK':
    {
      const newState = [...state]
      const { id, quantity } = payload
      const productIndex = state.findIndex(item => item.id === id)
      newState[productIndex].quantity += quantity
      window.localStorage.setItem('stock_available', JSON.stringify(newState))
      return newState
    }
    case 'DECREASE_STOCK':
    {
      const newState = [...state]
      const { id } = payload
      const productIndex = state.findIndex(item => item.id === id)
      newState[productIndex].quantity -= 1
      window.localStorage.setItem('stock_available', JSON.stringify(newState))
      return newState
    }
    case 'RESET_STOCK':
    {
      if (state.filter(product => product.quantity > 0).length === 0) {
        window.localStorage.removeItem('stock_available')
        return []
      }
      return state
    }
    default:
      return state
  }
}
