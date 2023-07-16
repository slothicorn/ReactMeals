import classes from './Header.module.css';
import PropTypes from 'prop-types';

import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = ({ onCartOpen }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onCartOpen={onCartOpen} />
      </header>
      <div className={classes['main-image']}>
        <img
          src={mealsImage}
          alt="A table full of delicious food"
        />
      </div>
    </>
  );
};

Header.propTypes = {
  onCartOpen: PropTypes.func,
};

export default Header;
