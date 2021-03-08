import Vue from "vue";
import VueRouter from "vue-router";

import Players from "@/views/Players.vue";
import Auction from "@/views/Auction.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Players",
    path: "/",
    component: Players,
  },
  {
    name: "Players",
    path: "/players",
    component: Players,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Auction",
    path: "/auction",
    component: Auction,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
