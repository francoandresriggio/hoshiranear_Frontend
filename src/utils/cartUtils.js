export const getTotal = cart => cart.reduce((total, product) => total + product.price * product.quantity, 0)
