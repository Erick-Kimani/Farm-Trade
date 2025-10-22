<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/Products'

const router = useRouter()
const store = useProductsStore()

// ✅ Access selected product
const product = computed(() => store.selectedProduct)

// ⭐ Rating value
const rating = ref(0)

// 🧮 Quantity (minimum = 1)
const quantity = ref(1)

// 🔙 Go back to products list
function goBack() {
  router.push('/products')
}

// ⭐ Handle star click
function setRating(value) {
  rating.value = value
}

// ➕ Increase quantity
function increaseQuantity() {
  quantity.value++
}

// ➖ Decrease quantity (minimum 1)
function decreaseQuantity() {
  if (quantity.value > 1) quantity.value--
}

// 💰 Clean numeric price extraction
const numericPrice = computed(() => {
  if (!product.value?.price) return 0
  // Extract digits from "325/ kg", "500 ksh", etc.
  const priceStr = String(product.value.price)
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
})

// 💰 Calculate total price
const totalPrice = computed(() => {
  return numericPrice.value * Number(quantity.value)
})

// ✅ Add product to Orders and navigate to Orders page
function placeOrder() {
  if (!product.value) return alert('No product selected!')

  const newOrder = {
    product: { ...product.value, price: numericPrice.value },
    quantity: Number(quantity.value),
    paymentStatus: false,
    rating: rating.value
  }

  const existingOrders = JSON.parse(localStorage.getItem('order')) || []
  existingOrders.push(newOrder)
  localStorage.setItem('order', JSON.stringify(existingOrders))

  alert(`✅ "${product.value.name}" (x${quantity.value}) added to your orders!`)
  router.push('/orders')
}
</script>

<template>
  <v-container class="py-10">
    <v-btn
      color="secondary"
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-6"
      @click="goBack"
    >
      Back to Products
    </v-btn>

    <v-card v-if="product" class="mx-auto pa-6 glass-card" max-width="600">
      <v-img :src="product.image" height="400" class="rounded-lg mb-6" cover></v-img>

      <h2 class="text-2xl font-bold mb-3 text-primary">{{ product.name }}</h2>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>

      <!-- ⭐ Rating Section -->
      <div class="flex items-center mb-6">
        <span class="mr-2 font-semibold text-gray-700">Rate this Product:</span>
        <div class="stars">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ active: star <= rating }"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
      </div>

      <!-- 🧮 Quantity Selector -->
      <div class="flex items-center mb-6 justify-between">
        <span class="font-semibold text-gray-700">Select Quantity:</span>
        <div class="flex items-center">
          <v-btn icon="mdi-minus" color="red" size="small" @click="decreaseQuantity"></v-btn>
          <input
            type="number"
            v-model="quantity"
            min="1"
            class="quantity-input mx-2"
          />
          <v-btn icon="mdi-plus" color="green" size="small" @click="increaseQuantity"></v-btn>
        </div>
      </div>

      <!-- 💰 Price Summary -->
      <div class="flex items-center justify-between mt-4 mb-4">
        <span class="text-xl font-semibold text-primary">
          Unit Price: Ksh {{ numericPrice }} / kg
        </span>
        <span class="text-xl font-semibold text-green-700">
          Total: Ksh {{ totalPrice }}
        </span>
      </div>

      <!-- 🛒 Order Button -->
      <div class="text-center mt-6">
        <v-btn color="indigo" @click="placeOrder">
          🛒 Order Now
        </v-btn>
      </div>
    </v-card>

    <v-alert v-else type="error" class="mt-10 text-center">
      No product selected. Please go back and choose a product.
    </v-alert>
  </v-container>
</template>

<style scoped>
.glass-card {
  background: rgba(146, 115, 4, 0.2);
  border-radius: 0px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-3px);
}
.text-primary {
  color: #007bff;
}

/* ⭐ Rating styles */
.stars {
  display: flex;
  cursor: pointer;
}
.star {
  font-size: 28px;
  color: #2d2727;
  transition: color 0.3s;
}
.star.active {
  color: #ff4d07;
}
.star:hover {
  color: #e52b0a;
}

/* 🧮 Quantity input styles */
.quantity-input {
  width: 60px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
}
</style>
