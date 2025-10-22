<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref } from "vue";

// ✅ Carousel settings
const carouselWidth = ref("80%");
const carouselHeight = ref("490px");

// 💬 Chat system
const showChat = ref(false);
const comment = ref("");
const comments = ref([]);
const viewingFAQ = ref(true); // true when viewing common FAQs

// ✅ Predefined common queries
const commonQueries = [
  {
    question: "How can I place an order?",
    answer:
      "To place an order, go to the Products section, select your desired item, and click 'Order Now'. You can then confirm your purchase easily.",
  },
  {
    question: "Do you deliver produce?",
    answer:
      "Yes! We deliver across major towns in Kenya. Delivery charges depend on your location and order size.",
  },
  {
    question: "Can I sell my farm produce on FarmTrade Hub?",
    answer:
      "Absolutely. Simply sign up as a farmer, create your product listings, and start selling directly to customers.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us through WhatsApp (+254 791 018 109) or email us at farmtradehub@gmail.com.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept M-Pesa, bank transfers, and selected mobile wallets for your convenience.",
  },
];

// ✅ Toggle chat
function toggleChat() {
  showChat.value = !showChat.value;
  if (!showChat.value) {
    comments.value = [];
    viewingFAQ.value = true;
  }
}

// ✅ Post custom message
function postComment() {
  if (comment.value.trim() !== "") {
    comments.value.push({
      text: comment.value,
      timestamp: new Date().toLocaleTimeString(),
      from: "user",
    });
    comment.value = "";
    viewingFAQ.value = false;
  }
}

// ✅ Handle FAQ selection
function handleQueryClick(query) {
  viewingFAQ.value = false;
  comments.value.push({
    text: query.question,
    timestamp: new Date().toLocaleTimeString(),
    from: "user",
  });
  setTimeout(() => {
    comments.value.push({
      text: query.answer,
      timestamp: new Date().toLocaleTimeString(),
      from: "bot",
    });
  }, 400);
}

// ✅ Return to FAQs
function backToFAQs() {
  comments.value = [];
  viewingFAQ.value = true;
}
</script>

<template>
  <!-- ✅ News Ticker -->
  <div class="news-ticker">
    <marquee behavior="scroll" direction="left" scrollamount="6">
      🌾 Welcome to <strong>FarmTrade Hub</strong> — Bridging farmers and buyers directly for fresh, sustainable produce!
    </marquee>
  </div>

  <!-- 🖼 Hero Section -->
  <v-container class="d-flex justify-center align-center" style="height: 90vh;">
    <v-carousel
      :style="{ width: carouselWidth, height: carouselHeight }"
      class="centered-carousel"
      hide-delimiter-background
    >
      <v-carousel-item src="/images/Vegetable2.jpg" cover></v-carousel-item>
      <v-carousel-item src="/images/Vegetable3.jpg" cover></v-carousel-item>
      <v-carousel-item src="/images/Fruits.jpg" cover></v-carousel-item>
      <v-carousel-item src="/images/Onlineorders.jpg" cover></v-carousel-item>
      <v-carousel-item src="/images/Spinach.jpg" cover></v-carousel-item>
    </v-carousel>
  </v-container>

  <!-- 🧾 About Section -->
  <v-container>
    <v-row>
      <v-card class="pa-6 text-center">
        <v-card-text>
          <p class="text-h5"><b>WELCOME TO FARMTRADE HUB</b></p>
          FarmTrade Hub is the revolutionary platform bridging the gap between
          local farmers and discerning buyers.
          <br />
          We empower farmers to effortlessly showcase and sell their fresh,
          high-quality produce directly to customers, cutting out middlemen and
          ensuring fair prices.
          <br />
          For buyers, FarmTrade Hub offers unparalleled access to farm-fresh
          goods, supporting local agriculture and promoting sustainable food
          choices.
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>

  <!-- ✅ Footer -->
  <v-footer class="contact-section pa-6" height="auto">
    <v-container fluid>
      <v-row class="text-center d-flex justify-center align-center">
        <v-col cols="12" md="4">
          <v-card-text>
            <strong>Phone:</strong> (+254) 791 018 109
          </v-card-text>
          <v-card-text>
            <strong>Email:</strong> farmtradehub@gmail.com
          </v-card-text>
        </v-col>
        <v-col cols="12" md="4">
          <v-card-actions class="d-flex justify-center social-icons">
            <v-btn
              icon="mdi-facebook"
              href="https://www.facebook.com/FarmTradeHub"
              target="_blank"
              rel="noopener"
              variant="text"
              class="social-btn"
            ></v-btn>
            <v-btn
              icon="mdi-twitter"
              href="https://twitter.com/FarmTradeHub"
              target="_blank"
              rel="noopener"
              variant="text"
              class="social-btn"
            ></v-btn>
            <v-btn
              icon="mdi-instagram"
              href="https://www.instagram.com/FarmTradeHub"
              target="_blank"
              rel="noopener"
              variant="text"
              class="social-btn"
            ></v-btn>
            <v-btn
              icon="mdi-whatsapp"
              href="https://wa.me/254791018109?text=Hello%20FarmTrade%20Hub!%20I'm%20interested%20in%20your%20products."
              target="_blank"
              rel="noopener"
              variant="text"
              class="social-btn"
            ></v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>

  <!-- 💬 Floating Chat Icon -->
  <v-btn
    icon
    color="teal-darken-3"
    class="chat-btn"
    @click="toggleChat"
    elevation="10"
  >
    <v-icon size="30">mdi-chat</v-icon>
  </v-btn>

  <!-- 💭 Chat Box -->
  <transition name="fade">
    <v-card
      v-if="showChat"
      class="chat-box pa-4 rounded-lg"
      elevation="10"
    >
      <!-- 🧩 Chat Header -->
      <v-card-title class="d-flex justify-space-between align-center text-h6">
        <span>💬 Chat Support</span>
        <v-icon
          color="red-darken-2"
          size="24"
          class="cursor-pointer"
          @click="toggleChat"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-divider></v-divider>

      <!-- 🧠 Common FAQs -->
      <v-card-text v-if="viewingFAQ" class="chat-messages">
        <p class="text-subtitle-1 mb-3"><b>Common Questions</b></p>
        <v-list dense>
          <v-list-item
            v-for="(query, i) in commonQueries"
            :key="i"
            @click="handleQueryClick(query)"
            class="query-item"
          >
            <v-list-item-title>{{ query.question }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <!-- 💬 Conversation -->
      <v-card-text v-else class="chat-messages">
        <div
          v-for="(c, index) in comments"
          :key="index"
          class="comment-item"
          :class="c.from"
        >
          <p>{{ c.text }}</p>
          <small class="text-grey">{{ c.timestamp }}</small>
          <v-divider class="my-2"></v-divider>
        </div>
        <v-btn
          block
          color="teal-darken-2"
          variant="outlined"
          class="mt-2"
          @click="backToFAQs"
        >
          ⬅ Back to FAQs
        </v-btn>
      </v-card-text>

      <!-- ✍️ Input Field -->
      <v-card-actions>
        <v-text-field
          v-model="comment"
          placeholder="Write a message..."
          variant="outlined"
          density="comfortable"
          hide-details
          class="flex-grow-1"
        ></v-text-field>
        <v-btn color="teal-darken-3" @click="postComment" variant="elevated">
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<style scoped>
/* ✅ News Ticker */
.news-ticker {
  width: 100%;
  background-color: skyblue;
  color: navy;
  font-weight: bold;
  font-size: 18px;
  padding: 8px 0;
  border-bottom: 2px solid #0077b6;
}

/* ✅ Carousel */
.centered-carousel {
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

/* ✅ Footer */
.contact-section {
  width: 100%;
  background-image: url("/images/Farmbackground.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

/* Social Buttons */
.social-btn {
  color: rgb(209, 204, 204);
  transition: all 0.3s ease;
}
.social-btn:hover {
  transform: scale(1.3);
  color: #f7ff07;
}

/*  Floating Chat */
.chat-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
  color: white;
}

/* Chat Box */
.chat-box {
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: 350px;
  max-height: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/*  Scrollable Area */
.chat-messages {
  max-height: 250px;
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 6px;
}

/*  Custom Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}
.chat-messages::-webkit-scrollbar-track {
  background: #ebe6e6;
  border-radius: 10px;
}
.chat-messages::-webkit-scrollbar-thumb {
  background: #009688;
  border-radius: 12px;
}
.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #2276a4;
}

/* FAQ Items */
.query-item {
  cursor: pointer;
  transition: background 0.3s;
}
.query-item:hover {
  background-color: #e0f2f1;
}

/* Chat Roles */
.comment-item.user {
  text-align: right;
}
.comment-item.bot {
  text-align: left;
  color: #004d40;
}

/*  Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Close Icon Hover */
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.2s;
}
.cursor-pointer:hover {
  transform: scale(1.2);
}
</style>
