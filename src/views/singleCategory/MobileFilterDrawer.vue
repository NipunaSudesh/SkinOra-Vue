<template>
  <div v-if="isOpen">
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black/40 z-40"
      @click="onClose"
    ></div>

    <!-- Drawer -->
    <aside class="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 p-5 overflow-y-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-primary">Filters</h3>
        <button @click="onClose">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <!-- Categories -->
      <div v-if="!hideCategory" class="mb-6">
        <h4 class="font-semibold mb-2">Categories</h4>
        <select
          class="w-full border rounded-lg px-3 py-2"
          v-model="localFilters.category"
        >
          <option value="">All Categories</option>
          <option v-for="cat in CATEGORIES" :key="cat.slug" :value="cat.slug">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Countries -->
      <div class="mb-6">
        <h4 class="font-semibold mb-3">Country</h4>
        <select
          class="w-full border rounded-lg px-3 py-2"
          v-model="localFilters.country"
        >
          <option value="">All Countries</option>
          <option v-for="country in COUNTRIES" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
      </div>

      <!-- Brands -->
      <div class="mb-6">
        <h4 class="font-semibold mb-2">Brands</h4>
        <div class="space-y-2">
          <label
            v-for="brand in BRANDS"
            :key="brand"
            class="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              :value="brand"
              v-model="localFilters.brands"
            />
            {{ brand }}
          </label>
        </div>
      </div>

      <!-- Availability -->
      <div class="mb-6">
        <h4 class="font-semibold mb-2">Availability</h4>
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" v-model="localFilters.inStock" />
          In Stock
        </label>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 mt-6">
        <button
          @click="clearAll"
          class="flex-1 border rounded-lg py-2 text-sm"
        >
          Clear All
        </button>
        <button
          @click="applyFilters"
          class="flex-1 bg-primary text-white rounded-lg py-2 text-sm"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  isOpen: Boolean,
  onClose: Function,
  filters: Object,
  hideCategory: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:filters"]);

const CATEGORIES = [
  { name: "Baby Care", slug: "baby-care" },
  { name: "Body Care", slug: "body-care" },
  { name: "Face Care", slug: "face-care" },
  { name: "Hair Care", slug: "hair-care" },
  { name: "Sunscreens", slug: "sunscreens" },
  { name: "Serums", slug: "serums" },
  { name: "Men's Grooming", slug: "mens-grooming" },
];

const COUNTRIES = [
  { name: "Australia", code: "AU" },
  { name: "Canada", code: "CA" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Japan", code: "JP" },
  { name: "Singapore", code: "SG" },
  { name: "South Korea", code: "KR" },
  { name: "Sri Lanka", code: "LK" },
  { name: "United Kingdom", code: "UK" },
  { name: "United States", code: "US" },
];

const BRANDS = [
  "L'Oréal Men Expert",
  "Gillette",
  "Nivea",
  "Dove",
  "CeraVe",
  "Cetaphil",
  "Garnier",
  "OGX",
  "Old Spice",
  "Brut",
];

// Local copy of filters
const localFilters = reactive({ ...props.filters });

// Sync changes to parent
watch(
  localFilters,
  (newVal) => {
    emit("update:filters", { ...newVal });
  },
  { deep: true }
);

const clearAll = () => {
  localFilters.category = "";
  localFilters.country = "";
  localFilters.brands = [];
  localFilters.inStock = false;
};

const applyFilters = () => {
  emit("update:filters", { ...localFilters });
  props.onClose();
};
</script>
