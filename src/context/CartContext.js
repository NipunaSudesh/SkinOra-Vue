// src/context/CartContext.js
import { reactive, provide, inject, onMounted } from "vue";

const CART_KEY = Symbol("Cart");

export function provideCart() {
  const state = reactive({
    cartItems: [],
  });

  const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${SKINORA_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      // Map backend cart items to frontend format
      state.cartItems = data.map((item) => ({ ...item.product, qty: item.qty }));
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCartLocal = (product) => {
    const exist = state.cartItems.find((p) => p.slug === product.slug);
    if (exist) {
      exist.qty += 1;
    } else {
      state.cartItems.push({ ...product, qty: 1 });
    }
  };

  const updateQtyLocal = (slug, qty) => {
    const product = state.cartItems.find((p) => p.slug === slug);
    if (product) product.qty = qty;
  };

  const removeItemLocal = (slug) => {
    state.cartItems = state.cartItems.filter((p) => p.slug !== slug);
  };

  provide(CART_KEY, {
    cartItems: state.cartItems, // keep reactive
    fetchCart,
    addToCartLocal,
    updateQtyLocal,
    removeItemLocal,
  });

  // Auto-fetch cart on context initialization
  onMounted(fetchCart);
};

export function useCart() {
  const cart = inject(CART_KEY);
  if (!cart) throw new Error("useCart must be used within provideCart");
  return cart;
}
