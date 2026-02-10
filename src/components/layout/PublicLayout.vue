<template>
  <!-- Navbar -->
  <NavBar />

  <!-- Main Content -->
  <main class="container-card mt-20 md:mt-32 ">
    <router-view />
  </main>

  <!-- Footer -->
  <Footer />
</template>

<script setup>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
</script>
