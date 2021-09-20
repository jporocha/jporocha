<template>
  <v-card class="pa-2" width="300px">
    <v-card-title class="d-flex justify-center">
      Recuperação de senha
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form v-model="form1">
        <v-text-field
          prepend-icon="mdi-email-outline"
          v-model="email"
          label="Digite seu e-mail"
          :rules="emailRules"
          required
          outlined
          dense
          :disabled="disableMail"
          @keydown.enter="requestToken"
        ></v-text-field>
        <div class="d-flex justify-center mb-3">
          <v-btn
            :disabled="disableMail || !form1"
            @click="requestToken"
            color="blue"
            min-width="150px"
            small
            >Enviar código</v-btn
          >
        </div>
      </v-form>
      <transition name="slide">
        <v-form v-model="form2" v-if="sentCode">
          <v-divider class="mb-4 mt-4"></v-divider>
          <v-text-field
            prepend-icon="mdi-account-key-outline"
            v-model="code"
            label="Token"
            :rules="tokenRules"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-shield-key"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
            v-model="password"
            label="Nova senha"
            :rules="passwordRules"
            :type="showPass ? 'text' : 'password'"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-shield-key"
            :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass2 = !showPass2"
            v-model="password2"
            :type="showPass2 ? 'text' : 'password'"
            label="Repita a senha"
            :rules="passwordCheckRules"
            outlined
            dense
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn
              :disabled="!form2"
              @click="changePassword"
              color="green"
              min-width="150px"
              small
              >Redefinir senha</v-btn
            >
          </div>
        </v-form>
      </transition>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center mt-2">
      <v-btn
        min-width="150px"
        color="red darken-2"
        @click="returnToLogin"
        small
      >
        Cancelar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form1: false,
      form2: false,
      sentCode: false,
      email: "",
      code: "",
      password: "",
      password2: "",
      disableMail: false,
      showPass: false,
      showPass2: false,
      emailRules: [
        (v) => !!v || "Forneça um e-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      passwordRules: [(v) => (v && v.length >= 8) || "Senha inválida"],
      tokenRules: [(v) => (v && v.length >= 20) || "Token inválido"],
      passwordCheckRules: [
        (v) => (v && v.length >= 8) || "Senha muito curta",
        () => this.password === this.password2 || "Senhas inválida",
      ],
    };
  },
  methods: {
    returnToLogin() {
      this.$emit("Login");
    },
    requestToken() {
      let payload = { email: this.email };
      this.disableMail = true;
      axios
        .post("/users/recoverPassword", payload)
        .then((res) => {
          this.sentCode = true;
          this.$root.vtoast.show({
            message: res.data,
          });
        })
        .catch((err) => {
          this.disableMail = false;
          this.$root.vtoast.show({
            color: "red",
            message: err.response.data,
          });
        });
    },
    changePassword() {
      if (this.password != this.password2) {
        return this.$root.vtoast.show({
          color: "red",
          message: "Confira sua senha.",
        });
      }
      let payload = {
        email: this.email,
        token: this.code,
        password: this.password,
      };
      axios
        .post("/users/resetPassword", payload)
        .then((res) => {
          this.$root.vtoast.show({
            message: res.data,
          });
          this.$emit("Login");
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "red",
            message: err.response.data,
          });
        });
    },
  },
};
</script>

<style scoped>
@keyframes slide {
  0% {
    opacity: 1;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

.slide-enter-active {
  animation: slide 0.3s;
}

.slide-leave-active {
  animation: slide 0.3s reverse;
}
</style>