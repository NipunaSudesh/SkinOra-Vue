<template>
  <div class="group w-64 bg-white rounded-xl shadow-md border border-gray-300 hover:shadow-2xl transition-all duration-300">
    <!-- Image -->
    <div class="relative w-full h-60 overflow-hidden rounded-t-xl">
      <img
        :src="imgUrl"
        :alt="productName"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <!-- Hover Actions -->
      <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="flex gap-4">
          <button @click.stop.prevent="handleLike" class="p-3 bg-white rounded-full shadow hover:scale-110 transition">
            <FaHeart :class="liked ? 'text-red-500' : 'text-gray-600'" size="20" />
          </button>
          <button @click.stop.prevent="handleShare" class="p-3 bg-white rounded-full shadow hover:scale-110 transition">
            <FaShare size="18" class="text-gray-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-1 p-4">
      <h4 class="font-semibold text-lg text-primary line-clamp-2 min-h-[60px]">
        {{ productName }}
      </h4>
      <p class="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
        {{ productDesc }}
      </p>

      <!-- Rating -->
      <div class="flex gap-1 mt-1">
        <CiStar v-for="i in 5" :key="i" :class="i <= rating ? 'text-secondary text-lg' : 'text-gray-300 text-lg'" />
        <p class="text-sm text-gray-500">({{ reviewCount }} reviews)</p>
      </div>

      <!-- Price -->
      <div class="flex items-end gap-3 mt-2">
        <p v-if="OPrice" class="text-sm text-gray-400 line-through">Rs. {{ OPrice }}</p>
        <p class="text-xl font-bold text-primary">Rs. {{ NPrice }}</p>
      </div>

      <!-- Add to Cart -->
      <button
        @click.stop.prevent="handleCart"
        class="mt-4 flex items-center justify-center gap-2 bg-secondary hover:bg-primary text-white py-2 rounded-lg font-semibold shadow transition active:scale-95"
      >
        <FaShoppingCart size="16" />
        Add To Cart
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import FaHeart from '~icons/fa/heart';
import FaShare from '~icons/fa/share-alt';
import CiStar from '~icons/ci/star';
import FaShoppingCart from '~icons/fa/shopping-cart';

const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

// Props
const {
  id,
  slug,
  OPrice,
  NPrice,
  imgUrl,
  productName,
  productDesc,
  rating = 0,
  reviewCount = 0,
} = defineProps({
  id: [String, Number],
  slug: String,
  OPrice: Number,
  NPrice: Number,
  imgUrl: String,
  productName: String,
  productDesc: String,
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

const liked = ref(false);
const router = useRouter();

// Toggle like
const handleLike = () => {
  liked.value = !liked.value;
};

// Placeholder share
const handleShare = () => {
  alert("Share functionality not implemented");
};

// Add to Cart
const handleCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const res = await fetch(`${SKINORA_API_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id, qty: 1 }),
    });

    if (!res.ok) throw new Error("Failed to add to cart");

    alert("Product added to cart successfully!");
    router.push("/cart");
  } catch (error) {
    console.error("Add to cart error:", error.message);
    alert("Failed to add to cart");
  }
};
</script>
