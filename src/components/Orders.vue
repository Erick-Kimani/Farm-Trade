<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const orders = ref([])
const dialog = ref(false) // controls confirmation dialog

onMounted(() => {
  const storedOrders = JSON.parse(localStorage.getItem('order')) || []
  orders.value = storedOrders.map(order => ({
    ...order,
    quantity: Number(order.quantity) || 0,
    product: {
      ...order.product,
      price: Number(order.product?.price) || 0
    }
  }))
})

const removeOrder = (index) => {
  orders.value.splice(index, 1)
  localStorage.setItem('order', JSON.stringify(orders.value))
}

const grandTotal = computed(() => {
  return orders.value.reduce(
    (sum, order) => sum + order.quantity * order.product.price,
    0
  )
})

// ✅ Handle purchase confirmation
const confirmPurchase = () => {
  if (orders.value.length === 0) return

  // 🔔 Here you would integrate real payment (e.g., MPesa STK Push, Stripe, etc.)
  alert(`Purchase confirmed! Total: Ksh ${grandTotal.value}\nThank you for your order!`)

  // 🧹 Clear cart after purchase
  localStorage.removeItem('order')
  orders.value = []

  // Optional: Navigate to success page
  // router.push('/order-success')
}
</script>

<template>
  <v-container>
    <h1 class="text-center text-3xl font-bold text-primary mb-6">🛒 My Cart</h1>

    <!-- Purchase Button -->
    <v-row v-if="orders.length > 0">
      <v-col cols="12" class="text-right">
        <v-btn
          color="green-darken-2"
          class="mb-4 px-6"
          @click="dialog = true"
          :disabled="grandTotal <= 0"
        >
           💳 Purchase Now
        </v-btn>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Purchase</v-card-title>
        <v-card-text>
          Are you sure you want to purchase all items for <strong>Ksh {{ grandTotal }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="green" @click="confirmPurchase">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Display Orders -->
    <v-row>
      <v-col
        v-for="(order, index) in orders"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card border="opacity-50 sm lime" variant="elevated" class="mx-auto pa-3 mb-4">
          <v-row>
            <v-col md="4">
              <v-img
                :src="order.product.image"
                width="170px"
                height="17y0px"
                class="rounded-lg"
                cover
              ></v-img>
            </v-col>
            <v-col md="8">
              <v-card-item>
                <div>
                  <div class="text-overline mb-1 font-bold">
                    {{ order.product.name }}
                  </div>
                  <div class="text-caption text-gray-700">
                    Price: Ksh {{ order.product.price }}
                  </div>
                  <div class="text-caption text-gray-700">
                    Quantity: {{ order.quantity }}
                  </div>
                  <div class="text-h6 font-semibold mt-2">
                    Total: Ksh {{ order.quantity * order.product.price }}
                  </div>
                  <v-btn
                    color="red-darken-2"
                    size="small"
                    class="mt-3"
                    @click="removeOrder(index)"
                  >
                    Remove
                  </v-btn>
                </div>
              </v-card-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        v-if="orders.length === 0"
        class="text-center text-gray-600 mt-10"
      >
        <p>No orders yet. Go to <strong>Products</strong> to make your first order.</p>
      </v-col>
    </v-row>

    <!-- Grand Total -->
    <v-row v-if="orders.length > 0" class="mt-6">
      <v-col cols="12" class="text-right">
        <h2 class="font-bold text-lg text-primary">
          Grand Total: Ksh {{ grandTotal }}
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-primary {
  color: #1a237e;
}
.text-gray-700 {
  color: #4a4a4a;
}
.font-bold {
  font-weight: bold;
}
.font-semibold {
  font-weight: 600;
}
</style>