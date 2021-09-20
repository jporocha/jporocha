<template>
  <div class="mx-2">
    <v-card class="mx-auto mb-4" max-width="800">
      <v-card-title>Fale conosco</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              label="Nome"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pr-md-2">
            <v-text-field
              v-model="phoneNumber"
              label="Telefone"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="pl-md-2">
            <v-text-field
              outlined
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="assunto"
              outlined
              label="Mensagem"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pb-4">
        <v-spacer></v-spacer>
        <v-btn
          color="color4 white--text"
          :loading="isBusy"
          :disabled="isBusy"
          class="mr-2"
          type="submit"
          @click="sendData"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    name: "",
    phoneNumber: "",
    email: "",
    assunto: "",
    isBusy: false,
  }),
  methods: {
    sendData() {
      if (!this.name || !this.phoneNumber || !this.email || !this.assunto) {
        this.$root.vtoast.show({
          color: "orange",
          message: "Preencha todos os campos para envio.",
        });
        return;
      }
      this.isBusy = true;
      const payload = {
        name: this.name,
        phone: this.phoneNumber,
        email: this.email,
        content: this.assunto,
      };
      axios
        .post("/message", payload)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data.msg,
          });
          this.isBusy = false;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "red",
            message: err.response.data.msg,
          });
          this.isBusy = false;
        });
    },
  },
};
</script>