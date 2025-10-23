<template>
  <div class="terms-container text-center">
    <v-btn
      variant="text"
      color="yellow-lighten-3"
      class="mt-2"
      @click="dialog = true"
    >
       🛡️Terms & Conditions
    </v-btn>

    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title class="text-h6"> Terms & Conditions</v-card-title>
        <v-divider></v-divider>

        <v-card-text style="max-height: 400px; overflow-y: auto;">
          <p>
            Welcome to <strong>FarmTrade Hub</strong>. By using our platform,
            you agree to comply with and be bound by the following Terms and Conditions.
          </p>

          <p><strong>1. User Responsibilities:</strong> You agree to provide accurate information and comply with all local regulations when buying or selling produce.</p>
          <p><strong>2. Seller Conduct:</strong> Farmers are responsible for ensuring the quality and accuracy of listed products.</p>
          <p><strong>3. Payment:</strong> All payments must be made through approved payment options listed on the platform.</p>
          <p><strong>4. Delivery:</strong> Delivery times and charges vary by location. FarmTrade Hub is not liable for third-party courier delays.</p>
          <p><strong>5. Disputes:</strong> Any dispute should first be raised with customer support for amicable resolution.</p>
          <p><strong>6. Privacy:</strong> We respect your privacy and protect your data as per our privacy policy.</p>
          <p><strong>7. Changes:</strong> FarmTrade Hub reserves the right to modify these terms at any time. Continued use of the platform implies acceptance of updated terms.</p>
          <p>For more information, contact us at <strong>farmtradehub@gmail.com</strong>.</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end">
          <v-btn text="Close" color="teal-darken-3" @click="dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
const dialog = ref(false);
</script>

<style scoped>
.terms-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
