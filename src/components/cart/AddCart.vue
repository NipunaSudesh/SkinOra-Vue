<script setup>
import { FaTrash } from "vue-icons/fa"; 
// If you don’t have vue-icons, see note below

defineProps({
  id: [String, Number],
  imageUrl: String,
  name: String,
  price: Number,
  slug: String,
  oldPrice: Number,
  discountPercent: Number,
  stockStatus: String,
  category: String,
  brand: String,
  qty: Number,
  checked: Boolean,
  mode: {
    type: String,
    default: "cart",
  },
});

/* Emits */
const emit = defineEmits([
  "select",
  "qty-change",
  "remove",
]);
</script>

<template>
  <div
    :key="slug"
    class="flex gap-4 bg-white p-4 rounded-lg shadow"
  >
    <!-- CHECKBOX -->
    <input
      v-if="mode === 'cart'"
      type="checkbox"
      :checked="checked"
      @change="emit('select')"
      class="w-5 h-5"
    />

    <img
      :src="imageUrl"
      :alt="name"
      class="w-24 h-24 object-contain"
    />

    <div class="flex-1">
      <p class="text-xs text-gray-700">
        {{ category }} &gt; {{ brand }}
      </p>

      <div class="flex justify-between">
        <h3 class="font-semibold">
          {{ name }}
          <span class="text-red-500">
            ({{ discountPercent }}% OFF)
          </span>
        </h3>

        <span
          v-if="stockStatus"
          class="px-3 py-1 rounded-xl text-white text-sm font-medium"
          :class="stockStatus === 'IN_STOCK' ? 'bg-green-500' : 'bg-red-500'"
        >
          {{ stockStatus.toLowerCase().replace("_", " ") }}
        </span>
      </div>

      <div class="flex items-end gap-3">
        <p
          v-if="oldPrice"
          class="text-sm text-gray-400 line-through"
        >
          Rs. {{ oldPrice }}.00
        </p>

        <p class="text-xl font-bold text-primary">
          Rs. {{ price }}.00
        </p>
      </div>

      <div class="flex items-center gap-3 mt-3">
        <!-- QTY CONTROLS -->
        <div v-if="mode === 'cart'" class="flex items-center gap-2">
          <button
            @click="emit('qty-change', slug, qty - 1)"
            :disabled="qty <= 1"
            class="px-3 py-1 border rounded disabled:opacity-50"
          >
            −
          </button>

          <span class="min-w-[20px] text-center">
            {{ qty }}
          </span>

          <button
            @click="emit('qty-change', slug, qty + 1)"
            class="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>

        <span
          v-else
          class="font-medium text-gray-700"
        >
          Qty: {{ qty }}
        </span>

        <!-- REMOVE BUTTON -->
        <button
          v-if="mode === 'cart'"
          @click="emit('remove', slug)"
          class="ml-auto text-red-500"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  </div>
</template>
