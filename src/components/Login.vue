<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const showSettings = ref(false);
const selectedSetting = ref("");

//  reactive font size for the page
const fontSize = ref("16px");

//  watch for setting changes
watch(selectedSetting, (value) => {
  if (value === "theme-dark") {
    document.body.style.backgroundColor = "#222";
    document.body.style.color = "#fff";
  } else if (value === "theme-light") {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  } else if (value === "font-large") {
    fontSize.value = "20px";
  } else if (value === "font-small") {
    fontSize.value = "14px";
  }
});

function login() {
  const adminEmail = "erick11768kimani@gmail.com";
  const adminPassword = "erick2022";

  try {
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

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      email.value === savedUser.email &&
      password.value === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isAdmin", false);
      alert(` Welcome back, ${savedUser.name}!`);
      router.push("/");
      return;
    }

    alert("Account not found. Please sign up first.");
    router.push("/signup");
  } catch (err) {
    console.error("Login failed:", err);
  }
}
</script>

<template>
  <v-container class="login-container" fluid :style="{ fontSize: fontSize }">
    <div class="split-bg">
      <!-- 🟦 Blue Login Section -->
      <div class="blue-section">
        <h2 class="welcome-text">Welcome to the Login Page</h2>

        <v-card class="glass-card pa-6">
          <v-card-title class="text-center text-h5 font-weight-bold text-white">
            Login
          </v-card-title>

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

          <v-card-actions class="justify-center mt-4">
            <v-btn class="login-btn" @click="login">Login</v-btn>
          </v-card-actions>

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

      <!--  Beige Section -->
      <div class="beige-section">
        <!--  Settings Icon -->
        <v-icon
          class="settings-icon"
          icon="mdi-cog"
          size="40"
          @click="showSettings = !showSettings"
        ></v-icon>

        <!--  Settings Panel -->
        <transition name="fade">
          <div v-if="showSettings" class="settings-panel">
            <h4>Settings</h4>
            <v-radio-group v-model="selectedSetting">
              <v-radio label="Dark Theme" value="theme-dark"></v-radio>
              <v-radio label="Light Theme" value="theme-light"></v-radio>
              <v-radio label="Large Font" value="font-large"></v-radio>
              <v-radio label="Small Font" value="font-small"></v-radio>
            </v-radio-group>
          </div>
        </transition>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.login-container {
  height: 140vh;
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
    #215164 55%,
    #edc08d 52%,
    #f4c998 100%
  );
}

/* Blue Section */
.blue-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 10vh;
  padding-left: 7vw;
}

/*  Beige Section */
.beige-section {
  flex: 1;
  position: relative;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*  Settings Icon */
.settings-icon {
  position: absolute;
  top: 20px;
  right: 40px;
  color: #5a5a5a;
  cursor: pointer;
  transition: transform 0.2s;
}
.settings-icon:hover {
  transform: rotate(30deg);
}

/*  Settings Panel */
.settings-panel {
  position: absolute;
  top: 80px;
  right: 30px;
  background: rgba(255, 255, 255, 0.85);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  width: 220px;
}

/* Glass Card */
.glass-card {
  width: 380px;
  background: rgba(255, 255, 255, 0.15);
   border: 15px solid rgba(255, 255, 255, 0.3);
  background-attachment: fixed;
  backdrop-filter: blur(10px);
  border-radius: 60px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.3);
  color: white;
}

.welcome-text {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
}

/*  Button */
.login-btn {
  background-color: #20e0d9 !important;
  color: white !important;
  font-weight: bold;
  font-size: 16px;
  padding: 12px 36px;
  border-radius: 90px;
  box-shadow: 0 4px 12px rgba(26, 149, 44, 0.7);
  transition: all 0.3s ease;
}
.login-btn:hover {
  background-color: #d5e617 !important;
  box-shadow: 0 6px 18px rgb(164, 154, 151);
  transform: translateY(-2px);
}

/*  Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
