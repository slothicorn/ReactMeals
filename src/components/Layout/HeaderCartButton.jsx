import classes from './HeaderCartButton.module.css';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../store/cart-context';

const HeaderCartButton = ({ onCartOpen }) => {
  const [btnBumpAnimate, setBtnBumpAnimate] = useState(false);
  const cartCtx = useContext(CartContext);

  const cartItemsQuantity = cartCtx.items.reduce((curQuantity, item) => {
    return curQuantity + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnBumpAnimate ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnBumpAnimate(true);
    console.log('animate');

    const timer = setTimeout(() => {
      console.log('timer');
      setBtnBumpAnimate(false);
    }, 300);

    return () => {
      console.log('cleanup');
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <button
      className={btnClasses}
      onClick={onCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsQuantity}</span>
    </button>
  );
};

HeaderCartButton.propTypes = {
  onCartOpen: PropTypes.func,
};

export default HeaderCartButton;
