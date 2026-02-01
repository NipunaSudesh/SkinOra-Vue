<template>
  <input
    v-bind="$attrs"
    :class="`${className} ${sizeClass} block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  className: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: "normal"
  }
});

// Map size prop to Tailwind classes
const sizeClasses = {
  normal: "py-3 px-5",
  large: "py-4 px-6",
  medium: "py-2 px-5",
  small: "py-1.5 px-3",
  ex_small: "py-1.5 px-3 text-sm"
};

const sizeClass = computed(() => (props.size ? sizeClasses[props.size] : ""));
</script>
