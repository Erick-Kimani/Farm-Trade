import { defineStore } from 'pinia'

export const useProductsStore = defineStore('Products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Fresh Red Apples',
        description:'Crisp, juicy, and naturally sweet apples freshly picked from local farms. Great for snacks or juicing.',
        price: 'ksh325 / kg',
        image:'/images/Apples.jpg',
      },
      {
        id: 2,
        name:'Organic Bananas',
        description:'Naturally ripened organic bananas rich in potassium and perfect for a healthy diet.',
        price: 'ksh200 / kg',
        image:'/images/RipeBananas.jpg',
      },
      {
        id: 3,
        name:'Irish Potatoes',
        description:'High-quality Irish potatoes ideal for boiling, frying, or mashing. Farm-fresh and rich in nutrients.',
        price: 'ksh100 / kg',
        image:'/images/Potatoes.jpg',
      },
      {
        id: 4,
        name: 'Sweet Potatoes',
        description:'Naturally sweet and full of fiber. Perfect for baking, boiling, or making healthy snacks.',
        price: 'ksh130 / kg',
        image:'/images/Sweetpotato.jpg',
      },
      {
        id: 5,
        name: 'Fresh Tomatoes',
        description:'Vibrant red tomatoes packed with flavor and vitamins. Ideal for salads, sauces, and stews.',
        price: 'ksh200 / kg',
        image:'/images/Tomatoes.jpg',
      },
      {
        id: 6,
        name: 'Green Vegetables (Spinach)',
        description:'Locally grown collard greens, rich in iron and vitamins. Perfect for traditional and modern dishes.',
        price: 'ksh35 / bunch',
        image:'/images/Spinach.jpg',
      },
       
      {
        id: 8,
        name:'Mangoes',
        description:'Juicy, tropical mangoes full of flavor and natural sweetness. A perfect treat for any time of day.',
        price: 'ksh30 / piece',
        image:'/images/Mango.jpg',
      },
      {
        id: 9,
        name:'Fresh Avocados',
        description:'Creamy, rich avocados — excellent for salads, guacamole, and spreads. High in healthy fats.',
        price: 'ksh50 / piece',
        image:'/images/Avocado.jpg',
      },

      {
        id: 12,
        name: 'Fresh Pineapples',
        description:'Sweet and tangy pineapples harvested at peak ripeness. Excellent for juicing or desserts.',
        price: 'ksh150 / piece',
        image:'/images/Pineapple.jpg',
      },
    
      {
        id: 13,
        name: 'Oranges',
        description: 'Juicy, vitamin C-rich oranges grown in sun-drenched orchards. Perfect for fresh juice or snacking.',
        price: 'ksh25 / piece',
        image: '/images/Oranges.jpg',
      },
      {
        id: 14,
        name: 'Watermelons',
        description: 'Large, refreshing watermelons with sweet red flesh—ideal for family gatherings and hot days.',
        price: 'ksh200 / piece',
        image: '/images/Watermelon.jpg',
      },
      {
        id: 15,
        name: 'Carrots',
        description: 'Bright orange, crunchy carrots—great for salads, soups, or as a healthy snack.',
        price: 'ksh80 / kg',
        image: '/images/Carrots.jpg',
      },
      {
        id: 16,
        name: 'Cucumbers',
        description: 'Cool and crisp cucumbers, perfect for salads, sandwiches, or fresh juices.',
        price: 'ksh60 / kg',
        image: '/images/Cucumber.jpg',
      },
      {
        id: 17,
        name: 'Papayas',
        description: 'Ripe, soft papayas loaded with enzymes and vitamins. Great for digestion and smoothies.',
        price: 'ksh100 / piece',
        image: '/images/Pawpaw.jpg',
      },
      {
        id: 18,
        name: 'Cabbages',
        description: 'Fresh green cabbages with firm leaves—ideal for coleslaw, stews, or stir-fries.',
        price: 'ksh40 / head',
        image: '/images/Cabbages.jpg',
      },
      {
        id: 19,
        name: 'Passion Fruits',
        description: 'Tangy and aromatic passion fruits, excellent for juices, desserts, or sauces.',
        price: 'ksh20 / piece',
        image: '/images/Passion.jpg',
      },
      {
        id: 20,
        name: 'Green Peas',
        description: 'Tender, sweet green peas freshly harvested—perfect for rice dishes or stews.',
        price: 'ksh120 / kg',
        image: '/images/Peas.jpg',
      },
      {
        id: 21,
        name: 'Lemons',
        description: 'Zesty, fresh lemons packed with citric acid—great for drinks, marinades, and cleaning.',
        price: 'ksh15 / piece',
        image: '/images/Lemon.jpg',
      },
      
    ],
    selectedProduct: null,
  }),

  actions: {
    selectProduct(product) {
      this.selectedProduct = product
    },
  },
})