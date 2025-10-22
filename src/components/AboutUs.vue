<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref, onMounted } from "vue";
</script>

<template>
  <!-- Full Page Background Wrapper -->
  <div class="aboutus-page">
    <!-- About Us Section -->
    <v-container class="aboutus-container py-10">
      <h1 class="text-center mb-6">About Us</h1>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-card class="image-card" elevation="6">
            <v-img src="/images/Fruits.jpg" height="250px" cover></v-img>
            <v-card-title class="text-center">Fresh Fruits</v-card-title>
            <v-card-text class="text-center">
              Handpicked from trusted farms ensuring freshness and quality.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-card class="image-card" elevation="6">
            <v-img src="/images/Onlineorders.jpg" height="250px" cover></v-img>
            <v-card-title class="text-center">Online Orders</v-card-title>
            <v-card-text class="text-center">
              Place your farm produce orders easily from anywhere, anytime.
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4" class="d-flex justify-center">
          <v-card class="image-card" elevation="6">
            <v-img src="/images/Vegetable2.jpg" height="250px" cover></v-img>
            <v-card-title class="text-center">Fresh Vegetables</v-card-title>
            <v-card-text class="text-center">
              Sustainably grown vegetables directly from local farmers.
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- About Us Content Section -->
    <v-container class="aboutus-text-section py-10">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="aboutus-text pa-6" elevation="4">
            <h2 class="text-center mb-4">Who We Are</h2>
            <p>
              <strong><u>FarmTrade Hub</u></strong> is a digital marketplace connecting
              farmers directly with buyers to promote sustainable and transparent
              food systems. We believe in empowering farmers, ensuring fair trade,
              and delivering the freshest produce to our customers.
            </p>
            <br />
            <p>
              Our mission is to simplify the process of buying and selling farm
              products by providing a secure, user-friendly platform where farmers
              can showcase their produce, and buyers can order confidently.
            </p>
            <br />
            <p>
              Whether you are a large-scale distributor or a home consumer,
              FarmTrade Hub ensures quality, convenience, and trust in every
              transaction.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
/* 🌿 Background wrapper applies image outside content zones */
.aboutus-page {
  background-image: url("/images/Leaves.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

/* Keep content areas visually distinct */
.aboutus-container {
  background-color: rgba(236, 235, 230, 0.9); /* semi-transparent linen tone */
}

.image-card {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.image-card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.aboutus-text {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  color: #333;
  line-height: 1.6;
  font-size: 1.1rem;
  text-align: justify;
}
</style>