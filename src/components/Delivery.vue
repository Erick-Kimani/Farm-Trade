<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :items="userDeliveries"
      class="elevation-1 delivery-table"
      :hide-default-footer="userDeliveries.length < 11"
    >
      <!-- ✅ Toolbar -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon icon="mdi-truck-delivery" start color="primary"></v-icon>
            My Delivery Details
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
            prepend-icon="mdi-refresh"
            rounded="lg"
            text="Reload"
            border
            @click="loadDeliveries"
          ></v-btn>
        </v-toolbar>

        <!-- ✅ Fixed Top Section for Order ID, Phone, and Address -->
        <v-card class="pa-4 mt-3 mb-4 fixed-info-card" outlined>
          <div class="info-section">
            <div class="info-item">
              <strong>Order ID:</strong>
              <div class="order-id-highlight">
                <v-icon color="primary" icon="mdi-identifier" class="mr-2"></v-icon>
                {{ userOrderId }}
              </div>
            </div>

            <div class="info-item">
              <strong>Phone:</strong>
              <v-text-field
                v-model="userPhone"
                variant="outlined"
                density="comfortable"
                hide-details
                placeholder="Enter your phone number"
                class="manual-input"
              ></v-text-field>
            </div>

            <div class="info-item">
              <strong>Address:</strong>
              <v-text-field
                v-model="userAddress"
                variant="outlined"
                density="comfortable"
                hide-details
                placeholder="Enter your address"
                class="manual-input"
              ></v-text-field>
            </div>
          </div>
        </v-card>
      </template>

      <!-- ✅ Editable columns -->
      <template v-slot:item.status="{ item }">
        <v-select
          v-model="item.status"
          :items="['Processing', 'Out for Delivery', 'Delivered']"
          variant="plain"
          density="compact"
          hide-details
          @update:model-value="saveDeliveries"
        ></v-select>
      </template>

      <template v-slot:item.estimatedTime="{ item }">
        <v-text-field
          v-model="item.estimatedTime"
          variant="plain"
          density="compact"
          hide-details
          placeholder="Enter ETA..."
          @blur="saveDeliveries"
        ></v-text-field>
      </template>

      <!-- ✅ No Data -->
      <template v-slot:no-data>
        <div class="text-center pa-6">
          <v-icon size="large" color="grey">mdi-package-variant</v-icon>
          <p class="mt-3 text-grey">No orders available for delivery yet.</p>
          <v-btn color="primary" rounded="lg" text @click="$router.push('/orders')">
            Go to Orders Page
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const deliveries = ref([])
const currentUser = ref(null)
const userPhone = ref('')
const userAddress = ref('')

// ✅ Fixed Order ID per user
const userOrderId = computed(() => {
  if (!currentUser.value) return ''
  const initials = currentUser.value.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
  return `ORD-${initials}-001`
})

// ✅ Headers for delivery table
const headers = [
  { title: 'Product Name', key: 'productName' },
  { title: 'Quantity', key: 'quantity' },
  { title: 'Status', key: 'status' },
  { title: 'ETA', key: 'estimatedTime' },
]

// ✅ Filter deliveries only for logged-in user
const userDeliveries = computed(() =>
  deliveries.value.filter((d) => d.customer === currentUser.value?.name)
)

// ✅ Load deliveries
function loadDeliveries() {
  currentUser.value =
    JSON.parse(localStorage.getItem('user')) || {
      name: 'John Mwangi',
    }

  const storedOrders = JSON.parse(localStorage.getItem('order')) || []

  deliveries.value = storedOrders.map((order) => ({
    id: order.product?.id || Date.now(),
    customer: currentUser.value.name,
    productName: order.product?.name || 'Unknown Product',
    quantity: order.quantity,
    status: 'Processing',
    estimatedTime: 'Pending',
  }))

  // Load saved phone/address if they exist
  const savedDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {}
  userPhone.value = savedDetails.phone || ''
  userAddress.value = savedDetails.address || ''
}

// ✅ Save deliveries and personal details
function saveDeliveries() {
  localStorage.setItem('deliveries', JSON.stringify(deliveries.value))
}

watch([userPhone, userAddress], ([newPhone, newAddress]) => {
  localStorage.setItem(
    'deliveryDetails',
    JSON.stringify({ phone: newPhone, address: newAddress })
  )
})

onMounted(() => {
  loadDeliveries()
})
</script>

<style scoped>
.delivery-table :deep(th),
.delivery-table :deep(td) {
  border-right: none !important;
  border-left: none !important;
}

/* 🌟 Enhanced Order ID visibility */
.order-id-highlight {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e3f2fd;
  color: #0d47a1;
  border: 2px solid #2196f3;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
  text-transform: uppercase;
}

.fixed-info-card {
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
}

.info-section {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
}

.info-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 220px;
}

.manual-input {
  max-width: 280px;
}

.text-grey {
  color: #777;
}
</style>
