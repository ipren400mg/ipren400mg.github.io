import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import NetworkWarning from '../components/NetworkWarning';
import ShopImage from '../components/ShopImage';
import { SelectField } from '../components/FormFields';
import { getItem } from '../utils/catalog';
import { decodeHtml, formatPrice, getDescriptionExcerpt } from '../utils/format';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const quantities = [1, 2, 3, 4, 5];

export default function DetailPage({ onAddToCart, onSectionChange }) {
  const { category: categoryName, item: itemName } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [failed, setFailed] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  const loadItem = useCallback(async () => {
    setFailed(false);

    try {
      const nextItem = await getItem(categoryName, itemName);

      if (!nextItem) {
        setItem(null);
        setFailed(true);
        return;
      }

      setItem(nextItem);
      setSize('M');
      setQuantity(1);
      onSectionChange({
        category: nextItem.category,
        description: getDescriptionExcerpt(nextItem.description),
        image: `${window.location.origin}/${nextItem.image}`,
        title: nextItem.title,
      });
    } catch {
      setItem(null);
      setFailed(true);
    }
  }, [categoryName, itemName, onSectionChange]);

  useEffect(() => {
    loadItem();
  }, [loadItem, location.pathname, retryToken]);

  const description = useMemo(() => decodeHtml(item?.description), [item?.description]);

  if (failed) {
    return (
      <NetworkWarning
        offline={!navigator.onLine}
        onRetry={() => setRetryToken((value) => value + 1)}
      />
    );
  }

  return (
    <section className="detail-page">
      <div className="detail-content">
        <ShopImage
          alt={item?.title}
          className="detail-image square-frame"
          src={item ? `/${item.largeImage}` : ''}
        />

        <div className={`detail-copy ${item ? 'has-content' : ''}`}>
          <h1>{item?.title ?? ''}</h1>
          <div className="detail-price">{formatPrice(item?.price)}</div>

          <div className="detail-pickers">
            <SelectField
              aria-label="Size"
              className="detail-select"
              onChange={(event) => setSize(event.target.value)}
              prefix="Size"
              value={size}
            >
              {sizes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>

            <SelectField
              aria-label="Quantity"
              className="detail-select"
              onChange={(event) => setQuantity(Number(event.target.value))}
              prefix="Quantity"
              value={quantity}
            >
              {quantities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </SelectField>
          </div>

          <section className="detail-description">
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </section>

          <button
            aria-label="Add this item to cart"
            className="shop-button-link responsive-button"
            onClick={() => item && onAddToCart({ item, quantity, size })}
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
