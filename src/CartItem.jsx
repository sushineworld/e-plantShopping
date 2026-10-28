```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getPrice = (cost) => {
    return Number(String(cost).replace(/[^0-9.]/g, '')) || 0;
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce(
        (total, item) =>
          total + getPrice(item.cost) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (getPrice(item.cost) * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button
            className="continue-shopping"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <h3>{item.name}</h3>

                <p>Price: ${getPrice(item.cost).toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: ${calculateTotalCost(item)}
                </p>

                <button
                  className="remove-item"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${calculateTotalAmount()}</h3>

            <button
              className="continue-shopping"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
```
