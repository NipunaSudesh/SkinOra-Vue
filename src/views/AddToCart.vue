<template>
  <section class="w-full mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>

    <div class="flex flex-col lg:flex-row gap-6">

      <!-- Cart Items -->
      <div class="w-full lg:w-3/5 space-y-4">
        <div v-if="cartItems.length" class="space-y-4">
          <CartItem
            v-for="item in cartItems"
            :key="item._id"
            :id="item.product._id"
            :slug="item.product.slug"
            :imageUrl="item.product.imageUrl"
            :name="item.product.name"
            :price="item.product.price"
            :oldPrice="item.product.oldPrice"
            :discountPercent="item.product.discountPercent"
            :category="item.product.category"
            :brand="item.product.brand"
            :qty="item.qty"
            :selected="selectedItems.includes(item.product.slug)"
            mode="cart"
            @qty-change="updateQty"
            @remove="removeItem"
            @select="toggleSelectItem(item.product.slug)"
          />
        </div>

        <div v-else class="flex flex-col items-center mt-20">
          <h2 class="text-xl font-semibold">Your cart is empty</h2>
          <router-link
            to="/"
            class="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
          >
            Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow h-fit">
        <h2 class="text-lg font-semibold mb-4">Order Summary</h2>

        <div class="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>Rs. {{ subTotal }}.00</span>
        </div>
        <div class="flex justify-between mb-4">
          <span>Shipping</span>
          <span>Rs. {{ shippingFee }}.00</span>
        </div>
        <hr class="mb-4" />
        <div class="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>Rs. {{ total }}.00</span>
        </div>

        <button
          @click="checkout"
          class="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import CartItem from "../components/cart/AddCart.vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;
const router = useRouter();

const cartItems = ref([]);
const selectedItems = ref([]); // selected product slugs
const shipping_fee = 350;

// Subtotal, shipping, and total only for selected items
const selectedCartItems = computed(() =>
  cartItems.value.filter(item => selectedItems.value.includes(item.product.slug))
);

const subTotal = computed(() =>
  selectedCartItems.value.reduce((sum, item) => sum + item.product.price * item.qty, 0)
);

const shippingFee = computed(() =>
  selectedCartItems.value.length ? shipping_fee : 0
);

const total = computed(() => subTotal.value + shippingFee.value);

// Fetch cart from backend
const fetchCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) return router.push("/login");

  try {
    const res = await fetch(`${SKINORA_API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch cart");

    const data = await res.json();
    cartItems.value = data.filter(i => i.product); // only items with product

    // Optionally select all items initially
    selectedItems.value = data.filter(i => i.product).map(i => i.product.slug);
  } catch (err) {
    console.error(err);
  }
};

// Update quantity
const updateQty = (slug, newQty) => {
  if (newQty < 1) return;
  const item = cartItems.value.find(i => i.product.slug === slug);
  if (!item) return;
  item.qty = newQty;
};

// Remove item
const removeItem = (slug) => {
  cartItems.value = cartItems.value.filter(i => i.product.slug !== slug);
  selectedItems.value = selectedItems.value.filter(s => s !== slug);
};

// Select / Unselect
const toggleSelectItem = (slug) => {
  selectedItems.value = selectedItems.value.includes(slug)
    ? selectedItems.value.filter(s => s !== slug)
    : [...selectedItems.value, slug];
};

// Checkout
const checkout = () => {
  if (!selectedCartItems.value.length) {
    alert("Please select at least one item to proceed to checkout.");
    return;
  }

  router.push({
    path: "/checkout",
    state: {
      items: selectedCartItems.value,
      subtotal: subTotal.value,
      shipping: shippingFee.value,
      total: total.value,
    },
  });
};

onMounted(fetchCart);
</script>
