import classes from './Cart.module.css';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = ({ onCartClose }) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsOrdered(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        'https://reactmeals-b0a28-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong while sending data to database.');
      }
      setIsSubmitting(false);
    } catch (error) {
      isSubmitting(false);
      console.log(error);
    }

    setOrderSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      {
        <button
          className={classes['button--alt']}
          onClick={onCartClose}>
          Close
        </button>
      }
      {hasItems && (
        <button
          className={classes.button}
          onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrdered && (
        <Checkout
          onSubmit={submitOrderHandler}
          onCancel={onCartClose}
        />
      )}
      {!isOrdered && modalActions}
    </>
  );

  const isSubmittingModalContent = (
    <p className={classes.text}>Processing your order...</p>
  );

  const orderWasSubmitted = (
    <>
      <div className={classes.actions}>
        <p className={classes.text}>
          Thank you for choosing ReactMeals! Your order has been submitted...
        </p>
        <button
          className={classes.button}
          onClick={onCartClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCartClose={onCartClose}>
      {!isSubmitting && !orderSubmitted && cartModalContent}
      {isSubmitting && !orderSubmitted && isSubmittingModalContent}
      {orderSubmitted && orderWasSubmitted}
    </Modal>
  );
};

Cart.propTypes = {
  onCartClose: PropTypes.func,
};

export default Cart;
