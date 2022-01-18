<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12 white--text" shaped>
            <v-toolbar dark flat>
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="loginForm.username"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="loginForm.password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="login()">Login</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" bottom :color="color" right timeout="4000">
      {{ message }}
    </v-snackbar>
  </v-content>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {},
      snackbar: false,
      message: "",
      color: "error",
    };
  },
  methods: {
    login() {
      this.$http
        .post("auth/login", this.loginForm)
        .then((res) => {
          if (res.status == 200) {
            const data = res.data;
            this.color = "success";
            this.message = "Login Success";
            this.snackbar = true;
            localStorage.setItem("token", `Bearer ${data.token}`);
            this.$router.push({ name: "Auction" });
          } else {
            this.color = "error";
            this.message = "Login Error";
            this.snackbar = true;
          }
        })
        .catch(() => {
          this.color = "error";
          this.message = "Login Error";
          this.snackbar = true;
        });
    },
  },
};
</script>
