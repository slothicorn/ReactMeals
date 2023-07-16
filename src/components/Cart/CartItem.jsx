import classes from './CartItem.module.css';
import PropTypes from 'prop-types';

const CartItem = ({ name, amount, onRemove, onAdd, price }) => {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formattedPrice}</span>
          <span className={classes.amount}>x {amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func,
  price: PropTypes.number,
};

export default CartItem;
