<template>
  <div class="mx-2">
    <v-card class="mx-auto mb-4" max-width="800">
      <v-card-title>Fale conosco</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                v-model="name"
                label="Nome"
                :rules="[rules.required]"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pr-md-2">
              <v-text-field
                prepend-icon="mdi-phone"
                v-model="phoneNumber"
                label="Telefone"
                placeholder="(XX)X1234-5678"
                :rules="[rules.phoneRule]"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pl-md-2">
              <v-text-field
                prepend-icon="mdi-email"
                outlined
                v-model="email"
                label="E-mail"
                :rules="[rules.mailRule]"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="assunto"
                :rules="[rules.required]"
                outlined
                label="Mensagem"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-n4 pb-4">
          <v-spacer></v-spacer>
          <v-btn
            color="color4 white--text"
            :loading="isBusy"
            :disabled="isBusy"
            class="mr-2"
            type="submit"
            @click="sendData"
            small
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-form>
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
    valid: true,
    rules: {
      required: (value) => !!value || "Campo deve ser preenchido.",
      phoneRule: (value) => {
        const pattern = /^(\(?\d{2}\)?)?(\d{4,5})(\-)?(\d{4})/;
        return pattern.test(value) || "Telefone inválido";
      },
      mailRule: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "E-mail inválido";
      },
    },
  }),
  methods: {
    sendData() {
      if (!this.valid) {
        this.$refs.form.validate();
        this.$root.vtoast.show({
          color: "orange",
          message: "Preencha corretamente os campos.",
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
          this.$refs.form.reset();
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