<template>
  <footer class="bg-[#02004f] text-white pt-16 pb-8 mt-10">
    <div class="container-card">

      <!-- MAIN GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        <!-- LOGO -->
        <div class="flex flex-col items-center lg:items-start">
          <router-link to="/" class="flex items-center bg-white rounded-md py-2 w-[200px]">
            <img :src="logo" alt="Skinora Logo" class="h-12" />
            <h2 class="text-lg font-bold text-primary">
              Skin<span class="text-secondary">Ora</span>
            </h2>
          </router-link>

          <div class="flex gap-5 mt-6 text-xl">
            <Icon :icon="facebookIcon" class="hover:text-secondary cursor-pointer w-5 h-5" />
            <Icon :icon="instagramIcon" class="hover:text-secondary cursor-pointer w-5 h-5" />
            <Icon :icon="tiktokIcon" class="hover:text-secondary cursor-pointer w-5 h-5" />
          </div>
        </div>

        <!-- CUSTOMER SERVICE -->
        <div>
          <h4 class="font-semibold mb-4">Customer Service</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><router-link to="#">Deliveries</router-link></li>
            <li><router-link to="#">FAQ</router-link></li>
            <li><router-link to="/profile">My Account</router-link></li>
            <li><router-link to="#">Track Order</router-link></li>
          </ul>
        </div>

        <!-- PRODUCTS -->
        <div>
          <h4 class="font-semibold mb-4">Products</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><router-link to="/all-products">Shop All</router-link></li>
            <li><router-link to="/all-products">New Arrivals</router-link></li>
            <li><router-link to="/all-products">Best Sellers</router-link></li>
            <li><router-link to="/all-categories">Brands</router-link></li>
            <li><router-link to="/all-categories">Categories</router-link></li>
          </ul>
        </div>

        <!-- ABOUT US -->
        <div>
          <h4 class="font-semibold mb-4">About Us</h4>
          <ul class="space-y-3 text-sm text-gray-300">
            <li><router-link to="/about">Our Story</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
            <li><router-link to="/terms">Terms & Conditions</router-link></li>
          </ul>
        </div>

        <!-- COMPANY INFO -->
        <div>
          <h4 class="font-semibold mb-4">Company Info</h4>

          <div class="flex items-start gap-3 text-sm text-gray-300 mb-3">
            <Icon :icon="mapIcon" class="text-secondary mt-1 w-5 h-5" />
            <span>Colombo, Sri Lanka</span>
          </div>

          <div class="flex items-start gap-3 text-sm text-gray-300 mb-3">
            <Icon :icon="envelopeIcon" class="text-secondary mt-1 w-5 h-5" />
            <span>info@skinora.lk</span>
          </div>

          <div class="flex items-start gap-3 text-sm text-gray-300">
            <Icon :icon="phoneIcon" class="text-secondary mt-1 w-5 h-5" />
            <div>
              <p>076 652 1815</p>
              <p class="text-xs text-gray-400">(8am – 8pm Daily)</p>
            </div>
          </div>
        </div>

      </div>

      <!-- BOTTOM BAR -->
      <div class="border-t border-white/10 mt-12 pt-6 text-center text-xs text-gray-400">
        © {{ new Date().getFullYear() }} SkinOra.lk. All rights reserved.
      </div>

    </div>
  </footer>
</template>

<script setup>
import { logo } from "../../assets/images/index.js";
import { Icon } from '@iconify/vue'

// Social Icons
const facebookIcon = 'fa-brands:facebook-f'
const instagramIcon = 'fa-brands:instagram'
const tiktokIcon = 'fa-brands:tiktok'

// Contact Icons
const mapIcon = 'fa-solid:map-marker-alt'
const envelopeIcon = 'fa-solid:envelope'
const phoneIcon = 'fa-solid:phone'
</script>
