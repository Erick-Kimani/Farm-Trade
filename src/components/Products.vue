<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/Products'

// Initialize
const router = useRouter()
const store = useProductsStore()

// Fetch products from the store
const products = ref([])

onMounted(() => {
  products.value = store.products
})

// Go to details page
function viewDetails(product) {
  store.selectProduct(product)
  router.push('/productdetails')
}
</script>

<template>
  <v-container class="py-10">
    <h1 class="text-center mb-8 text-3xl font-bold text-primary">Our Products</h1>

    <v-row>
      <v-col
        v-for="(product, index) in products"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="glass-card pa-4 hover:shadow-lg transition-all">
          <v-img
            :src="product.image"
            height="200px"
            class="rounded-lg mb-4"
            cover
          ></v-img>

          <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-primary font-bold mb-4">Price: {{ product.price }}</p>

          <v-btn
            color="orange"
            @click="viewDetails(product)"
          >
            View Details
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.glass-card {
  background: rgba(228, 17, 101, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(40px);
  border: 1px solid rgba(219, 211, 211, 0.2);
  transition: transform 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-5px);
}
.text-primary {
  color: #1619d6;
}
</style>
