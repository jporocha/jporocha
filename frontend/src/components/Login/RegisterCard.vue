<template>
  <v-card class="pa-2" width="300px">
    <v-card-title class="d-flex justify-center"> Registre-se </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mb-n3">
      <v-alert
        v-model="erro"
        dense
        color="error lighten-2"
        border="top"
        icon="mdi-error"
        dismissible
        >{{ msgErro }}</v-alert
      >
      <v-form ref="form" v-model="valid">
        <v-text-field
          prepend-icon="mdi-account"
          v-model="nome"
          label="Nome"
          required
          outlined
          dense
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-email-outline"
          v-model="email"
          label="E-mail"
          required
          outlined
          dense
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-shield-key"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          v-model="password"
          label="Escolha uma senha"
          required
          :type="showPass ? 'text' : 'password'"
          outlined
          dense
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-shield-key-outline"
          :append-icon="showCheck ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showCheck = !showCheck"
          v-model="passwordCheck"
          label="Digite a senha novamente"
          required
          :type="showCheck ? 'text' : 'password'"
          outlined
          dense
          :rules="passwordCheckRules"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-center mt-2">
      <v-btn @click="returnToLogin" color="red darken-2" min-width="100px" small
        >Cancelar</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!valid"
        @click="register"
        min-width="100px"
        color="green"
        small
        >Registrar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: false,
      nome: "",
      email: "",
      password: "",
      showPass: false,
      passwordCheck: "",
      showCheck: false,
      emailRules: [
        (v) => !!v || "Forneça um e-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      nameRules: [
        (v) => !!v || "Informe seu nome",
        (v) => (v && v.length >= 3) || "Nome deve ter ao menos 3 caracteres",
      ],
      passwordRules: [(v) => (v && v.length >= 8) || "Senha inválida"],
      passwordCheckRules: [
        (v) => (v && v.length >= 8) || "Senha muito curta",
        () => this.password === this.passwordCheck || "Senhas inválida",
      ],
      erro: false,
      msgErro: "",
    };
  },
  methods: {
    returnToLogin() {
      this.$emit("Login");
    },
    register() {
      let payload = {
        name: this.nome,
        email: this.email,
        password: this.password,
      };
      axios
        .post("/users/createUser", payload)
        .then(() => {
          this.$root.vtoast.show({ message: "Usuário criado com sucesso." });
          this.$emit("Login");
        })
        .catch((err) => {
          (this.erro = true), (this.msgErro = err.response.data);
        });
    },
  },
};
</script>

<style scoped>
</style>