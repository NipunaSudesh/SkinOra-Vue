<template>
  <section class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">

      <!-- Icon -->
      <Icon
        icon="mdi:check-circle"
        class="w-16 h-16 text-green-500 mx-auto mb-4"
      />

      <h1 class="text-2xl font-bold mb-2">
        Thank You for Your Order!
      </h1>

      <p class="text-gray-600 mb-6">
        Your order has been placed successfully.
        We’ll contact you soon with delivery details.
      </p>

      <button
        @click="goHome"
        class="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 transition"
      >
        Continue Shopping
      </button>

    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router"
import { Icon } from "@iconify/vue"

const router = useRouter()

const goHome = () => {
  router.push("/")
}
</script>
