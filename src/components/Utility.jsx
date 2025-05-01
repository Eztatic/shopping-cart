const calculatePrice = (cartItems) => {
      const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);
}

const calculateNumberOfItems = (cartItems) => {
      return cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

const toTitleCase = (str) => {
      return str
            .toLowerCase()
            .replace(/\w\S*/g, word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
            );
}

export { calculatePrice, calculateNumberOfItems, toTitleCase }