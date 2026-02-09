<template>
  <div class="container-card mt-10 relative">

    <!-- Header -->
    <Header 
      title="Shop by Categories"
      description="Explore our curated selection of beauty categories tailored to your needs."
    />

    <!-- Swiper -->
    <Swiper
      :modules="[Autoplay]"
      :autoplay="{ delay: 3500, disableOnInteraction: false }"
      :spaceBetween="24"
      loop
      :breakpoints="breakpoints"
      class="mt-8"
      @swiper="onSwiper"
      ref="swiperRef"
    >
      <SwiperSlide v-for="item in categories" :key="item.id" class="flex justify-center">
        <CategoryCart
          :img="item.imageUrl"
          :category="item.categoriesName"
          :description="item.description"
          :slug="item.slug"
        />
      </SwiperSlide>
    </Swiper>

    <!-- View All Button -->
    <div class="mt-4 flex items-center justify-center">
      <button 
        @click="navigateToAllCategories"
        class="bg-primary text-white hover:bg-secondary mx-auto block px-5 py-2 rounded-lg font-semibold transition duration-200"
      >
        View All Categories
      </button>
    </div>

    <!-- ⬅ Prev -->
    <button
      @click="slidePrev"
      class="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-secondary p-2 rounded-full shadow transition"
    >
      <Icon icon="mdi:chevron-left" class="w-6 h-6" />
    </button>

    <!-- ➡ Next -->
    <button
      @click="slideNext"
      class="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-secondary p-2 rounded-full shadow transition"
    >
      <Icon icon="mdi:chevron-right" class="w-6 h-6" />
    </button>

  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "../../components/theme/Header.vue";
import CategoryCart from "../../components/cart/CategoryCart.vue";

// Swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules"; // <-- Fix here
import "swiper/css";

// Iconify
import { Icon } from "@iconify/vue";

// API URL
const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

// State
const categories = ref([]);
const swiperRef = ref(null);
const router = useRouter();

// Fetch categories
const fetchCategories = async () => {
  try {
    const res = await fetch(`${SKINORA_API_URL}/api/categories`);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
  }
};

// Lifecycle
onMounted(() => {
  fetchCategories();
});

// Swiper navigation
const slidePrev = () => swiperRef.value?.swiper.slidePrev();
const slideNext = () => swiperRef.value?.swiper.slideNext();

// Breakpoints
const breakpoints = {
  320: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
};

// Swiper instance
const onSwiper = (swiper) => {
  swiperRef.value = swiper;
};

// Navigation
const navigateToAllCategories = () => {
  router.push("/all-categories");
};
</script>
