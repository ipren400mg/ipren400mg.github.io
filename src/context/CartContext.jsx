import { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'shop-cart-data';
const CartContext = createContext(null);

function readCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(cart) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function findEntryIndex(cart, itemName, size) {
  return cart.findIndex((entry) => entry.item.name === itemName && entry.size === size);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  const updateCart = (updater) => {
    setCart((currentCart) => {
      const nextCart = updater(currentCart);
      writeCart(nextCart);
      return nextCart;
    });
  };

  const value = useMemo(() => {
    const addItem = ({ item, quantity, size }) => {
      updateCart((currentCart) => {
        const nextCart = [...currentCart];
        const index = findEntryIndex(nextCart, item.name, size);

        if (index === -1) {
          nextCart.push({ item, quantity, size });
          return nextCart;
        }

        nextCart[index] = {
          ...nextCart[index],
          quantity: nextCart[index].quantity + quantity,
        };

        return nextCart;
      });
    };

    const setItem = ({ item, quantity, size }) => {
      updateCart((currentCart) => {
        const nextCart = [...currentCart];
        const index = findEntryIndex(nextCart, item.name, size);

        if (quantity === 0) {
          if (index !== -1) {
            nextCart.splice(index, 1);
          }

          return nextCart;
        }

        if (index === -1) {
          nextCart.push({ item, quantity, size });
        } else {
          nextCart[index] = { item, quantity, size };
        }

        return nextCart;
      });
    };

    const clearCart = () => {
      updateCart(() => []);
    };

    const numItems = cart.reduce((total, entry) => total + entry.quantity, 0);
    const total = cart.reduce((sum, entry) => sum + entry.quantity * entry.item.price, 0);

    return {
      addItem,
      setItem,
      clearCart,
      cart,
      numItems,
      total,
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
