<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showMenu = ref(false);
const isLoggedIn = ref(true);
const isAdmin = ref(false);
const userInitials = ref("");

// 🧠 Fetch user details from localStorage
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    isLoggedIn.value = true;
    isAdmin.value =
      storedUser.name === "Erick Kimani" &&
      storedUser.email === "erick11768kimani@gmail.com" &&
      storedUser.password === "erick2022";

    const nameParts = storedUser.name.split(" ");
    userInitials.value =
      nameParts[0].charAt(0).toUpperCase() +
      (nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : "");
  }
});

// 🚀 Navigation function
function goTo(page) {
  router.push(page);
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("user");
  router.push("/login");
}
</script>

<template>
  <v-app-bar color="deep-orange-lighten-2" dark flat elevate-on-scroll>
    <v-container class="d-flex align-center justify-space-between">

      <!-- 🌾 Logo + Title -->
      <div class="d-flex align-center logo-title cursor-pointer" @click="goTo('/')">
        <!-- ✅ White icon -->
        <v-icon color="white" size="35" class="mr-2">mdi-sprout</v-icon>
        <h2 class="mb-0 text-h5 font-weight-bold text-white">
          FarmTrade Hub
        </h2>
      </div>

      <!-- 🔗 Navbar Links -->
      <div class="nav-links d-flex align-center">
        <v-btn text class="text-white" @click="goTo('/')">Home</v-btn>
        <v-btn text class="text-white" @click="goTo('/services')">Services</v-btn>
        <v-btn text class="text-white" @click="goTo('/aboutus')">AboutUs</v-btn>
        <v-btn text class="text-white" @click="goTo('/contact')">Contact</v-btn>
        <v-btn text class="text-white" @click="goTo('/products')">Products</v-btn>
        <v-btn v-if="isLoggedIn" text class="text-white" @click="goTo('/orders')"> My Order </v-btn>
        <v-btn v-if="isLoggedIn && isAdmin"textclass="text-white"@click="goTo('/admin')">Admin</v-btn>
      </div>

      <!-- 👤 Avatar Dropdown -->
      <div class="d-flex align-center">
        <v-menu v-model="showMenu" location="bottom end">
          <template #activator="{ props }">
            <v-avatar
              v-bind="props"
              color="white"
              size="40"
              class="cursor-pointer"
            >
              <span class="text-deep-orange-lighten-2 font-weight-bold text-h6">
                {{ userInitials || "?" }}
              </span>
            </v-avatar>
          </template>

          <v-list>
            <v-list-item @click="goTo('/userprofile')">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('/settings')">
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item v-if="isLoggedIn" @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
            <v-list-item v-else @click="goTo('/login')">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

    </v-container>
  </v-app-bar>
</template>

<style scoped>
.logo-title {
  cursor: pointer;
  transition: transform 0.3s ease;
}
.logo-title:hover {
  transform: scale(1.05);
}

/* Navbar buttons */
.nav-links .v-btn {
  text-transform: none;
  font-weight: 500;
  color: white !important;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.nav-links .v-btn:hover {
  background-color: rgba(215, 34, 34, 0.2);
  border-radius: 8px;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
