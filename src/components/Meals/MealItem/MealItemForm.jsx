import classes from './MealItemForm.module.css';
import PropTypes from 'prop-types';

import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = ({ id, onAddToCart }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Pleae enter a valid amount (1-5)</p>}
    </form>
  );
};

MealItemForm.propTypes = {
  id: PropTypes.string,
  onAddToCart: PropTypes.func,
};

export default MealItemForm;
