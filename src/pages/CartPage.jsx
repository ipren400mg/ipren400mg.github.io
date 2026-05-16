import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartItemRow from '../components/CartItemRow';
import Icon from '../components/Icon';
import { formatPrice, pluralizeItems } from '../utils/format';

export default function CartPage({ cart, onSectionChange, onSetCartItem, total }) {
  const location = useLocation();
  const hasItems = cart.length > 0;

  useEffect(() => {
    onSectionChange({ title: 'Your cart' });
  }, [location.pathname, onSectionChange]);

  return (
    <section className="cart-page main-frame">
      {!hasItems ? (
        <div className="subsection">
          <p className="empty-cart">
            Your <Icon className="inline-icon" name="cart" /> is empty.
          </p>
        </div>
      ) : (
        <div className="subsection">
          <header className="section-header">
            <h1>Your Cart</h1>
            <span>({pluralizeItems(cart.length)})</span>
          </header>

          <div className="cart-list">
            {cart.map((entry) => (
              <CartItemRow
                entry={entry}
                key={`${entry.item.name}-${entry.size}`}
                onQuantityChange={(quantity) => onSetCartItem({ ...entry, quantity })}
                onRemove={() => onSetCartItem({ ...entry, quantity: 0 })}
              />
            ))}
          </div>

          <div className="cart-checkout-box">
            Total: <span className="cart-subtotal">{formatPrice(total)}</span>
            <Link className="shop-button-link responsive-button" to="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
