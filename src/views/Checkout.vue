<template>
  <section class="w-full mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Checkout</h1>

    <!-- Edit Shipping Modal -->
    <div
      v-if="isEditOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
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
                class="w-full border rounded px-3 py-2"
              />
            </div>

            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter Your Last Name"
                v-model="shippingInfo.lastName"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">Phone Number</label>
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                v-model="shippingInfo.phone"
                class="w-full border rounded px-3 py-2"
              />
            </div>

            <div class="flex flex-col w-full">
              <label class="text-gray-800 mt-2">Email</label>
              <input
                type="text"
                placeholder="Enter Your Email"
                v-model="shippingInfo.email"
                class="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <label class="text-gray-800 mt-2">Address</label>
            <input
              type="text"
              placeholder="Enter Your Address"
              v-model="shippingInfo.address"
              class="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button @click="isEditOpen = false" class="px-4 py-2 border rounded">
            Cancel
          </button>
          <button @click="isEditOpen = false" class="px-4 py-2 bg-primary text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN LAYOUT -->
    <div class="flex flex-col lg:flex-row gap-6">

      <!-- LEFT SIDE -->
      <div class="w-full lg:w-3/5 space-y-8">
        <!-- SHIPPING INFO -->
        <div class="bg-white p-4 rounded-lg shadow">
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold">Shipping Information</h2>
            <button
              class="text-blue-500 font-medium hover:underline"
              @click="isEditOpen = true"
            >
              Edit
            </button>
          </div>

          <div class="flex flex-col gap-2">
            <p>
              Full Name:
              <span class="font-medium">{{ shippingInfo.firstName || "null" }} {{ shippingInfo.lastName || "" }}</span>
            </p>
            <p>
              Phone Number:
              <span class="font-medium">{{ shippingInfo.phone || "null" }}</span>
            </p>
            <p>
              Email:
              <span class="font-medium">{{ shippingInfo.email || "null" }}</span>
            </p>
            <p>
              Address:
              <span class="font-medium">{{ shippingInfo.address || "null" }}</span>
            </p>
          </div>
        </div>

        <!-- CART ITEMS -->
        <div class="space-y-4">
<AddCart
  v-for="item in items"
            :key="item._id"
            :id="item.product._id"
            :slug="item.product.slug"
            :imageUrl="item.product.imageUrl"
            :name="item.product.name"
            :price="item.product.price"
            :stockStatus="item.product.stockStatus"
            :oldPrice="item.product.oldPrice"
            :discountPercent="item.product.discountPercent"
            :category="item.product.category"
            :brand="item.product.brand"
            :qty="item.qty"
  mode="checkout"
/>

        </div>
      </div>

      <!-- RIGHT SIDE – ORDER SUMMARY -->
      <div class="w-full lg:w-2/5">
        <div class="bg-white p-6 rounded-lg shadow lg:sticky lg:top-24">
          <h2 class="text-lg font-semibold mb-4">Order Summary</h2>

          <div class="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs. {{ subtotal }}.00</span>
          </div>

          <div class="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Rs. {{ shipping }}.00</span>
          </div>

          <hr class="mb-4" />

          <div class="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>Rs. {{ total }}.00</span>
          </div>

          <button
            class="w-full bg-primary text-white py-3 rounded-lg"
            @click="handlePlaceOrder"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import AddCart from "../components/cart/AddCart.vue";

const router = useRouter();

const isEditOpen = ref(false);
const shippingInfo = reactive({
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

onMounted(() => {
  const data = JSON.parse(localStorage.getItem("checkoutData") || "null");
  if (!data) {
    router.push("/"); // redirect if no checkout data
    return;
  }

  items.value = data.items || [];
  subtotal.value = data.subtotal || 0;
  shipping.value = data.shipping || 0;
  total.value = data.total || 0;
});

const handlePlaceOrder = () => {
  localStorage.removeItem("checkoutData"); // clear after order
  router.push("/thank-you");
};
</script>

