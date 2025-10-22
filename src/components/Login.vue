<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function login() {
  // Admin credentials
  const adminEmail = "erick11768kimani@gmail.com";
  const adminPassword = "erick2022";

  try {
    // Admin login
    if (email.value === adminEmail && password.value === adminPassword) {
      const adminUser = {
        name: "Erick Kimani",
        email: email.value,
        password: password.value,
        isAdmin: true,
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isAdmin", true);
      alert(" Welcome Admin ");
      router.push("/");
      return;
    }

    // 🧑‍🌾 Normal user login
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      email.value === savedUser.email &&
      password.value === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isAdmin", false);
      alert(`👋 Welcome back, ${savedUser.name}!`);
      router.push("/");
      return;
    }

    // Unrecognized user → redirect to SignUp
    alert(" Account not found. Please sign up first.");
    router.push("/signup");
  } catch (err) {
    console.error("Login failed:", err);
  }
}
</script>

<template>
  <v-container class="login-container" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="glass-card pa-6">
          <v-card-title class="text-center text-h5 font-weight-bold text-white">
            Login
          </v-card-title>

          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Email Address"
            variant="outlined"
            color="deep-orange-darken-2"
            autocomplete="off"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\\..+/.test(v) || 'Email must be valid',
            ]"
            required
          />

          <!-- Password -->
          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
            color="deep-orange-darken-2"
            autocomplete="off"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[
              (v) => !!v || 'Password is required',
              (v) => v.length >= 8 || 'Password must be at least 5 characters',
            ]"
          />

          <!-- 🔶 Distinct Login Button -->
          <v-card-actions class="justify-center mt-4">
            <v-btn
              class="login-btn"
              @click="login"
            >
              Login
            </v-btn>
          </v-card-actions>

          <!-- Sign Up Link -->
          <v-card-text class="text-center text-white">
            Don't have an account?
            <router-link
              to="/signup"
              class="font-weight-medium text-white text-decoration-underline"
            >
              Sign Up
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-container {
  background-image: url("/images/Farmproduce.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 106vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 20px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(120, 101, 101, 0.25);
  color: rgb(0, 0, 0);
  transition: all 0.3s ease;
}

/* 🔸 Bold, solid orange login button that stands out */
.login-btn {
  background-color: #20e0d9 !important; /* strong orange */
  color: white !important;
  font-weight: bold;
  font-size: 16px;
  padding: 12px 36px;
  border-radius: 90px;
  box-shadow: 0 4px 12px rgba(26, 149, 44, 0.7);
  text-transform: none;
  transition: all 0.3s ease;
}
.login-btn:hover {
  background-color: #d5e617 !important; /* darker orange on hover */
  box-shadow: 0 6px 18px rgba(255, 87, 34, 1);
  transform: translateY(-2px);
}

.v-card-title {
  color: rgb(233, 238, 233);
}
</style>
