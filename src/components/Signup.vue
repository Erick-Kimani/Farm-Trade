<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const phone = ref("");
const delivery_address = ref("");
const password = ref("");
const password_confirmation = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function signUp() {
  const initials = name.value
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join(".");

  const newUser = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    deliveryAddress: delivery_address.value,
    password: password.value,
    initials: initials,
    role: "Customer",
    activeAccount: true,
  };

  try {
    localStorage.setItem("signupData", JSON.stringify(newUser));
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", true);
    alert(`🎉 Welcome, ${name.value}! Your account has been created.`);
    router.push("/").then(() => router.go(0));
  } catch (err) {
    console.error("Sign up failed:", err);
    alert("Error creating your account. Please try again.");
  }
}
</script>

<template>
  <v-container class="signup-container" fluid>
    <div class="split-bg">
      <!-- 🟦 Left Blue Section -->
      <div class="blue-section">
        <!-- 🟢 Welcome Text -->
        <h2 class="welcome-text">Create Your Account</h2>

        <!-- 🧊 Signup Card -->
        <v-card class="glass-card pa-6">
          <v-card-title
            class="text-center text-h5 font-weight-bold text-white"
          >
            Sign Up
          </v-card-title>

          <!-- Full Name -->
          <v-text-field
            v-model="name"
            label="Full Name"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-account"
            :rules="[(v) => !!v || 'Name is required']"
          />

          <!-- Email -->
          <v-text-field
            v-model="email"
            label="Email Address"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-email"
            autocomplete="off"
            :rules="[
              (v) => !!v || 'Email is required',
              (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
            ]"
          />

          <!-- Phone -->
          <v-text-field
            v-model="phone"
            label="Phone Number"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-phone"
            autocomplete="off"
            :rules="[(v) => !!v || 'Phone number is required']"
          />

          <!-- Delivery Address -->
          <v-text-field
            v-model="delivery_address"
            label="Delivery Address"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-map-marker"
            :rules="[(v) => !!v || 'Address is required']"
          />

          <!-- Password -->
          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[
              (v) => !!v || 'Password is required',
              (v) => v.length >= 8 || 'Minimum 8 characters required',
            ]"
          />

          <!-- Confirm Password -->
          <v-text-field
            v-model="password_confirmation"
            label="Confirm Password"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-lock-check"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirmPassword ? 'text' : 'password'"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :rules="[
              (v) => !!v || 'Confirm password required',
              (v) => v === password || 'Passwords do not match',
            ]"
          />

          <!-- Signup Button -->
          <v-card-actions class="justify-center mt-4">
            <v-btn class="signup-btn" @click="signUp">Sign Up</v-btn>
          </v-card-actions>

          <!-- Redirect to Login -->
          <v-card-text class="text-center text-white">
            Already have an account?
            <router-link
              to="/login"
              class="font-weight-medium text-white text-decoration-underline"
            >
              Log In
            </router-link>
          </v-card-text>
        </v-card>
      </div>

      <!-- 🟫 Right Beige Section -->
      <div class="beige-section">
        <div class="beige-text-container">
          <h1 class="right-welcome-text">Welcome to the SignUp Page</h1>
          <p class="right-subtext">
            Join FarmTrade Hub today and connect directly with trusted farmers and fresh produce suppliers.
          </p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.signup-container {
  height: 127vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: stretch;
}

/* Diagonal Split Background (Blue + Beige) */
.split-bg {
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #0d1011 0%,
    #215164 58%,
    #edc08d 50%,
    #f4c998 100%
  );
}

/* 🟦 Blue Section (Form area) */
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

/* 🟫 Beige Section */
.beige-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff8e9;
  padding: -9rem ;
}

/* 📝 Text on Beige Section */
.beige-text-container {
  text-align: right;
  max-width: 360px;
}

.right-welcome-text {
  font-size: 2.2rem;
  font-weight: 700;
  color: #3d2506;
  margin-bottom: 10px;
}

.right-subtext {
  font-size: 1.6rem;
  color: #4a3a21;
  line-height: 1.6;
  font-weight: 500;
}

/* ✨ Left Side Welcome Text */
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
  border: 15px solid rgba(255, 255, 255, 0.3);
  border-radius: 60px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.3);
  color: white;
  position: relative;
  z-index: 10;
}

/* 🌟 Signup Button */
.signup-btn {
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

.signup-btn:hover {
  background-color: #d5e617 !important;
  box-shadow: 0 6px 18px rgb(164, 154, 151);
  transform: translateY(-2px);
}
</style>
