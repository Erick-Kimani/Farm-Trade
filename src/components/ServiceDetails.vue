<script setup>
import { useServicesStore } from '@/stores/Services'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useServicesStore()

const service = store.selectedService

function goBack() {
  router.push('/services')
}
</script>

<template>
  <div class="service-details">
    <v-container>
      <v-card class="glass-card mx-auto pa-6" max-width="800">
        <v-img
          v-if="service"
          :src="service.image"
          aspect-ratio="1.7"
          class="rounded-lg mb-4"
          cover
        ></v-img>

        <v-card-title class="text-h5 text-white mb-2">{{ service?.name }}</v-card-title>
        <v-card-subtitle class="text-white mb-3">
          Category: {{ service?.category }} | Price: KSh {{ service?.price }}
        </v-card-subtitle>

        <v-card-text class="text-white text-body-1">
          {{ service?.longDescription }}
        </v-card-text>

        <v-card-actions class="mt-4">
          <v-btn color="bright-orange-lighten-2" dark @click="goBack">
            Back to Services
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<style scoped>
.service-details {
  background: linear-gradient(135deg, #506376, #4ca1af);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}
</style>
