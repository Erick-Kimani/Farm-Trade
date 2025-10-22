import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => {
    const services = {
      1: {
        name: 'Farm Produce Delivery',
        image: '/images/farmproducedelivery.jpg',
        price: 150,
        description: 'Fast and reliable delivery of fresh farm produce to your doorstep.',
        longDescription:'Our farm produce delivery service ensures customers receive fresh vegetables, fruits, and grains right from the farm to their homes or business locations. We prioritize hygiene, timely delivery, and safe transportation to maintain the natural quality of all items. Available for both individual and bulk orders.',
        category: 'Logistics',
      },
      2: {
        name: 'Soil Testing & Analysis',
        image: '/images/soiltestinganalysis.jpg',
        price: 1200,
        description: 'Comprehensive soil testing to improve your farm yield.',
        longDescription:'We provide advanced soil testing and fertility analysis to determine the right nutrients for your crops. Our experts will guide you with customized fertilizer recommendations, water pH checks, and soil improvement advice to help you achieve sustainable and healthy crop growth.',
        category: 'Agronomy',
      },
      3: {
        name: 'Irrigation System Installation',
        image: '/images/Irrigationsysteminstallation.jpg',
        price: 8500,
        description: 'Affordable and efficient irrigation systems for farms of all sizes.',
        longDescription:'We specialize in installing modern drip, sprinkler, and pivot irrigation systems to help farmers conserve water and maximize yield. Our team designs each setup according to your farm’s layout, crop type, and water availability. Maintenance and training are also included.',
        category: 'Infrastructure',
      },
      4: {
        name: 'Farm Equipment Rental',
        image: '/images/Rentalfarmequipments.jpg',
        price: 2500,
        description: 'Get access to modern farm machinery without huge investment.',
        longDescription:'Our equipment rental service provides tractors, plows, harvesters, and irrigation pumps for short- and long-term use. We ensure all machines are well-maintained and ready to perform efficiently on your farm. Optional operator services are also available on request.',
        category: 'Machinery',
      },
      5: {
        name: 'Crop Advisory & Training',
        image: '/images/Agriculturaltraining.jpg',
        price: 600,
        description: 'Expert advice and workshops on crop management and agribusiness.',
        longDescription:'Our crop advisory team offers field visits, pest management solutions, and productivity enhancement training. We help farmers apply modern farming practices, sustainable methods, and digital tools to grow their agribusiness effectively. Training available both online and onsite.',
        category: 'Education',
      },
      6: {
        name: 'Greenhouse Setup',
        image: '/images/GreenHouse.jpg',
        price: 12500,
        description: 'Complete greenhouse construction and crop management services.',
        longDescription:'We design, build, and maintain high-quality greenhouses that enhance your farm’s productivity throughout the year. Our team ensures optimal irrigation, ventilation, and temperature control systems. We also provide guidance on ideal crops for your region and soil type.',
        category: 'Temporary structures',
      },
    }

    const selectedService = ref(null)

    return { services, selectedService }
  },

  actions: {
    updateSelectedService(service) {
      this.selectedService = service
    },
  },
})
