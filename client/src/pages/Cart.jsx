import React, { useContext } from 'react';
import { CartContext } from '../utils/CartContext';
import '../styles/cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                min="1"
              />
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>
            <div className="item-total">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button onClick={() => removeFromCart(item._id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${getTotalPrice().toFixed(2)}</h2>
        <button className="checkout-btn">Proceed to Checkout</button>
        <button onClick={clearCart} className="clear-btn">Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
