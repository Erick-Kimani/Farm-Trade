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
const avatar = ref(null);
const avatarFile = ref(null);
const showSettings = ref(false); // 👈 Toggle for dropdown visibility

// 📸 Handle avatar image upload
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    avatarFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      avatar.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

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
    role: "Customer,farmer",
    activeAccount: true,
    avatar: avatar.value || null,
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

// ⚙️ Navigate to settings
function goToSettings() {
  router.push("/settings");
}
</script>

<template>
  <v-container class="signup-container" fluid>
    <div class="split-bg">
      <!-- 🟦 Left Blue Section -->
      <div class="blue-section">
        <h2 class="welcome-text">Create Your Account</h2>

        <v-card class="glass-card pa-6">
          <v-card-title class="text-center text-h5 font-weight-bold text-white">
            Sign Up
          </v-card-title>

          <v-text-field
            v-model="name"
            label="Full Name"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-account"
            :rules="[(v) => !!v || 'Name is required']"
          />

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

          <v-text-field
            v-model="phone"
            label="Phone Number"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-phone"
            autocomplete="off"
            :rules="[(v) => !!v || 'Phone number is required']"
          />

          <v-text-field
            v-model="delivery_address"
            label="Delivery Address"
            variant="outlined"
            color="deep-orange-darken-2"
            prepend-inner-icon="mdi-map-marker"
            :rules="[(v) => !!v || 'Address is required']"
          />

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

          <v-card-actions class="justify-center mt-4">
            <v-btn class="signup-btn" @click="signUp">Sign Up</v-btn>
          </v-card-actions>

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
            Join FarmTrade Hub today and connect directly with trusted farmers
            and fresh produce suppliers.
          </p>

          <!-- 🧑‍🦱 Avatar Upload -->
          <div class="avatar-container">
            <div class="avatar-preview">
              <img
                v-if="avatar"
                :src="avatar"
                alt="Avatar Preview"
                class="avatar-image"
              />
              <div v-else class="avatar-placeholder">
                <v-icon color="#6e4c2a" size="48">mdi-account-circle</v-icon>
              </div>
            </div>

            <label class="upload-label">
              <v-icon left>mdi-camera</v-icon>
              Choose Avatar
              <input
                type="file"
                accept="image/*"
                @change="handleAvatarUpload"
                class="file-input"
              />
            </label>

            <!-- ⚙️ Settings Icon -->
            <div
              class="settings-icon-container"
              @mouseenter="showSettings = true"
              @mouseleave="showSettings = false"
            >
              <v-icon size="40" color="#6e4c2a" class="settings-icon">
                mdi-cog-outline
              </v-icon>
              <p class="settings-text">Settings</p>

              <!-- ⚙️ Settings Dropdown Menu -->
              <transition name="fade">
                <ul v-if="showSettings" class="settings-menu">
                  <li @click="goToSettings">Open Settings</li>
                  <li>Toggle Dark Mode</li>
                  <li>Change Password</li>
                  <li>Notification Preferences</li>
                  <li>Language</li>
                  <li>Help Center</li>
                  <li>Logout</li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.signup-container {
  height: 160vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.split-bg {
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #0d1011 0%,
    #215164 54%,
    #edc08d 50%,
    #f4c998 100%
  );
}

/* Blue Section */
.blue-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
  padding-left: 1vw;
}

.welcome-text {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 24px;
}

/* Beige Section */
.beige-section {
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  color: #fff8e9;
}

.beige-text-container {
  text-align: center;
  max-width: 350px;
}

.right-welcome-text {
  font-size: 1.7rem;
  font-weight: 700;
  color: #3d2506;
  margin-bottom: 10px;
}

.right-subtext {
  font-size: 1.4rem;
  color: #4a3a21;
  font-weight: 500;
}

/* Avatar Section */
.avatar-container {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-preview {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #6e4c2a;
  background: #f3e3c3;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-label {
  background-color: #6e4c2a;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s;
}

.upload-label:hover {
  background-color: #8a6339;
}

.file-input {
  display: none;
}

/* ⚙️ Settings Dropdown */
.settings-icon-container {
  margin-top: 1.5rem;
  position: relative;
  text-align: center;
  cursor: pointer;
}

.settings-menu {
  list-style: none;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #f3e3c3;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  padding: 10px 0;
  width: 200px;
  z-index: 10;
}

.settings-menu li {
  padding: 10px;
  color: #3d2506;
  font-weight: 600;
  transition: all 0.3s;
}

.settings-menu li:hover {
  background-color: #d9c59a;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.settings-text {
  margin-top: 5px;
  color: #3d2506;
  font-weight: 600;
}

/* Glass Card */
.glass-card {
  width: 380px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 60px;
  border:15px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.3);
  color: white;
  position: relative;
  z-index: 10;
  margin-bottom: 40px;
  
}

/* Signup Button */
.signup-btn {
  background-color: #20e0d9 !important;
  color: white !important;
  font-weight: bold;
  padding: 10px 39px;
  border-radius: 90px;
  box-shadow: 0 4px 12px rgba(26, 149, 44, 0.7);
  text-transform: none;
  transition: all 0.3s ease;
}

.signup-btn:hover {
  background-color: #d5e617 !important;
  transform: translateY(-2px);
}
</style>
