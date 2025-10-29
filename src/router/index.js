// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Import all components
import Home from "@/components/Home.vue";
import AboutUs from "@/components/AboutUs.vue";
import Admin from "@/components/Admin.vue";
import Login from "@/components/Login.vue";
import Orders from "@/components/Orders.vue";
import Delivery from "@/components/Delivery.vue"; 
import Products from "@/components/Products.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import Services from "@/components/Services.vue";
import ServiceDetails from "@/components/ServiceDetails.vue";
import Signup from "@/components/Signup.vue";
import TermsAndConditions from "@/components/TermsAndConditions.vue";

const routes = [

  { path: "/",
     name: "home",
     component: Home },

  { path: "/aboutus",
     name: "aboutus",
    component: AboutUs },

  { path: "/termsandconditions",
    name: "termsandconditions",
    component: TermsAndConditions },

    {path:"/products",
      name:"products",
      component: Products},

    {path:"/productdetails",
    name:"productsdetails",
    component: ProductDetails},

  { path: "/login", 
    name: "login", 
    component: Login },

  { path: "/signup",
    name: "signup",
    component: Signup },
  
  { path: "/services",
    name: "services", 
    component: Services },

  {path: "/service-details"
    ,name: "servicedetails",
    component: ServiceDetails,},


     {path: "/delivery",
    name: "delivery",
    component: Delivery,
    meta: { requiresAuth: true }, // Only logged-in users
  },

  
  {path: "/orders",
    name: "orders",
    component: Orders,
    meta: { requiresAuth: true }, // Only logged-in users

  },

  {path: "/admin",
    name: "admin",
   component: Admin,
    meta: { requiresAdmin: true }, // Only Erick Kimani

 },

  //  Catch-all redirect
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//  Route Guards
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  //  Admin-only routes
  if (to.meta.requiresAdmin) {
    if (
      isLoggedIn &&
      user &&
      isAdmin &&
      user.name === "Erick Kimani" &&
      user.email === "erick11768kimani@gmail.com" &&
      user.password === "erick2022"
    ) {
      next(); // Access granted
    } else {
      alert("Access Denied! Admin only.");
      next("/"); //  Redirect to Home
    }
    return;
  }

  //  Auth-required routes (Orders, etc.)
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert(" Please log in to view your orders.");
    next("/login");
    return;
  }

  next();
});

export default router;
