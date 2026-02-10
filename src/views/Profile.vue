<template>
  <!-- Only render if user exists -->
  <div v-if="user" class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

      <!-- Message -->
      <div v-if="message" class="mb-4 text-center text-green-600 font-medium">
        {{ message }}
      </div>

      <!-- Avatar -->
      <div class="flex flex-col items-center">
        <img
          :src="avatarUrl"
          alt="Profile"
          class="w-24 h-24 rounded-full border-4 border-primary object-cover"
        />
        <h2 class="mt-4 text-2xl font-semibold text-gray-800">{{ user.name }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
      </div>

      <!-- Info -->
      <div class="mt-6 space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Role</span>
          <span class="font-medium">User</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Joined</span>
          <span class="font-medium">{{ new Date(user.createdAt).getFullYear() }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex flex-col gap-3">
        <button
          @click="showEdit = true"
          class="bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
        >
          Edit Profile
        </button>
        <button
          @click="handleLogout"
          class="border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>

      <!-- Edit Modal -->
      <div v-if="showEdit" class="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div class="bg-white p-5 rounded-lg w-full max-w-sm">
          <h3 class="text-lg font-semibold mb-4">Edit Profile</h3>

          <input
            type="text"
            v-model="user.name"
            class="w-full border rounded p-2 mb-3"
            placeholder="Name"
          />

          <input
            type="email"
            v-model="user.email"
            class="w-full border rounded p-2 mb-4"
            placeholder="Email"
          />

          <div class="flex gap-2">
            <button
              @click="handleSave"
              class="flex-1 bg-primary text-white py-2 rounded"
            >
              Save
            </button>
            <button
              @click="showEdit = false"
              class="flex-1 border py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

// Router
const router = useRouter();

// Reactive states
const storedUser = JSON.parse(localStorage.getItem("user"));
const user = ref(storedUser);
const showEdit = ref(false);
const message = ref("");

// Redirect to login if no user
onMounted(() => {
  if (!user.value) {
    router.push("/login");
  }
});

// Computed avatar URL
const avatarUrl = computed(() => {
  return user.value?.image
    ? user.value.image
    : `https://api.dicebear.com/7.x/initials/svg?seed=${user.value?.name || "U"}`;
});

// Logout
const handleLogout = () => {
  message.value = "Logged out successfully ✅";

  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }, 1200);
};

// Save edited profile
const handleSave = () => {
  localStorage.setItem("user", JSON.stringify(user.value));
  showEdit.value = false;
  message.value = "Profile updated successfully 🎉";
};
</script>

<style scoped>
/* Add optional styles if needed */
</style>
