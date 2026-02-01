<template>
  <button :class="`${base} ${styles[variant]}`">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

// Props
defineProps({
  variant: {
    type: String,
    default: "primary",
  },
});

// Base styles
const base = "px-5 py-2 rounded-lg font-semibold transition duration-200";

// Variant styles
const styles = {
  primary: "bg-primary text-white hover:bg-blue-700",
  secondary: "bg-secondary text-black hover:bg-yellow-500",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
};
</script>
