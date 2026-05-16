import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Icon from './Icon';

export default function NotFoundPage({ onSectionChange }) {
  const location = useLocation();

  useEffect(() => {
    onSectionChange({ title: "Sorry, we couldn't find that page" });
  }, [location.pathname, onSectionChange]);

  return (
    <section className="not-found-page">
      <Icon className="not-found-icon" name="error" />
      <h1>Sorry, we couldn't find that page</h1>
      <Link className="shop-button-link" to="/">
        Go to the home page
      </Link>
    </section>
  );
}
