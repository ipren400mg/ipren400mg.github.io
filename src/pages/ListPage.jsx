import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ListItemCard from '../components/ListItemCard';
import NetworkWarning from '../components/NetworkWarning';
import ShopImage from '../components/ShopImage';
import { getCategory } from '../utils/catalog';
import { pluralizeItems } from '../utils/format';

const placeholderItems = Array.from({ length: 10 }, (_, index) => ({ id: index }));

export default function ListPage({ onSectionChange }) {
  const { category: categoryName } = useParams();
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  const loadCategory = useCallback(async () => {
    setLoading(true);
    setFailed(false);

    try {
      const nextCategory = await getCategory(categoryName);

      if (!nextCategory) {
        setCategory(null);
        setFailed(true);
        return;
      }

      setCategory(nextCategory);
      onSectionChange({
        category: nextCategory.name,
        image: `${window.location.origin}${nextCategory.image}`,
        title: nextCategory.title,
      });
    } catch {
      setCategory(null);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [categoryName, onSectionChange]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory, retryToken, location.pathname]);

  if (failed) {
    return (
      <NetworkWarning
        offline={!navigator.onLine}
        onRetry={() => setRetryToken((value) => value + 1)}
      />
    );
  }

  return (
    <section className="list-page">
      {category ? (
        <ShopImage
          alt={category.title}
          className="list-hero-image"
          placeholder={category.placeholder}
          src={category.image}
        />
      ) : null}

      <header className="section-header">
        <h1>{category?.title ?? ''}</h1>
        <span>{category?.items ? `(${pluralizeItems(category.items.length)})` : ''}</span>
      </header>

      <div className="list-grid">
        {(loading ? placeholderItems : category?.items ?? []).map((item) => (
          <div className="list-grid-item" key={item.name ?? item.id}>
            <ListItemCard categoryName={categoryName} item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
