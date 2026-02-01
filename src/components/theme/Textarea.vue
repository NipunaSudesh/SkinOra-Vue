<template>
  <textarea
    :class="`block w-full ${sizeClass} border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${resizeStyle} ${className}`"
    :placeholder="placeholder"
    :rows="rows"
    v-bind="$attrs"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  placeholder: String,
  className: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: "normal"
  },
  rows: Number,
  resize: String
});

// Compute resize style
const resizeStyle = computed(() => (props.resize ? `resize-${props.resize}` : "resize-none"));

// Compute size classes
const sizeClasses = {
  normal: "py-3 px-5",
  large: "py-4 px-6",
  medium: "py-2 px-5",
  small: "py-1.5 px-3"
};

const sizeClass = computed(() => (props.size ? sizeClasses[props.size] : ""));
</script>
