import { Link } from 'react-router-dom';
import Icon from './Icon';
import ShopImage from './ShopImage';
import { SelectField } from './FormFields';
import { formatPrice } from '../utils/format';

const quantityOptions = Array.from({ length: 12 }, (_, index) => index + 1);

export default function CartItemRow({ entry, onQuantityChange, onRemove }) {
  return (
    <article className="cart-item-row">
      <Link title={entry.item.title} to={`/detail/${entry.item.category}/${entry.item.name}`}>
        <ShopImage alt={entry.item.title} className="cart-item-image" src={`/${entry.item.image}`} />
      </Link>

      <div className="cart-item-flex">
        <div className="cart-item-name">
          <Link to={`/detail/${entry.item.category}/${entry.item.name}`}>{entry.item.title}</Link>
        </div>

        <div className="cart-item-detail">
          <SelectField
            aria-label="Change quantity"
            className="cart-item-quantity"
            onChange={(event) => onQuantityChange(Number(event.target.value))}
            prefix="Qty:"
            value={entry.quantity}
          >
            {quantityOptions.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </SelectField>

          <div className="cart-item-size">
            Size: <span>{entry.size}</span>
          </div>
          <div className="cart-item-price">{formatPrice(entry.item.price)}</div>

          <button
            aria-label={`Delete item ${entry.item.title}`}
            className="icon-button cart-item-delete"
            onClick={onRemove}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
      </div>
    </article>
  );
}
