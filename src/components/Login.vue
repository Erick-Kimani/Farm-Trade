<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

function login() {
  const adminEmail = "erick11768kimani@gmail.com";
  const adminPassword = "erick2022";

  try {
    // 🧑‍💼 Admin login
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
      alert("Welcome Admin");
      router.push("/");
      return;
    }

    // 👥 Regular user login
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

    // 🚫 Account not found
    alert("Account not found. Please sign up first.");
    router.push("/signup");
  } catch (err) {
    console.error("Login failed:", err);
  }
}
</script>

<template>
  <v-container class="login-container" fluid>
    <div class="split-bg">
      <!-- 🟦 Left Blue Section -->
      <div class="blue-section">
        <!-- 🟢 Welcome Text -->
        <h2 class="welcome-text"> Welcome to the Login  Page</h2>

        <!-- 🔷 Login Card -->
        <v-card class="glass-card pa-6">
          <v-card-title class="text-center text-h5 font-weight-bold text-white">
            Login
          </v-card-title>

          <!--  Email -->
          <v-text-field
            v-model="email"
            label="Email Address"
            variant="outlined"
            color="deep-orange-darken-2"
            autocomplete="off"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
            ]"
            required
          />

          <!--  Password -->
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
              (v) => v.length >= 8 || 'Password must be at least 8 characters',
            ]"
          />

          <!--  Login Button -->
          <v-card-actions class="justify-center mt-4">
            <v-btn class="login-btn" @click="login">Login</v-btn>
          </v-card-actions>

          <!--  Sign Up Link -->
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
      </div>

      <!-- 🟫 Right Beige Section -->
      <div class="beige-section"></div>
    </div>
  </v-container>
</template>

<style scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
}

/* 🎨 Split background with 2 tones */
.split-bg {
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #0d1011 0%,
    #215164 55%,
    #edc08d 52%,
    #f4c998 100%
  );
}

/* 🟦 Blue Section (Login area) */
.blue-section {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 10vh;
  padding-left: 7vw;
}

/* 🟫 Beige Section (Right Side) */
.beige-section {
  flex: 1;
}

/* ✨ Welcome Text */
.welcome-text {
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
}

/* 🧊 Glass Card */
.glass-card {
  width: 380px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 20px solid rgba(255, 255, 255, 0.3);
  border-radius: 60px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.3);
  color: white;
  position: relative;
  z-index: 10;
}

/* 🌟 Login Button */
.login-btn {
  background-color: #20e0d9 !important;
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
  background-color: #d5e617 !important;
  box-shadow: 0 6px 18px rgb(164, 154, 151);
  transform: translateY(-2px);
}

.v-card-title {
  color: rgb(255, 255, 255);
}
</style>
