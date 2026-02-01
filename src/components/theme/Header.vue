<template>
  <div class="mt-10 mb-5 w-full border-gray-500 flex flex-col justify-center items-center">
    <h2 class="text-4xl font-semibold uppercase text-primary">{{ title }}</h2>
    <p class="text-gray-700">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
});
</script>
