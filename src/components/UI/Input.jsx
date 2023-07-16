import classes from './Input.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const Input = React.forwardRef(({ label, input }, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={input.id}>{label}</label>
      <input
        ref={ref}
        id={input.id}
        {...input}
      />
    </div>
  );
});

Input.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
};

Input.displayName = 'Input';

export default Input;
