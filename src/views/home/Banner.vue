<template>
  <div class="relative">
    <Swiper
      :modules="[Autoplay, Pagination]"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      loop
      class="w-full rounded-lg shadow-lg"
      @swiper="onSwiperInit"
    >
      <SwiperSlide v-for="item in banners" :key="item.id">
        <img
          :src="item.img"
          :alt="item.alt"
          class="w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[450px] object-cover rounded-lg"
        />
      </SwiperSlide>
    </Swiper>

    <!-- Previous Button -->
    <button
      @click="swiperInstance?.slidePrev()"
      class="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-secondary text-gray-800 p-2 rounded-full shadow transition"
    >
      <Icon icon="mdi:chevron-left" :width="22" :height="22" />
    </button>

    <!-- Next Button -->
    <button
      @click="swiperInstance?.slideNext()"
      class="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-secondary text-gray-800 p-2 rounded-full shadow transition"
    >
      <Icon icon="mdi:chevron-right" :width="22" :height="22" />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Icon } from "@iconify/vue";

import { banner1, banner2, banner3, banner4, banner5 } from "../../assets/images";

const banners = [
  { id: 1, img: banner1, alt: "Skinora Banner 1" },
  { id: 2, img: banner2, alt: "Skinora Banner 2" },
  { id: 3, img: banner5, alt: "Skinora Banner 5" },
  { id: 4, img: banner3, alt: "Skinora Banner 3" },
  { id: 5, img: banner4, alt: "Skinora Banner 4" },
];

// This will hold the actual Swiper instance
const swiperInstance = ref(null);

// Called when Swiper is initialized
function onSwiperInit(swiper) {
  swiperInstance.value = swiper;
}
</script>
