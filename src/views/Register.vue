<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md p-6 rounded-xl shadow-xl">

      <!-- Logo -->
      <div class="flex flex-col items-center">
        <RouterLink to="/" class="flex items-center">
          <img :src="logo" alt="Skinora Logo" class="h-20 w-auto" />
          <Typography
            variant="h1"
            class="text-2xl font-bold text-primary whitespace-nowrap"
          >
            Skin<span class="text-secondary">Ora</span>
          </Typography>
        </RouterLink>

        <h2 class="mt-4 text-4xl font-semibold text-primary">
          Create Account
        </h2>
        <p class="text-gray-700 text-center">
          Fill in the details to create your account
        </p>
      </div>

      <!-- Message -->
      <div
        v-if="message"
        class="mt-6 p-3 text-sm rounded-lg text-center"
        :class="messageType === 'success'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'"
      >
        {{ message }}
      </div>

      <!-- FORM -->
      <form @submit.prevent="handleSubmit" class="flex flex-col mt-8 space-y-4">

        <div>
          <label class="text-gray-800">Full Name</label>
          <TextInput
            size="medium"
            placeholder="John Doe"
            v-model="name"
            required
          />
        </div>

        <div>
          <label class="text-gray-800">Email Address</label>
          <TextInput
            size="medium"
            type="email"
            placeholder="your@gmail.com"
            v-model="email"
            required
          />
        </div>

        <div>
          <label class="text-gray-800">Password</label>
          <TextInput
            size="medium"
            type="password"
            placeholder="Create a password"
            v-model="password"
            required
          />
        </div>

        <div>
          <label class="text-gray-800">Confirm Password</label>
          <TextInput
            size="medium"
            type="password"
            placeholder="Confirm password"
            v-model="confirmPassword"
            required
          />
        </div>

        <p class="text-gray-800 font-serif text-sm">
          By creating an account you agree to our
          <RouterLink
            to="/terms"
            class="font-semibold hover:text-secondary underline"
          >
            Terms & Conditions
          </RouterLink>.
        </p>

        <button
          type="submit"
          class="mt-8 bg-primary text-white hover:bg-secondary mx-auto block px-5 py-2 rounded-lg font-semibold transition w-full duration-200"
        >
          Register
        </button>
      </form>

      <!-- Login -->
      <p class="mt-4 text-center text-gray-800 font-serif">
        Already have an account?
        <RouterLink
          to="/login"
          class="font-semibold hover:text-secondary underline"
        >
          Sign in here
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import Typography from "../Components/Theme/Typography.vue";
import TextInput from "../Components/Theme/TextInput.vue";
import { logo } from "../assets/images";

const router = useRouter();
const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const message = ref("");
const messageType = ref("");

const handleSubmit = async () => {
  message.value = "";

  if (password.value !== confirmPassword.value) {
    message.value = "Passwords do not match";
    messageType.value = "error";
    setTimeout(() => (message.value = ""), 3000);
    return;
  }

  try {
    const res = await axios.post(
      `${SKINORA_API_URL}/api/auth/register`,
      {
        name: name.value,
        email: email.value,
        password: password.value,
      }
    );

    console.log("Registered:", res.data);

    message.value = "Registration successful! Redirecting to login...";
    messageType.value = "success";

    setTimeout(() => {
      router.push("/login");
    }, 1500);

    setTimeout(() => (message.value = ""), 3000);

  } catch (error) {
    message.value =
      error.response?.data?.message || "Something went wrong";
    messageType.value = "error";

    setTimeout(() => (message.value = ""), 3000);
  }
};
</script>
