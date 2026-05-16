import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ShopImage from '../components/ShopImage';

export default function HomePage({ categories, onSectionChange }) {
  const location = useLocation();

  useEffect(() => {
    onSectionChange({ title: 'Home' });
  }, [location.pathname, onSectionChange]);

  return (
    <section className="home-page">
      {categories.map((category) => (
        <article className="home-item" key={category.name}>
          <Link className="home-image-link" to={`/list/${category.name}`}>
            <ShopImage
              alt={category.title}
              className="home-image"
              placeholder={category.placeholder}
              src={category.image}
            />
          </Link>
          <h2>{category.title}</h2>
          <Link className="shop-button-link" to={`/list/${category.name}`}>
            Shop Now
          </Link>
        </article>
      ))}
    </section>
  );
}
