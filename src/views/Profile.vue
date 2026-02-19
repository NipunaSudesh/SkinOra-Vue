<template>
  <div v-if="user" class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Message -->
      <div v-if="message" class="bg-green-50 text-green-700 p-4 text-center font-medium">
        {{ message }}
      </div>

      <!-- Title -->
      <h1 class="text-3xl text-primary p-4 font-bold">My Account</h1>

      <!-- Tabs -->
      <div class="bg-gray-50 border-b">
        <div class="flex">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'flex-1 py-4 text-center font-medium transition-colors',
              activeTab === 'profile'
                ? 'bg-white border-b-4 border-primary text-primary'
                : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
            ]"
          >
            Profile
          </button>
          <button
            @click="activeTab = 'orders'"
            :class="[
              'flex-1 py-4 text-center font-medium transition-colors',
              activeTab === 'orders'
                ? 'bg-white border-b-4 border-primary text-primary'
                : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
            ]"
          >
            Orders
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="p-6 md:p-8">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="space-y-8">
          <!-- Avatar & Name -->
          <div class="flex flex-col items-center text-center">
            <img
              :src="avatarUrl"
              alt="Profile"
              class="w-32 h-32 rounded-full border-4 border-primary object-cover shadow-md mb-4"
            />
            <h2 class="text-3xl font-bold text-gray-800">{{ user.name }}</h2>
            <p class="text-gray-500 mt-1">{{ user.email }}</p>
          </div>

          <!-- Account Info -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-semibold mb-4">Account Information</h3>
            <div class="space-y-4 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Role</span>
                <span class="font-medium">User</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Joined</span>
                <span class="font-medium">{{ new Date(user.createdAt || Date.now()).getFullYear() ||'10 Feb 2026' }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              @click="showEdit = true"
              class="bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition font-medium w-full"
            >
              Edit Profile
            </button>
            <button
              @click="handleLogout"
              class="border border-red-500 text-red-500 px-8 py-3 rounded-lg hover:bg-red-50 transition font-medium w-full"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'" class="space-y-6">
          <h3 class="text-xl text-gray-800 font-bold">My Orders</h3>

          <div v-if="loadingOrders" class="text-center py-12 text-gray-500">
            Loading orders...
          </div>
          <div v-else-if="ordersError" class="text-center py-12 text-red-600 font-medium">
            {{ ordersError }}
          </div>
          <div v-else-if="orders.length === 0" class="text-center py-12 text-gray-500">
            No orders yet.
          </div>
          <div v-else class="space-y-6">
            <div
              v-for="(order, index) in orders"
              :key="order._id || index"
              class="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow border-primary relative"
            >
              <div class="flex flex-col sm:flex-row justify-between items-start mb-4 pb-3 border-b">
                <div>
                  <p class="font-bold text-gray-800">
                    Order #{{ order._id?.slice(-8) || index + 1 }}
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    Placed on {{
                      new Date(order.placedAt || order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })
                    }} at {{
                      new Date(order.placedAt || order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                    }}
                  </p>
                </div>

                <span
                  class="text-xs font-semibold px-4 py-2 rounded-xl uppercase"
                  :class="{
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-blue-100 text-blue-800': order.status === 'processing',
                    'bg-indigo-100 text-indigo-800': order.status === 'shipped',
                    'bg-green-100 text-green-800': order.status === 'delivered',
                    'bg-gray-100 text-gray-800': !['pending', 'processing', 'shipped', 'delivered'].includes(order.status)
                  }"
                >
                  {{ order.status }}
                </span>
              </div>
      <!-- Items -->
      <div class="mb-2">
        <p class="text-sm text-gray-900 mb-2 font-semibold">Items</p>
        <div class="space-y-4">
          <div
            v-for="(item, i) in order.items"
            :key="item._id || i"
            class="flex justify-between items-center text-sm border-b border-gray-100  last:border-b-0 last:pb-0"
          >
            <div class="flex-1">
              <p class="font-medium text-gray-800">
                {{ item.product?.name || `Product ${i + 1} (name unavailable)` }}
              </p>
              <p class="text-gray-600 mt-1">
                Qty: {{ item.qty }} × LKR {{ item.price?.toLocaleString() || "—" }}.00
              </p>
            </div>
            <div class="text-right font-medium text-gray-900 whitespace-nowrap">
              LKR {{ (item.qty * (item.price || 0)).toLocaleString() }}.00
            </div>
          </div>
        </div>
      </div>

     <!-- Totals + View Details -->
      <div class="pt-2 border-t space-y-2 text-sm">
        <div class="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>LKR {{ calculateSubtotal(order).toLocaleString() }}.00</span>
        </div>
        <div class="flex justify-between text-gray-700">
          <span>
            Shipping Fee (LKR 350.00 × {{ totalItemQuantity(order) }} item{{ totalItemQuantity(order) !== 1 ? 's' : '' }})
          </span>
          <span>LKR {{ calculateShipping(order).toLocaleString() }}.00</span>
        </div>

      </div>

              <!-- Total + View Details -->
 <div class="flex justify-between pt-4 border-t font-medium text-base items-center">
<div>
            <span>Total Amount : </span>
          <span class="text-gray-900 text-lg">
            LKR {{ calculateGrandTotal(order).toLocaleString() }}.00
          </span>
</div>
          <button
            @click="openOrderDetails(order)"
            class="text-primary hover:text-primary/80 font-medium text-sm underline ml-4 whitespace-nowrap"
          >
            View Details →
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEdit" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        <h3 class="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h3>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              v-model="user.name"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              v-model="user.email"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        <div class="flex gap-4 mt-8">
          <button
            @click="handleSave"
            class="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-secondary font-medium transition"
          >
            Save Changes
          </button>
          <button
            @click="showEdit = false"
            class="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div class="bg-white rounded-xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-gray-800">
            Order Details #{{ selectedOrder._id?.slice(-8) }}
          </h3>
          <button @click="closeOrderDetails" class="text-gray-500 hover:text-gray-800 text-3xl leading-none">
            ×
          </button>
        </div>

        <div class="space-y-6">
          <!-- Order Info -->
          <div class="grid-cols-1 md:grid-cols-1 gap-4 text-sm flex justify-between">
            <div>
              <p class="text-gray-600">Placed on</p>
              <p class="font-medium">
                {{ new Date(selectedOrder.placedAt || selectedOrder.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) }}
              </p>
            </div>
            <div class="flex justify-between">
              <!-- <p class="text-gray-600">Status</p> -->
              <span
                class="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold uppercase text-center"
                :class="{
                  'bg-yellow-100 text-yellow-800': selectedOrder.status === 'pending',
                  'bg-blue-100 text-blue-800': selectedOrder.status === 'processing',
                  'bg-indigo-100 text-indigo-800': selectedOrder.status === 'shipped',
                  'bg-green-100 text-green-800': selectedOrder.status === 'delivered',
                  'bg-gray-100 text-gray-800': !['pending','processing','shipped','delivered'].includes(selectedOrder.status)
                }"
              >
                {{ selectedOrder.status }}
              </span>
            </div>
          </div>

          <!-- Items -->
          <div>
            <h4 class="text-lg font-semibold mb-3">Items</h4>
            <div class="space-y-4">
              <div
                v-for="(item, i) in selectedOrder.items"
                :key="item._id || i"
                class="flex justify-between items-center border-b pb-3 last:border-b-0"
              >
                <div class="flex-1">
                  <p class="font-medium">
                    {{ item.product?.name || `Product ${i + 1} (name unavailable)` }}
                  </p>
                  <p class="text-sm text-gray-600">
                    Qty: {{ item.qty }} × LKR {{ item.price?.toLocaleString() || '—' }}.00
                  </p>
                </div>
                <div class="text-right font-medium">
                  LKR {{ (item.qty * (item.price || 0)).toLocaleString() }}.00
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Info -->
          <div v-if="selectedOrder.shippingInfo">
            <h4 class="text-lg font-semibold mb-3">Shipping Information</h4>
            <div class="text-sm space-y-1 text-gray-700">
              <p>{{ selectedOrder.shippingInfo.firstName }} {{ selectedOrder.shippingInfo.lastName }}</p>
              <p>{{ selectedOrder.shippingInfo.address }}</p>
              <p>Phone: {{ selectedOrder.shippingInfo.phone }}</p>
              <p>Email: {{ selectedOrder.shippingInfo.email }}</p>
            </div>
          </div>

          <!-- Totals -->
          <div class="pt-4 border-t space-y-2 text-sm">
            <div class="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>LKR {{ calculateSubtotal(selectedOrder).toLocaleString() }}.00</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Shipping Fee (LKR 350.00 × {{ totalItemQuantity(selectedOrder) }} item{{ totalItemQuantity(selectedOrder) !== 1 ? 's' : '' }})</span>
              <span>LKR {{ calculateShipping(selectedOrder).toLocaleString() }}.00</span>
            </div>
            <div class="flex justify-between pt-3 border-t font-medium text-base">
              <span>Total Amount</span>
              <span class="text-gray-900 text-lg">
                LKR {{ calculateGrandTotal(selectedOrder).toLocaleString() }}.00
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 flex justify-end">
          <button
            @click="closeOrderDetails"
            class="px-6 py-2 bg-primary hover:bg-secondary text-white rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive states
const storedUser = JSON.parse(localStorage.getItem("user"));
const user = ref(storedUser);
const showEdit = ref(false);
const message = ref("");
const activeTab = ref("profile");
const orders = ref([]);
const loadingOrders = ref(false);
const ordersError = ref(null);
const selectedOrder = ref(null);

// Redirect if no user
onMounted(() => {
  if (!user.value) {
    router.push("/login");
  }
});

// Fetch orders when Orders tab is active
watch(activeTab, (tab) => {
  if (tab === "orders") fetchOrders();
});

// Avatar
const avatarUrl = computed(() => {
  return user.value?.image
    ? user.value.image
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user.value?.name || "U"}`;
});

// Fetch orders
const fetchOrders = async () => {
  if (orders.value.length > 0) return;

  loadingOrders.value = true;
  ordersError.value = null;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/auth/my-orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        message.value = "Session expired. Logging out...";
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }, 1800);
        return;
      }
      throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    }

    const data = await res.json();
    console.log("[Vue] Orders response:", data);

    orders.value = Array.isArray(data.orders) ? data.orders : [];
  } catch (err) {
    console.error("[Vue] Fetch orders failed:", err);
    ordersError.value = "Failed to load orders: " + err.message;
  } finally {
    loadingOrders.value = false;
  }
};

// Order calculations
const totalItemQuantity = (order) =>
  order.items?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

const calculateSubtotal = (order) =>
  order.items?.reduce((sum, item) => sum + (item.qty * (item.price || 0)), 0) || 0;

const calculateShipping = (order) => totalItemQuantity(order) * 350;

const calculateGrandTotal = (order) =>
  order.totalAmount || calculateSubtotal(order) + calculateShipping(order);

// Modal controls
const openOrderDetails = (order) => {
  selectedOrder.value = order;
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
};

// Logout
const handleLogout = () => {
  message.value = "Logged out successfully ✅";
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }, 1200);
};

// Save profile
const handleSave = () => {
  localStorage.setItem("user", JSON.stringify(user.value));
  showEdit.value = false;
  message.value = "Profile updated successfully 🎉";
};
</script>
