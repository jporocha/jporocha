<template>
  <div>
    <div v-if="isLogged">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="blue darken-4" size="36">
              <span class="white--text text-h5">J</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h4>{{ isLogged.nome }}</h4>
              <v-divider class="my-3"></v-divider>
              <v-btn small depressed rounded text @click="clientArea"
                >Área do cliente</v-btn
              >
              <v-divider class="my-3"></v-divider>
              <v-btn small depressed rounded text @click="logOut">
                Desconectar
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
    <v-btn small @click="logIn" v-else> Login </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    isLogged() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logIn() {
      this.$router.push("login");
    },
    logOut() {
      axios
        .get("/auth/logout")
        .then(() => {
          this.$store.dispatch("setUser", null);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clientArea() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
</style>