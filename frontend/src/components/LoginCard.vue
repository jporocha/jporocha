<template>
  <v-card class="pa-2" width="300px">
    <v-card-title class="d-flex justify-center"> Login </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          prepend-icon="mdi-email-outline"
          v-model="email"
          label="E-mail"
          required
          outlined
          :rules="emailRules"
          dense
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account-key-outline"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          v-model="password"
          label="Senha"
          required
          outlined
          dense
          :rules="passwordRules"
        ></v-text-field>
        <div class="d-flex justify-center">
          <v-btn @click="login" color="green" min-width="150px" small
            >Entrar</v-btn
          >
        </div>
        <div
          @click="newEvent('ForgotPass')"
          class="link caption text-center mt-4"
        >
          Esqueceu sua senha? Clique aqui.
        </div>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="mb-2">
      <v-row class="d-flex justify-center">
        <div
          @click="newEvent('Register')"
          class="link d-flex caption justify-center text-center mt-3 mx-5"
        >
          Novo aqui? Crie seu registro.
        </div>
        <div class="d-flex caption justify-center text-center mb-3">
          Ou, se preferir...
        </div>
        <!--         <v-btn
          small
          color="blue"
          width="230"
          @click="FacebookLogin"
          class="darken-2 white--text mb-2"
          ><v-icon class="mx-1">mdi-facebook</v-icon> Entrar com o Facebook
        </v-btn> -->
        <v-btn
          small
          color="red darken-1"
          width="230"
          @click="GoogleLogin"
          class="white--text"
          ><v-icon small class="mx-1">mdi-google</v-icon> Entrar com o Google
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      showPass: false,
      valid: null,
      emailRules: [
        (v) => !!v || "Forneça um e-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      passwordRules: [(v) => (v && v.length >= 8) || "Senha inválida"],
    };
  },
  methods: {
    FacebookLogin() {
      window.location = `${process.env.VUE_APP_SERVER}/auth/facebook`;
    },
    GoogleLogin() {
      window.location = `${process.env.VUE_APP_SERVER}/auth/google`;
    },
    login() {
      let payload = {
        username: this.email,
        password: this.password,
      };
      axios
        .post("/auth/login", payload)
        .then(() => {
          this.$root.vtoast.show({ message: "Login realizado com sucesso." });
          this.$router.push("Dashboard");
        })
        .catch(() => {
          this.$root.vtoast.show({
            message: "Falha no login do usuário",
            color: "red lighten-2",
            icon: "mdi-account-alert",
          });
        });
    },
    newEvent(payload) {
      this.$emit(payload);
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: darkblue;
  display: block;
}
</style>
