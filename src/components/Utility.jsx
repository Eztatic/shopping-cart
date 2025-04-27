const calculatePrice = (cartItems) => {
      const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);
}

const calculateNumberOfItems = (cartItems) => {
      return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

export { calculatePrice, calculateNumberOfItems }