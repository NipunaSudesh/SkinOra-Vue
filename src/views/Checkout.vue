<template>
  <section class="w-full mx-auto p-4 max-w-7xl">
    <h1 class="text-2xl font-bold mb-6">Checkout</h1>

    <!-- Error Message -->
    <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
      {{ errorMsg }}
    </div>

    <!-- Edit Shipping Modal -->
    <div v-if="isEditOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white w-full max-w-[700px] lg:max-w-[900px] p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Edit Shipping Information</h2>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">First Name</label>
              <input
                type="text"
                placeholder="Enter Your First Name"
                v-model="shippingInfo.firstName"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter Your Last Name"
                v-model="shippingInfo.lastName"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                v-model="shippingInfo.phone"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                v-model="shippingInfo.email"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-gray-800 mt-2">Address</label>
            <input
              type="text"
              placeholder="Enter Your Full Address"
              v-model="shippingInfo.address"
              class="w-full border rounded px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <!-- Full-width buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center w-full mt-6">
          <button
            @click="isEditOpen = false"
            class="flex-1 px-4 py-2 border rounded hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            @click="isEditOpen = false"
            class="flex-1 px-4 py-2 bg-primary text-white rounded hover:bg-secondary font-medium transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN LAYOUT -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- LEFT SIDE -->
      <div class="w-full lg:w-3/5 space-y-8">
        <!-- SHIPPING INFO -->
        <div class="bg-white p-6 rounded-xl shadow">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Shipping Information</h2>
            <button
              class="text-primary font-medium hover:underline"
              @click="isEditOpen = true"
            >
              Edit
            </button>
          </div>

          <div class="space-y-2 text-gray-700">
            <p>
              <span class="font-medium">Full Name:</span> 
              {{ shippingInfo.firstName && shippingInfo.lastName 
                ? `${shippingInfo.firstName} ${shippingInfo.lastName}` 
                : "Not provided" }}
            </p>
            <p>
              <span class="font-medium">Phone:</span> 
              {{ shippingInfo.phone || "Not provided" }}
            </p>
            <p>
              <span class="font-medium">Email:</span> 
              {{ shippingInfo.email || "Not provided" }}
            </p>
            <p>
              <span class="font-medium">Address:</span> 
              {{ shippingInfo.address || "Not provided" }}
            </p>
          </div>
        </div>

        <!-- CART ITEMS -->
        <div class="space-y-4">
          <AddCart
            v-for="item in items"
            :key="item._id || item.slug"
            :id="item.product?._id"
            :slug="item.product?.slug"
            :imageUrl="item.product?.imageUrl"
            :name="item.product?.name"
            :price="item.product?.price"
            :stockStatus="item.product?.stockStatus"
            :oldPrice="item.product?.oldPrice"
            :discountPercent="item.product?.discountPercent"
            :category="item.product?.category"
            :brand="item.product?.brand"
            :qty="item.qty"
            mode="checkout"
          />
        </div>
      </div>

      <!-- RIGHT SIDE – ORDER SUMMARY -->
      <div class="w-full lg:w-2/5">
        <div class="bg-white p-6 rounded-xl shadow lg:sticky lg:top-8">
          <h2 class="text-xl font-semibold mb-6">Order Summary</h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>Rs. {{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>Rs. {{ shipping.toFixed(2) }}</span>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs. {{ total.toFixed(2) }}</span>
            </div>
          </div>

          <button
            class="w-full py-3.5 rounded-lg font-medium text-white transition"
            :class="loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary'"
            @click="handlePlaceOrder"
            :disabled="loading"
          >
            {{ loading ? "Placing Order..." : "Place Order" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AddCart from "../components/cart/AddCart.vue";
const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;
const router = useRouter();
const route = useRoute();

const isEditOpen = ref(false);
const loading = ref(false);
const errorMsg = ref("");

const shippingInfo = ref({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: ""
});

const items = ref([]);
const subtotal = ref(0);
const shipping = ref(0);
const total = ref(0);

// Load data
onMounted(() => {
  const checkoutData = route.state || JSON.parse(localStorage.getItem("checkoutData") || "{}");

  if (!checkoutData.items) {
    router.push("/");
    return;
  }

  items.value = checkoutData.items || [];
  subtotal.value = checkoutData.subtotal || 0;
  shipping.value = checkoutData.shipping || 0;
  total.value = checkoutData.total || 0;
});

const handlePlaceOrder = async () => {
  // Validation
  if (
    !shippingInfo.value.firstName.trim() ||
    !shippingInfo.value.lastName.trim() ||
    !shippingInfo.value.phone.trim() ||
    !shippingInfo.value.email.trim() ||
    !shippingInfo.value.address.trim()
  ) {
    errorMsg.value = "Please fill in all shipping information";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      errorMsg.value = "Please login again";
      setTimeout(() => router.push("/login"), 1800);
      return;
    }

    const orderData = {
      items: items.value.map(item => ({
        product: item.product?._id || item._id || item.id,
        qty: item.qty || 1,
        price: item.price || item.product?.price
      })),
      shippingInfo: { ...shippingInfo.value },
      subtotal: subtotal.value,
      shipping: shipping.value,
      totalAmount: total.value
    };

    const response = await fetch(`${SKINORA_API_URL}/api/auth/place-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    // Handle non-JSON responses safely
    let result;
    const contentType = response.headers.get("content-type");

    if (response.ok) {
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response type: ${text || "Empty response"}`);
      }
    } else {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        const text = await response.text();
        throw new Error(`Server error ${response.status}: ${text || response.statusText}`);
      }
      throw new Error(errorData.message || `Failed to place order (${response.status})`);
    }

    // Success
router.push({
  path: "/thank-you",   
  state: { orderId: result.order?._id }
});

  } catch (err) {
    console.error("Order error:", err);
    errorMsg.value = err.message || "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>