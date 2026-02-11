// src/stores/cart.js
import { reactive, computed } from "vue";

export const cartStore = reactive({
  items: [], // full cart items

  setItems(newItems) {
    this.items = newItems;
  },

  addItem(item) {
    const existing = this.items.find(i => i.product._id === item.product._id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      this.items.push(item);
    }
  },

  removeItem(slug) {
    this.items = this.items.filter(i => i.product.slug !== slug);
  },

  updateQty(slug, qty) {
    const item = this.items.find(i => i.product.slug === slug);
    if (item) item.qty = qty;
  },

  get count() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  },
});
