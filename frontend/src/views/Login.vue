<template>
  <v-container
    fluid
    class="d-flex fill-height justify-center align-center cardBG"
    ><v-spacer></v-spacer>
    <v-card class="pa-2" width="300px">
      <v-card-title class="d-flex justify-center"> Login </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="mdi-email-outline"
            v-model="email"
            label="E-mail"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account-key-outline"
            append-icon="mdi-eye-off-outline"
            v-model="password"
            label="Senha"
            required
            type="password"
            outlined
            dense
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn min-width="150px" small>Entrar</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <div class="mx-2 my-5 d-flex align-center">
        <v-row class="d-flex justify-center">
          <v-col cols="12" class="d-flex caption justify-center text-center">
            Não tem cadastro? Registre-se aqui. <br />
            Ou, se preferir...
          </v-col>
          <v-btn
            small
            color="blue"
            width="230"
            @click="FacebookLogin"
            class="darken-2 white--text"
            ><v-icon class="mx-1">mdi-facebook</v-icon> Entrar com o Facebook
          </v-btn>
          <v-btn
            small
            color="red darken-1 mt-2"
            width="230"
            @click="GoogleLogin"
            class="white--text"
            ><v-icon small class="mx-1">mdi-google</v-icon> Entrar com o Google
          </v-btn>
        </v-row>
      </div>
    </v-card>
    <v-spacer></v-spacer>
  </v-container>
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
    FacebookLogin() {
      window.location = `${process.env.VUE_APP_SERVER}/auth/facebook`;
    },
    GoogleLogin() {
      window.location = `${process.env.VUE_APP_SERVER}/auth/google`;
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>