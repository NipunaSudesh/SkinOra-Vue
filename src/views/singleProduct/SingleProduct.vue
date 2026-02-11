<template>
  <div class="container-card mt-6">

    <!-- Loading -->
    <p v-if="!product" class="text-center mt-10 text-xl text-primary">
      Loading...
    </p>

    <section v-else>
      <div class="flex flex-col md:flex-row gap-6 p-4 items-start">

        <!-- IMAGE -->
        <div class="w-full md:w-1/2 p-4 shadow-lg rounded-lg bg-white">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-[420px] object-contain"
          />
        </div>

        <!-- DETAILS -->
        <div class="w-full md:w-1/2 flex flex-col gap-4">

          <div class="bg-gray-100 p-6 rounded-lg flex flex-col gap-2">

            <!-- BRAND + STOCK -->
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-semibold text-gray-700">{{ product.brand }}</h2>
              <span
                v-if="product.stockStatus"
                :class="`px-3 py-1 rounded-xl text-white text-sm font-medium ${
                  product.stockStatus === 'IN_STOCK' ? 'bg-green-500' : 'bg-red-500'
                }`"
              >
                {{ product.stockStatus.toLowerCase().replace('_', ' ') }}
              </span>
            </div>

            <!-- NAME -->
            <h1 class="text-2xl font-bold text-gray-800">{{ product.name }}</h1>

            <!-- RATING -->
            <div class="flex items-center gap-1">
              <Icon
                v-for="i in 5"
                :key="i"
                :icon="i <= product.rating ? 'mdi:star' : 'mdi:star-outline'"
                class="w-5 h-5"
              />
              <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }} reviews)</span>
            </div>

            <!-- PRICE -->
            <div class="flex items-center gap-3">
              <p v-if="product.oldPrice" class="text-gray-400 line-through">Rs. {{ product.oldPrice }}</p>
              <p v-if="product.discountPercent" class="text-red-500 font-medium">SAVE {{ product.discountPercent }}% OFF</p>
            </div>

            <p class="text-3xl font-bold text-primary">Rs. {{ product.price }}.00</p>

            <!-- QUANTITY + CART + BUY -->
            <div class="flex flex-col lg:flex-row gap-4">
              <div class="flex items-center justify-between rounded-full border border-gray-300 px-4 py-2 w-32">
                <button @click="qty = Math.max(1, qty - 1)">−</button>
                <span class="font-semibold">{{ qty }}</span>
                <button @click="qty = qty + 1">+</button>
              </div>

              <button class="flex-1 rounded-full border px-6 py-3" @click="handleCart">
                Add to cart
              </button>

              <button class="flex-1 rounded-full bg-[#02004f] px-6 py-3 text-white" @click="handleBuyNow">
                Buy now
              </button>
            </div>

            <!-- INFO -->
            <div class="mt-6 space-y-3 text-sm text-gray-700">
              <div class="flex items-center gap-2">
                <Icon icon="mdi:truck" class="w-4 h-4" /> Island-wide shipping available
              </div>
              <div class="flex items-center gap-2">
                <Icon icon="mdi:shield-check" class="w-4 h-4" /> 100% Authentic Products
              </div>
            </div>

          </div>

          <!-- DESCRIPTION -->
          <div class="bg-gray-100 p-6 rounded-lg mt-4">
            <h4 class="underline font-semibold">Description</h4>
            <p class="mt-2">{{ product.longDescription?.overview }}</p>

            <h5 class="underline mt-4 font-semibold">Key Uses</h5>
            <ul class="list-disc list-inside mt-2">
              <li v-for="(use, i) in product.longDescription?.keyUses" :key="i">{{ use }}</li>
            </ul>

            <h5 class="underline mt-4 font-semibold">Key Ingredients</h5>
            <ul class="list-disc list-inside mt-2">
              <li v-for="(ing, i) in product.longDescription?.keyIngredients" :key="i">{{ ing }}</li>
            </ul>

            <h5 class="underline mt-2 font-semibold">How to Use</h5>
            <p class="mt-2">{{ product.longDescription?.howToUse }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- RELATED PRODUCTS -->
    <section class="mt-10" v-if="relatedProducts.length">
      <Header title="You May Also Like" />

      <div class="flex gap-4 mt-8 justify-center flex-wrap">
        <ProductCart
          v-for="item in relatedProducts.slice(0, 10)"
          :key="item._id"
          :slug="item.slug"
          :img-url="item.imageUrl"
          :product-name="item.name"
          :product-desc="item.shortDescription"
          :rating="item.rating"
          :OPrice="item.oldPrice"
          :NPrice="item.price"
          :review-count="item.reviewCount"
        />
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductCart from "../../components/cart/ProductCart.vue";
import Header from "../../components/theme/Header.vue";
import { cartStore } from "../../stores/cart.js";

import { Icon } from "@iconify/vue";

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

const route = useRoute();
const router = useRouter();

const product = ref(null);
const relatedProducts = ref([]);
const qty = ref(1);

const slug = route.params.slug;

// FETCH SINGLE PRODUCT
const fetchProduct = async () => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/products/slug/${slug}`);
    const data = await res.json();
    product.value = data;
  } catch (err) {
    console.error(err);
  }
};

// FETCH RELATED CATEGORY PRODUCTS
const fetchRelated = async () => {
  if (!product.value?.categorySlug) return;
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/categories/${product.value.categorySlug}`);
    const data = await res.json();
    relatedProducts.value = data.filter((p) => p.slug !== product.value.slug);
  } catch (err) {
    console.error(err);
  }
};

// Add to Cart
const handleCart = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const res = await fetch(`${SKINORA_API_URL}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ productId: product.value._id, qty: qty.value }),
    });

    if (!res.ok) throw new Error("Failed to add to cart");
        //  Immediately update store (no refresh needed)
    cartStore.addItem({
      product: {
        _id: product.value._id,
        slug: product.value.slug,
        name: product.value.name,
        imageUrl: product.value.imageUrl,
        price: product.value.price,
      },
      qty: qty.value,
    });

    router.push("/cart");
  } catch (err) {
    console.error(err.message);
  }
};
const handleBuyNow = () => {
  if (!product.value) return;

  const checkoutItem = {
    product: {
      _id: product.value._id,
      slug: product.value.slug,
      name: product.value.name,
      imageUrl: product.value.imageUrl,
      price: product.value.price,
      stockStatus: product.value.stockStatus,
      oldPrice: product.value.oldPrice,
      discountPercent: product.value.discountPercent,
      category: product.value.category,
      brand: product.value.brand,
    },
    qty: qty.value,
  };

  const subtotal = product.value.price * qty.value;
  const shipping = 350;
  const total = subtotal + shipping;

  localStorage.setItem(
    "checkoutData",
    JSON.stringify({
      items: [checkoutItem], 
      subtotal,
      shipping,
      total,
    })
  );

  router.push("/checkout");
};




// ON MOUNT
onMounted(fetchProduct);

// WATCH product to fetch related
watch(product, fetchRelated);
</script>
