<script setup>
import { ref } from 'vue'

// Each card's title
const cardTitles = [
  "Farm Produce Delivery",
  "Soil Testing & Analysis",
  "Irrigation System Installation",
  "Farm Equipment Rental",
  "Crop Advisory & Training",
  "Greenhouse Setup"
]

// Six sets of text fields (one for each card)
const cardFields = ref([[], [], [], [], [], []])

// Add a new input line to a specific card
function addField(cardIndex) {
  cardFields.value[cardIndex].push('')
}
</script>

<template>
  <div class="services-page">
    <v-container>

      <!-- 🟢 Updated Prompt Section -->
      <div class="service-prompt text-center mb-8">
        <h2 class="prompt-title"><u>Your Free Connection to Service Providers</u></h2>
        <p class="prompt-text">
          You've met our team on the Services page, and now it's time to connect!<br />
          The contact details below belong to the
          <span class="highlight">service providers themselves</span>.<br />
          Please note that all initial inquiries and contacts are
          <strong>free of charge</strong>.<br />
          Don't hesitate to reach out!
        </p>
      </div>

      <!-- Title -->
      <h1 class="text-center text-yellow title-raised">
        <strong>Our Farm Services</strong>
      </h1>

      <!-- 2 Rows × 3 Columns Grid -->
      <div class="cards-grid">
        <div
          v-for="(fields, index) in cardFields"
          :key="index"
          class="glass-card pa-8"
        >
          <h2 class="text-h6 text-white mb-6 text-center">
            {{ cardTitles[index] }}
          </h2>

          <!-- Dynamic input lines -->
          <div
            v-for="(field, fIndex) in fields"
            :key="fIndex"
            class="input-line"
          >
            <input
              type="text"
              v-model="cardFields[index][fIndex]"
              placeholder="Type here..."
              class="styled-input"
            />
          </div>

          <!-- (+) Icon -->
          <div class="add-icon-container">
            <v-btn icon color="amber" variant="text" @click="addField(index)">
              <v-icon size="38">mdi-plus-circle</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.services-page {
  background: linear-gradient(135deg, #fddbdb, #101414);
  min-height: 100vh;
  padding: 30px 0 80px 0;
}

/* 🟢 Top Prompt Box */
.service-prompt {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  color: #fff;
  border-radius: 25px;
  padding: 30px 40px;
  font-size: 18px;
  line-height: 1.8;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  max-width: 90%;
  margin: 0 auto 50px auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.prompt-title {
  color: #6c2b05; /* ✅ Distinct cyan/teal tone */
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(77, 208, 225, 0.3);
}

.prompt-text {
  color: #f8f6f6;
  font-size: 17px;
}

.highlight {
  color: #942e05; /* ✅ Same distinct highlight color */
  font-weight: 600;
  text-decoration: underline;
}

/* Title style */
.title-raised {
  margin-top: 5px;
  margin-bottom: 50px;
  font-size: 2.4rem;
  color: #ffd54f;
  letter-spacing: 1px;
}

/* 2 rows × 3 columns grid layout */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 60px;
  justify-items: center;
  align-items: start;
  padding: 0 40px;
}

/* Glass card — wide horizontal layout */
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 40px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 700px;
  min-height: 380px;
  padding: 32px;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

/* Input field style */
.styled-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  color: white;
  font-size: 18px;
  padding: 12px 0;
  outline: none;
  transition: border-color 0.3s, font-size 0.2s;
}

.styled-input:focus {
  border-color: #69cfe6; /* matches highlight tone */
  font-size: 19px;
}

.input-line {
  margin-bottom: 24px;
}

/* Center the + icon */
.add-icon-container {
  text-align: center;
  margin-top: 20px;
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .glass-card {
    max-width: 90%;
  }
}
</style>
