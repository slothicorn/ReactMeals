import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import PropTypes from 'prop-types';

const Backdrop = ({ onCartClose }) => {
  return (
    <div
      className={classes.backdrop}
      onClick={onCartClose}></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onCartClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCartClose={onCartClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

Backdrop.propTypes = {
  onCartClose: PropTypes.func,
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
};

Modal.propTypes = {
  children: PropTypes.node,
  onCartClose: PropTypes.func,
};

export default Modal;
