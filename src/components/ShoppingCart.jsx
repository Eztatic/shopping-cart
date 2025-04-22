import { Link } from 'react-router';

const ShoppingCart = () => {
      return (
            <>
                  <h1>Shopping Cart</h1>
                  <p>This is the shopping chart</p>
                  <button>
                        <Link to={'/CheckoutPage'}>Checkout</Link>
                  </button>
            </>
      );
}

export default ShoppingCart;