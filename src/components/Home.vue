<template>
  <!--  News Ticker -->
  <div class="news-ticker">
    <marquee behavior="scroll" direction="left" scrollamount="6">
    <v-icon>mdi-food-variant</v-icon> Welcome to <strong>FarmTrade-Hub</strong> — Bridging farmers and buyers directly for fresh, sustainable produce!
    </marquee>
  </div>

  <!--  Hero Section -->
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

  <!-- About Section -->
  <v-container>
    <v-row>
      <v-card class="pa-6 text-center">
        <v-card-text>
          <p class="text-h5"><b>WELCOME TO FARMTRADE-HUB</b></p>
          <p>
            FarmTrade-Hub is an innovative grocery application designed to
            <strong>bridge the gap between farmers and customers</strong> by creating
            a direct, transparent, and reliable marketplace for fresh farm produce.
            Through this platform, local farmers can showcase and sell their goods
            without middlemen, ensuring they earn fair value for their hard work.
            At the same time, customers gain access to <strong>fresh, affordable, and
            traceable</strong> food products sourced straight from trusted local farms.
          </p>
          <p>
            The app strengthens the farmer–consumer relationship by promoting
            <strong>trust, sustainability, and convenience</strong>. FarmTrade-Hub not
            only empowers farmers through digital access to markets but also enhances
            customer experience by simplifying produce shopping—from browsing to
            doorstep delivery. It’s more than an app; it’s a community connecting
            those who grow the food and those who enjoy it.
          </p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>

  <!--  Footer -->
  <v-footer class="contact-section pa-6" height="auto">
    <v-container fluid>
      <v-row class="text-center d-flex justify-center align-center">
        <!-- Contact Info -->
        <v-col cols="12" md="4">
          <v-card-text>
            <strong>Phone:</strong> (+254) 791 018 109
          </v-card-text>
          <v-card-text>
            <strong>Email:</strong> farmtradehub@gmail.com
          </v-card-text>
        </v-col>

        <!--  Social Media Links -->
        <v-col cols="12" md="4">
          <v-card-actions class="d-flex justify-center social-icons">
            <v-btn
              icon
              variant="text"
              :href="'https://www.facebook.com/FarmTradeHub'"
              target="_blank"
              class="social-btn facebook"
            >
              <v-icon size="30">mdi-facebook</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              :href="'https://x.com/FarmTradeHub'"
              target="_blank"
              class="social-btn twitter"
            >
              <v-icon size="30">mdi-twitter</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              :href="'https://www.instagram.com/FarmTradeHub'"
              target="_blank"
              class="social-btn instagram"
            >
              <v-icon size="30">mdi-instagram</v-icon>
            </v-btn>

            <v-btn
              icon
              variant="text"
              :href="'https://wa.me/254791018109'"
              target="_blank"
              class="social-btn whatsapp"
            >
              <v-icon size="30">mdi-whatsapp</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>

        <!--  Terms -->
        <v-col cols="12" md="1">
          <TermsAndConditions />
        </v-col>
      </v-row>

      <v-divider class="my-4" color="white"></v-divider>

      <v-row>
        <v-col class="text-center">
          <small>&copy; {{ new Date().getFullYear() }} FarmTrade-Hub. All rights reserved.</small>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>

  <!--  Floating Chat Icon -->
  <v-btn icon color="teal-darken-3" class="chat-btn" @click="toggleChat" elevation="10">
    <v-icon size="35">mdi-chat</v-icon>
  </v-btn>

  <!-- Chat Box -->
  <transition name="fade">
    <v-card v-if="showChat" class="chat-box pa-4 rounded-lg" elevation="10">
      <v-card-title class="d-flex justify-space-between align-center text-h6">
        <span>💬 Chat Support</span>
        <v-icon color="red-darken-2" size="24" class="cursor-pointer" @click="toggleChat">
          mdi-close
        </v-icon>
      </v-card-title>

      <v-divider></v-divider>

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

      <v-card-text v-else class="chat-messages">
        <div v-for="(c, index) in comments" :key="index" class="comment-item" :class="c.from">
          <p>{{ c.text }}</p>
          <small class="text-grey">{{ c.timestamp }}</small>
          <v-divider class="my-2"></v-divider>
        </div>
        <v-btn block color="teal-darken-2" variant="outlined" class="mt-2" @click="backToFAQs">
           Back to FAQs
        </v-btn>
      </v-card-text>

      <v-card-actions>
        <v-text-field
          v-model="comment"
          placeholder="Write a message..."
          variant="outlined"
          density="comfortable"
          hide-details
          class="flex-grow-1"
        ></v-text-field>
        <v-btn color="teal-darken-3" @click="postComment" variant="elevated">Send</v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import TermsAndConditions from "@/components/TermsAndConditions.vue";

const carouselWidth = ref("80%");
const carouselHeight = ref("490px");

//  Chat system
const showChat = ref(false);
const comment = ref("");
const comments = ref(JSON.parse(localStorage.getItem("userMessages")) || []);
const viewingFAQ = ref(true);

const commonQueries = [
  {
    question: "How can I place an order?",
    answer:"To place an order, go to the Products section, select your desired item, and click 'Order Now'.",
  },
  {
    question: "Do you deliver produce?",
    answer:"Yes! We deliver across major towns in Kenya. Delivery charges depend on your location.",
  },
  {
    question: "Can I sell my farm produce on FarmTrade-Hub?",
    answer:"Absolutely. Sign up as a farmer, create your product listings, and start selling directly to customers.",
  },
  {
    question: "How do I contact customer support?",
    answer:"You can reach us through WhatsApp (+254 791 018 109) or email farmtradehub@gmail.com.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, bank transfers, and selected mobile wallets.",
  },
];

// Save messages to localStorage
watch(
  comments,
  (newVal) => {
    localStorage.setItem("userMessages", JSON.stringify(newVal));
  },
  { deep: true }
);

function toggleChat() {
  showChat.value = !showChat.value;
  if (!showChat.value) viewingFAQ.value = true;
}

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

function backToFAQs() {
  viewingFAQ.value = true;
}
</script>

<style scoped>
.news-ticker {
  width: 100%;
  background-color: rgb(160, 236, 236);
  color: rgb(4, 58, 71);
  font-weight: bold;
  font-size: 18px;
  padding: 8px 0;
  border-bottom: 2px solid #0077b6;
}

.centered-carousel {
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.contact-section {
  background: linear-gradient(135deg, #75dc0f, #101414);
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

/*  Social Media Icon Hover Effects */
.social-btn {
  transition: transform 0.3s, color 0.3s, background-color 0.3s;
}

.social-btn:hover {
  transform: scale(1.2);
}

.social-btn.facebook:hover v-icon {
  color: #1877f2 !important;
}
.social-btn.twitter:hover v-icon {
  color: #1da1f2 !important;
}
.social-btn.instagram:hover v-icon {
  color: #e1306c !important;
}
.social-btn.whatsapp:hover v-icon {
  color: #25d366 !important;
}

.chat-btn {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
  color: white;
}

.chat-box {
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: 350px;
  max-height: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
}

.chat-messages {
  max-height: 250px;
  overflow-y: auto;
}

.comment-item.user {
  text-align: right;
}
.comment-item.bot {
  text-align: left;
  color: #16bca0;
}
</style>
