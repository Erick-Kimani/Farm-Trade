<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const showMenu = ref(false);
const isLoggedIn = ref(true);
const isAdmin = ref(false);
const userInitials = ref("");

//  Load user info
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

function goTo(page) {
  router.push(page);
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("user");
  router.push("/login");
}

const isActive = (path) => computed(() => route.path === path);
</script>

<template>
  <v-app-bar color="deep-orange-lighten-2" dark flat elevate-on-scroll>
    <v-container class="d-flex align-center justify-space-between">

      <!--  Logo + Title -->
      <div class="d-flex align-center logo-title cursor-pointer" @click="goTo('/')">
        <v-icon color="white" size="35" class="mr-2">mdi-sprout</v-icon>
        <h2 class="mb-0 text-h5 font-weight-bold text-white">FarmTrade Hub</h2>
      </div>

      <!--  Navbar Links -->
      <div class="nav-links d-flex align-center">
        <v-btn
          text
          class="nav-btn"
          :class="{ active: isActive('/').value }"
          @click="goTo('/')"
        >Home</v-btn>

        <v-btn
          text
          class="nav-btn"
          :class="{ active: isActive('/products').value }"
          @click="goTo('/products')"
        >Grocery</v-btn>

        <v-btn
          text
          class="nav-btn"
          :class="{ active: isActive('/services').value }"
          @click="goTo('/services')"
        >Services</v-btn>

        <v-btn
          text
          class="nav-btn"
          :class="{ active: isActive('/aboutus').value }"
          @click="goTo('/aboutus')"
        >About Us</v-btn>

        <v-btn
          v-if="isLoggedIn"
          text
          class="nav-btn"
          :class="{ active: isActive('/orders').value }"
          @click="goTo('/orders')"
        >Add to Cart</v-btn>

        <v-btn
          v-if="isLoggedIn && isAdmin"
          text
          class="nav-btn"
          :class="{ active: isActive('/admin').value }"
          @click="goTo('/admin')"
        >Admin</v-btn>
      </div>

      <!-- Avatar Dropdown -->
      <div class="d-flex align-center">
        <v-menu v-model="showMenu" location="bottom end">
          <template #activator="{ props }">
            <v-avatar
              v-bind="props"
              color="white"
              size="50"
              class="cursor-pointer"
            >
              <span class="text-deep-orange-lighten-2 font-weight-bold text-h6">
                {{ userInitials || "?" }}
              </span>
            </v-avatar>
          </template>

          <v-list>
            <v-list-item @click="goTo('/signup')">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goTo('/signup')">
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

/*  Navbar Buttons */
.nav-links .nav-btn {
  text-transform: none;
  font-weight: 500;
  color: white !important;
  border-radius: 25px;
  position: relative;
  margin: 0 6px;
  transition: all 0.4s ease;
  padding: 8px 20px;
  background-color: transparent;
}

/*  Hover effect */
.nav-links .nav-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

/*  Active Button */
.nav-links .nav-btn.active {
  background: linear-gradient(135deg, #ffca28, #ff8f00);
  color: #212121 !important;
  font-weight: 700;
  box-shadow: 0 0 10px rgba(255, 215, 64, 0.7), 0 0 20px rgba(255, 160, 0, 0.5);
  transform: translateY(-2px);
}

/*  Smooth transition when switching pages */
.nav-links .nav-btn.active {
  transition: background 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
}

/*  Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
