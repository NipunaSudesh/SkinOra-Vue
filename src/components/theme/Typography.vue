<template>
  <component :is="Component" :class="combinedClasses">
    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";

// Props
const props = defineProps({
  variant: {
    type: String,
    default: "p",
  },
  className: {
    type: String,
    default: "",
  },
});

// Determine HTML element
const Component = computed(() => {
  switch (props.variant) {
    case "h1":
    case "display-1":
    case "display-2":
    case "display-3":
    case "display-4":
    case "display-5":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    default:
      return "p";
  }
});

// Determine Tailwind classes
const classes = computed(() => {
  switch (props.variant) {
    case "display-1":
      return "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight";
    case "display-2":
      return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight";
    case "display-3":
      return "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight";
    case "display-4":
      return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight";
    case "display-5":
      return "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight";
    case "h1":
      return "text-3xl sm:text-4xl md:text-5xl font-medium";
    case "h2":
      return "text-2xl sm:text-3xl md:text-4xl font-medium";
    case "h3":
      return "text-xl sm:text-2xl md:text-3xl font-medium";
    case "h4":
      return "text-lg sm:text-xl md:text-2xl font-medium";
    case "h5":
      return "text-base sm:text-lg md:text-xl font-medium";
    case "h6":
      return "text-sm sm:text-base md:text-lg font-medium";
    case "large":
      return "text-lg md:text-xl lg:text-2xl";
    case "hero":
      return "text-base md:text-lg lg:text-xl";
    case "medium":
      return "text-base md:text-lg font-medium";
    case "base-text":
      return "text-base md:text-lg";
    case "small":
      return "text-sm md:text-base";
    default:
      return "text-base font-normal";
  }
});

// Combine with additional className
const combinedClasses = computed(() => `${classes.value} ${props.className}`.trim());
</script>
