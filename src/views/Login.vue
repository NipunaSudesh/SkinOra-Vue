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
          Sign In
        </h2>
        <p class="text-gray-700 text-center">
          Use your email or phone number to sign in
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
            placeholder="Enter Your Password"
            v-model="password"
            required
          />
        </div>

        <p class="text-gray-800 font-serif text-sm">
          By signing in you agree to our
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
          Sign In
        </button>
      </form>

      <!-- Register -->
      <p class="mt-4 text-center text-gray-800 font-serif">
        Don&apos;t have an account?
        <RouterLink
          to="/register"
          class="font-semibold hover:text-secondary underline"
        >
          Register here
        </RouterLink>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

<<<<<<< HEAD
import Typography from "../components/Theme/Typography.vue";
import TextInput from "../components/Theme/TextInput.vue";
=======
import Typography from "../Components/Theme/Typography.vue";
import TextInput from "../Components/Theme/TextInput.vue";
>>>>>>> ac165117a7417c26e5ae8f2328d1301b76aa000c
import { logo } from "../assets/images";

const router = useRouter();
const SKINORA_API_URL = import.meta.env.VITE_SKINORA_API_URL;

const email = ref("");
const password = ref("");
const message = ref("");
const messageType = ref("");

const handleSubmit = async () => {
  message.value = "";

  try {
    const res = await axios.post(
      `${SKINORA_API_URL}/api/auth/login`,
      {
        email: email.value,
        password: password.value,
      }
    );

    console.log("Login:", res.data);

    message.value = "Login successful! Redirecting...";
    messageType.value = "success";

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setTimeout(() => {
      router.push("/");
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
