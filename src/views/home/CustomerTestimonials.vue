<template>
  <section class="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-10 py-4 rounded-2xl bg-gray-200">
    <div class="container-card">

      <!-- Header -->
      <Header
        title="What Our Customers Say"
        description="Real experiences from customers who trust SkinOra for premium skincare and beauty products."
      />

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center mt-6">
        <div 
          v-for="(item, index) in testimonials" 
          :key="index" 
          class="flex flex-col items-center"
        >
          <h3 class="text-lg font-semibold mb-4">{{ item.title }}</h3>

          <p class="text-sm text-gray-600 mb-6 max-w-xs">{{ item.message }}</p>

          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-20 h-20 rounded-full object-cover mb-4"
          />

          <p class="font-semibold text-sm tracking-wide mb-2 uppercase">{{ item.name }}</p>

          <!-- Stars -->
          <div class="flex gap-1 text-yellow-400">
            <FaStar v-for="i in 5" :key="i" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import Header from "../../components/theme/Header.vue";
import FaStar from '~icons/fa/star'
const testimonials = [
  {
    title: "Express Delivery",
    message:
      "I placed my order easily and received it very fast. The products were excellent and well packed. Highly recommended!",
    name: "Sachini Kaushalya",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    title: "100% Original Products",
    message:
      "I have purchased several products and all of them were original with great results. Thank you for the trusted service.",
    name: "Samadhi Divyanjali",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    title: "High Quality Products",
    message:
      "The service level is outstanding and the product quality is amazing. I am very satisfied and will order again.",
    name: "Shabnam Roomy",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    title: "Best Customer Service",
    message:
      "Their customer support is very friendly and helpful. They always recommend the right products with great results.",
    name: "B G Ruvindya Rashmi",
    image: "https://i.pravatar.cc/150?img=12",
  },
];
</script>
