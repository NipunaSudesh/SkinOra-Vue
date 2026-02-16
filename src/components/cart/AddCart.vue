<template>
  <div class="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow">
    <!-- CHECKBOX -->
    <input
      v-if="mode === 'cart'"
      type="checkbox"
      :checked="selected"
      @change="$emit('select')"
      class="w-5 h-5"
    />

    <!-- Product Image -->
    <div class="flex ">
      <img :src="imageUrl" :alt="name" class=" sm:w-24 h-40 sm:h-24 object-contain rounded bg-red-200" />

      <span
        v-if="stockStatus"
        class="inline-block sm:hidden h-8 px-3 py-1 rounded-xl text-white text-sm font-medium"
        :class="stockStatus === 'IN_STOCK' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ stockStatus.toLowerCase().replace('_', ' ') }}
      </span>
    </div>
    <div class="flex-1">
      <!-- Category & Brand -->
      <p class="text-xs text-gray-700">
        {{ category }} &gt; {{ brand }}
      </p>

      <!-- Name & Stock Status -->
      <div class="flex justify-between">
        <h3 class="font-semibold">
          {{ name }}
          <span v-if="discountPercent" class="text-red-500">({{ discountPercent }}% OFF)</span>
        </h3>

        <span
          v-if="stockStatus"
          :class="[
            'hidden sm:inline-block px-3 py-1 rounded-xl text-white text-sm font-medium',
            stockStatus === 'IN_STOCK' ? 'bg-green-500' : 'bg-red-500'
          ]"
        >
          {{ stockStatus.toLowerCase().replace('_', ' ') }}
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-end gap-3">
        <p v-if="oldPrice" class="text-sm text-gray-400 line-through">Rs. {{ oldPrice }}.00</p>
        <p class="text-xl font-bold text-primary">Rs. {{ price }}.00</p>
      </div>

      <!-- Quantity & Remove -->
      <div class="flex items-center gap-3 mt-3">
        <div v-if="mode === 'cart'" class="flex items-center gap-2">
          <button
            @click="changeQty(qty - 1)"
            :disabled="qty <= 1"
            class="px-3 py-1 border rounded disabled:opacity-50"
          >
            −
          </button>

          <span class="min-w-[20px] text-center">{{ qty }}</span>

          <button
            @click="changeQty(qty + 1)"
            class="px-3 py-1 border rounded"
          >
            +
          </button>
        </div>

        <span v-else class="font-medium text-gray-700">Qty: {{ qty }}</span>

        <button
          v-if="mode === 'cart'"
          @click="$emit('remove', slug)"
          class="ml-auto text-red-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 7V4a1 1 0 011-1h2a1 1 0 011 1v3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  id: Number,
  imageUrl: String,
  name: String,
  price: Number,
  slug: String,
  oldPrice: Number,
  discountPercent: Number,
  stockStatus: String,
  category: String,
  brand: String,
  qty: {
    type: Number,
    default: 1
  },
  selected: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    default: "cart"
  }
});

// Emits
const emit = defineEmits(["qty-change", "remove", "select"]);

// Methods
const changeQty = (newQty) => {
  if (newQty < 1) return;
  emit("qty-change", props.slug, newQty);
};
</script>
