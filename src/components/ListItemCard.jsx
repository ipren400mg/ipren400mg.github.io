import { Link } from 'react-router-dom';
import ShopImage from './ShopImage';
import { formatPrice } from '../utils/format';

export default function ListItemCard({ categoryName, item }) {
  if (!item?.name) {
    return (
      <div className="list-item-card placeholder">
        <div className="list-item-image placeholder-box" />
        <div className="placeholder-line" />
        <div className="placeholder-line short" />
      </div>
    );
  }

  return (
    <Link className="list-item-link" to={`/detail/${categoryName}/${item.name}`}>
      <article className="list-item-card">
        <ShopImage alt={item.title} className="list-item-image square-frame" src={`/${item.image}`} />
        <div className="list-item-title">{item.title}</div>
        <span className="list-item-price">{formatPrice(item.price)}</span>
      </article>
    </Link>
  );
}
