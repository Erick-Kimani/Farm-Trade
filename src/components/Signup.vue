<template>
  <v-container fluid fill-height class="signup-background">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="10" class="pa-6 rounded-lg glass-card">
          <v-form @submit.prevent="signUp" ref="form">
            <div class="text-center mb-6">
              <h1 class="text-h4 font-weight-bold teal--text text--darken-2">
                Welcome to FarmTrade Hub
              </h1>
            </div>

            <!-- Full Name -->
            <v-text-field
              v-model="name"
              label="Full Name"
              prepend-inner-icon="mdi-account"
              :rules="[(v) => !!v || 'Name is required']"
              required
              outlined
              dense
            ></v-text-field>

            <!-- Email -->
            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
              ]"
              required
              outlined
              dense
              autocomplete="off"
            ></v-text-field>

            <!-- Phone -->
            <v-text-field
              v-model="phone"
              label="Phone Number"
              prepend-inner-icon="mdi-phone"
              :rules="[(v) => !!v || 'Phone is required']"
              required
              outlined
              dense
              autocomplete="off"
            ></v-text-field>

            <!-- Delivery Address -->
            <v-text-field
              v-model="delivery_address"
              label="Delivery Address"
              prepend-inner-icon="mdi-location"
              :rules="[(v) => !!v || 'Address is required']"
              required
              outlined
              dense
            ></v-text-field>

            <!-- Password -->
            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :rules="[
                (v) => !!v || 'Password is required',
                (v) => v.length >= 8 || 'Password must be at least 8 characters',
              ]"
              required
              outlined
              dense
              autocomplete="new-password"
            ></v-text-field>

            <!-- Confirm Password -->
            <v-text-field
              v-model="password_confirmation"
              label="Confirm Password"
              prepend-inner-icon="mdi-lock-check"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              :rules="[
                (v) => !!v || 'Please confirm your password',
                (v) => v === password || 'Passwords must match',
              ]"
              required
              outlined
              dense
              autocomplete="off"
            ></v-text-field>

            <!-- Submit Button -->
            <v-btn
              block
              color="deep-orange-lighten-2"
              dark
              class="mt-4"
              large
              type="submit"
            >
              Sign Up
            </v-btn>

            <!-- Redirect to Login -->
            <div class="text-center mt-6">
              <p>
                Already have an account?
                <router-link
                  to="/login"
                  class="teal--text text--darken-2 font-weight-medium"
                >
                  Log In
                </router-link>
              </p>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref(null);
const name = ref("");
const email = ref("");
const phone = ref("");
const delivery_address = ref("");
const password = ref("");
const password_confirmation = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function signUp() {
  // 🧠 Split full name into first + last initials
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
    // Save new user data in localStorage
    localStorage.setItem("signupData", JSON.stringify(newUser));
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", true);

    // ✅ Redirect to homepage and reload
    router.push("/").then(() => {
      router.go(0);
    });
  } catch (err) {
    console.error("Sign up failed", err);
    alert("Error creating your account. Please try again.");
  }
}
</script>

<style scoped>
/* Background image for the signup page */
.signup-background {
  background-image: url("/images/Farmproduce.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

/* Glass effect card */
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
</style>
