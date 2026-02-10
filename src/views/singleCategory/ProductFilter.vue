<template>
  <aside class="bg-gray-100 border rounded-xl p-5">
    <!-- Header -->
    <div class="flex justify-between mb-4">
      <h3 class="text-xl font-semibold text-primary">Filters</h3>
      <button
        @click="clearAll"
        class="flex items-center gap-1 text-sm text-secondary hover:underline"
      >
        <Icon icon="mdi:refresh" class="w-4 h-4" />
        Clear All
      </button>
    </div>

    <!-- Categories (optional) -->
    <div v-if="!hideCategory" class="mb-6">
      <h4 class="font-semibold mb-3">Categories</h4>
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

    <!-- Country -->
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
      <h4 class="font-semibold mb-3">Brands</h4>
      <div class="space-y-2 max-h-52 overflow-y-auto">
        <label
          v-for="brand in BRANDS"
          :key="brand"
          class="flex items-center gap-2 text-sm"
        >
          <input type="checkbox" :value="brand" v-model="localFilters.brands" />
          {{ brand }}
        </label>
      </div>
    </div>

    <!-- Availability -->
    <div>
      <h4 class="font-semibold mb-3">Availability</h4>
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" v-model="localFilters.inStock" />
        In Stock
      </label>
    </div>
  </aside>
</template>

<script setup>
import { reactive, watch } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  filters: Object,
  hideCategory: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:filters"]);

// Static Data
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

// Local copy of filters for two-way binding
const localFilters = reactive({ ...props.filters });

// Sync with parent component
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
</script>
