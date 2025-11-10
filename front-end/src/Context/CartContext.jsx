import { createContext, useContext, useState, useEffect } from "react"; // ⭐ Import useEffect

export const CartContext = createContext();

const CART_STORAGE_KEY = "foodMoodUserCart"; // Define a unique key for storage

export const CartProvider = ({ children }) => {
  // ⭐ 1. Initialize state: Check local storage first, default to empty array
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      try {
        return savedCart ? JSON.parse(savedCart) : [];
      } catch (e) {
        console.error("Could not parse saved cart:", e);
        return [];
      }
    }
    return [];
  });

  // ⭐ 2. Side Effect: Save cart to local storage whenever the cart state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]); // Dependency array ensures this runs only when 'cart' changes

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    // Note: This is currently removing the item entirely regardless of quantity.
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i // Change: Removed Math.max(i.qty - 1, 1) to allow filter to remove item
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Calculate item count for the Navbar badge
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0); // ⭐ Added itemCount

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        itemCount, // ⭐ Exposed itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);