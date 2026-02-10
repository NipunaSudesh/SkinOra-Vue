<template>
  <div class="min-h-screen mt-10 flex items-center justify-center px-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

      <!-- IMAGE -->
      <div class="hidden lg:flex justify-center">
        <img
          :src="contactUs"
          alt="Contact Us"
          class="w-full h-[650px] max-w-lg object-contain rounded-2xl"
        />
      </div>

      <!-- FORM -->
      <div class="flex justify-center">
        <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6 border-primary border">
          <h1 class="text-2xl font-bold text-primary mb-4 text-center">
            Contact Us
          </h1>

          <!-- Message -->
          <div
            v-if="message"
            class="mb-4 text-center text-green-600 font-medium"
          >
            {{ message }}
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="text-gray-700">Name</label>
              <input
                type="text"
                required
                class="w-full border rounded-lg p-2 mt-1"
                placeholder="Your name"
              />
            </div>

            <div>
              <label class="text-gray-700">Email</label>
              <input
                type="email"
                required
                class="w-full border rounded-lg p-2 mt-1"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="text-gray-700">Message</label>
              <textarea
                rows="4"
                required
                class="w-full border rounded-lg p-2 mt-1"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
            >
              Send Message
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-600">
            <p>Email: support@skinora.com</p>
            <p>Phone: +94 77 123 4567</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { contactUs } from "../assets/images";

const message = ref("");

const handleSubmit = () => {
  message.value = "Thank you for contacting us! We’ll get back to you soon 😊";

  setTimeout(() => {
    message.value = "";
  }, 3000);
};
</script>
