<template>
  <div>
    <v-row class="justify-center mx-auto mt-5"> Já possui uma conta? Entre com seus dados: </v-row>
    <v-row class="justify-center mx-auto my-5">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" label="E-mail" required outlined dense></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          required
          type="password"
          outlined
          dense
        ></v-text-field>
        <v-row class="justify-center mx-auto my-1">
<v-btn small>Entrar</v-btn>
        </v-row>
      </v-form>
    </v-row>
    <v-divider></v-divider>
    <v-row  class="justify-center mx-5 mt-5">
      <v-btn small color="blue" width="200" @click="Login" class="blue white--text"
        >Entrar com o Facebook</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: null,
    };
  },
  methods: {
    Login() {
      window.location = "http://localhost/api/auth/facebook";
    },
  },
};
</script>

<style scoped>
</style>