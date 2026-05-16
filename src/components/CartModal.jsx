import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function CartModal({ open, onClose }) {
  return (
    <>
      <button
        aria-hidden={!open}
        className={`cart-modal-backdrop ${open ? 'opened' : ''}`}
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <div
        aria-hidden={!open}
        aria-modal="true"
        className={`cart-modal ${open ? 'opened' : ''}`}
        role="dialog"
      >
        <div className="cart-modal-label">Added to cart</div>
        <div className="cart-modal-actions">
          <Link className="shop-button-link" onClick={onClose} to="/cart">
            View Cart
          </Link>
          <Link className="shop-button-link" onClick={onClose} to="/checkout">
            Checkout
          </Link>
        </div>
        <button
          aria-label="Close dialog"
          className="icon-button cart-modal-close"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" />
        </button>
      </div>
    </>
  );
}
