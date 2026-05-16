import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Link,
  Route,
  Routes,
  matchPath,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import CartModal from './components/CartModal';
import Icon from './components/Icon';
import NotFoundPage from './components/NotFoundPage';
import Snackbar from './components/Snackbar';
import { CartProvider, useCart } from './context/CartContext';
import { getCategories } from './utils/catalog';
import { pluralizeItems } from './utils/format';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';

function setMeta(attrName, attrValue, content) {
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content ?? '');
}

function ShopApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem, cart, clearCart, numItems, setItem, total } = useCart();
  const categories = useMemo(() => getCategories(), []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [headerElevated, setHeaderElevated] = useState(false);
  const lastOfflineRef = useRef(!navigator.onLine);

  const listMatch = matchPath('/list/:category', location.pathname);
  const detailMatch = matchPath('/detail/:category/:item', location.pathname);
  const categoryName = detailMatch?.params.category ?? listMatch?.params.category ?? '';
  const page =
    location.pathname === '/'
      ? 'home'
      : detailMatch
        ? 'detail'
        : listMatch
          ? 'list'
          : location.pathname.startsWith('/cart')
            ? 'cart'
            : location.pathname.startsWith('/checkout')
              ? 'checkout'
              : '404';

  useEffect(() => {
    setDrawerOpen(false);
    setCartModalOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setHeaderElevated(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const notifyNetworkStatus = () => {
      const offline = !navigator.onLine;
      const previousOffline = lastOfflineRef.current;
      lastOfflineRef.current = offline;

      if (offline || previousOffline) {
        setSnackbarMessage(offline ? 'You are offline' : 'You are online');
      }
    };

    notifyNetworkStatus();
    window.addEventListener('online', notifyNetworkStatus);
    window.addEventListener('offline', notifyNetworkStatus);

    return () => {
      window.removeEventListener('online', notifyNetworkStatus);
      window.removeEventListener('offline', notifyNetworkStatus);
    };
  }, []);

  useEffect(() => {
    if (!snackbarMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setSnackbarMessage(''), 4000);
    return () => window.clearTimeout(timeoutId);
  }, [snackbarMessage]);

  const announce = useCallback((message) => {
    setAnnouncement('');
    window.setTimeout(() => setAnnouncement(message), 100);
  }, []);

  const handleSectionChange = useCallback(
    ({ category, description, image, title }) => {
      if (page !== 'list') {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }

      if (title) {
        document.title = `${title} - SHOP`;
        announce(`${title}, loaded`);
        setMeta('property', 'og:title', title);
        setMeta('property', 'og:description', description || document.title);
        setMeta('property', 'og:url', window.location.href);
        setMeta('property', 'og:image', image || `${window.location.origin}/images/shop-icon-128.png`);
        setMeta('name', 'twitter:title', title);
        setMeta('name', 'twitter:description', description || document.title);
        setMeta('name', 'twitter:url', window.location.href);
        setMeta('name', 'twitter:image', image || `${window.location.origin}/images/shop-icon-128.png`);
      }

      if (page === 'detail' && !category && categoryName) {
        navigate(`/list/${categoryName}`, { replace: true });
      }
    },
    [announce, categoryName, navigate, page],
  );

  const handleAddToCart = useCallback(
    ({ item, quantity, size }) => {
      addItem({ item, quantity, size });
      setCartModalOpen(true);
      announce('Item added to the cart');
    },
    [addItem, announce],
  );

  const handleSetCartItem = useCallback(
    ({ item, quantity, size }) => {
      setItem({ item, quantity, size });
      announce(quantity === 0 ? 'Item deleted' : `Quantity changed to ${quantity}`);
    },
    [announce, setItem],
  );

  return (
    <div className={`app-shell page-${page}`}>
      <header className={`app-header ${headerElevated ? 'elevated' : ''}`}>
        <div className="app-toolbar">
          <div className="left-bar-item">
            {page === 'detail' ? (
              <Link aria-label="Go back" className="icon-button detail-back-link" to={`/list/${categoryName}`}>
                <Icon name="back" />
              </Link>
            ) : (
              <button
                aria-label="Categories"
                className="icon-button menu-button"
                onClick={() => setDrawerOpen((open) => !open)}
                type="button"
              >
                <Icon name="menu" />
              </button>
            )}
          </div>

          <div className="app-logo">
            <Link aria-label="SHOP Home" to="/">
              SHOP
            </Link>
          </div>

          <div className="cart-button-container">
            <Link aria-label={`Shopping cart: ${pluralizeItems(numItems)}`} className="icon-button" to="/cart">
              <Icon name="cart" />
            </Link>
            {numItems ? <div className="cart-badge">{numItems}</div> : null}
          </div>
        </div>

        {(page === 'home' || page === 'list' || page === 'detail') && (
          <nav className="tab-container" aria-label="Categories">
            <div className="tabs">
              {categories.map((category) => (
                <Link
                  className={`tab-link ${category.name === categoryName ? 'active' : ''}`}
                  key={category.name}
                  to={`/list/${category.name}`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <button
        aria-hidden={!drawerOpen}
        className={`drawer-backdrop ${drawerOpen ? 'opened' : ''}`}
        onClick={() => setDrawerOpen(false)}
        tabIndex={drawerOpen ? 0 : -1}
        type="button"
      />
      <aside className={`mobile-drawer ${drawerOpen ? 'opened' : ''}`}>
        <nav aria-label="Categories" className="drawer-list">
          {categories.map((category) => (
            <Link
              className={category.name === categoryName ? 'active' : ''}
              key={category.name}
              onClick={() => setDrawerOpen(false)}
              to={`/list/${category.name}`}
            >
              {category.title}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="page-main">
        <Routes>
          <Route
            element={<HomePage categories={categories} onSectionChange={handleSectionChange} />}
            path="/"
          />
          <Route element={<ListPage onSectionChange={handleSectionChange} />} path="/list/:category" />
          <Route
            element={<DetailPage onAddToCart={handleAddToCart} onSectionChange={handleSectionChange} />}
            path="/detail/:category/:item"
          />
          <Route
            element={
              <CartPage
                cart={cart}
                onSectionChange={handleSectionChange}
                onSetCartItem={handleSetCartItem}
                total={total}
              />
            }
            path="/cart"
          />
          <Route
            element={
              <CheckoutPage
                cart={cart}
                clearCart={clearCart}
                onAnnounce={announce}
                onSectionChange={handleSectionChange}
                total={total}
              />
            }
            path="/checkout"
          />
          <Route
            element={
              <CheckoutPage
                cart={cart}
                clearCart={clearCart}
                onAnnounce={announce}
                onSectionChange={handleSectionChange}
                total={total}
              />
            }
            path="/checkout/:state"
          />
          <Route element={<NotFoundPage onSectionChange={handleSectionChange} />} path="*" />
        </Routes>
      </main>

      <footer className="app-footer">
        <a href="https://www.polymer-project.org/3.0/toolbox/">Made by Polymer</a>
        <div className="demo-label">Demo Only</div>
      </footer>

      <div className="announcer" aria-live="assertive">
        {announcement}
      </div>

      <CartModal onClose={() => setCartModalOpen(false)} open={cartModalOpen} />
      <Snackbar message={snackbarMessage} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <ShopApp />
    </CartProvider>
  );
}
