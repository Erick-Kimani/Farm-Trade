<script setup>
import { useRouter } from 'vue-router'
import { useServicesStore } from '@/stores/Services'

const router = useRouter()
const store = useServicesStore()

function viewDetails(service) {
  store.updateSelectedService(service)
  router.push('/service-details')
}
</script>

<template>
  <div class="services-page">
    <v-container>
      <h1 class="text-center text-yellow mb-8"><strong>Our Farm Services</strong></h1>

      <v-row justify="center" align="stretch" dense>
        <v-col
          v-for="(service, id) in store.services"
          :key="id"
          cols="12"
          sm="6"
          md="4"
          class="d-flex justify-center"
        >
          <v-card class="glass-card pa-4" max-width="360">
            <v-img
              :src="service.image"
              aspect-ratio="1"
              class="rounded-lg mb-3"
              cover
            ></v-img>
            <v-card-title class="text-h6 text-white">{{ service.name }}</v-card-title>
            <v-card-text class="text-white">{{ service.description }}</v-card-text>
            <v-card-actions>
              <v-btn
                color="deep-orange-lighten-2"
                variant="flat"
                class="mt-2"
                @click="viewDetails(service)"
              >
                View Details
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.services-page {
  background: linear-gradient(135deg, #fddbdb, #101414);
  min-height: 100vh;
  padding: 50px 0;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(19px);
  border-radius: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}
.glass-card:hover {
  transform: translateY(-5px);
}
</style>
