<template>
  <v-app>
    <v-app-bar app color="white" light hide-on-scroll>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('@/assets/mcl.png')"
          transition="scale-transition"
          width="40"
        />
      </div>
      <span>MCL Abu Dhabi</span>
      <v-spacer></v-spacer>
      <span v-if="checkLoggedIn()"
        ><v-btn to="/auction" text>
          <span class="mr-2">Auction</span>
          <v-icon>mdi-account-cash</v-icon>
        </v-btn>
        <v-btn to="/players" text>
          <span class="mr-2">Players</span>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
        <v-btn text @click="logOut">
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn></span
      >
    </v-app-bar>

    <v-main style="background-color: rgb(15, 66, 93)">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  created() {
    if (!localStorage.getItem("token") && this.$route.name != "Login") {
      this.$router.push({ name: "Login" });
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
    checkLoggedIn() {
      return localStorage.getItem("token") ? true : false;
    },
  },
};
</script>
