<template>
  <div>
    <v-card color="white" max-width="500px">
      <v-card-title>Cadastro de novo serviço</v-card-title>
      <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-select
                prepend-icon="mdi-account"
                v-model="projeto.client"
                label="Cliente"
                :rules="[rules.required]"
                :items="clients"
                item-text="name"
                item-value="_id"
                no-data-text="Não há clientes cadastrados."
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-select
                prepend-icon="mdi-file-cabinet"
                v-model="projeto.tipoProjeto"
                label="Tipo de serviço"
                :rules="[rules.required]"
                :items="tiposProjeto"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-file-document"
                outlined
                v-model="projeto.contrato"
                label="Número do contrato"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                prepend-icon="mdi-shield-account"
                v-model="projeto.profissionalHabilitado"
                label="Responsável técnico"
                :rules="[rules.required]"
                :items="admins"
                item-text="name"
                item-value="_id"
                outlined
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="mt-n4 pb-4">
          <v-btn
            color="red darken-1 white--text"
            class="ml-2"
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1 white--text"
            :loading="isBusy"
            :disabled="isBusy"
            class="mr-2"
            type="submit"
            @click="sendData"
          >
            Inserir serviço
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["selectedUser"],
  data() {
    return {
      projeto: {
        client: "",
        tipoProjeto: "",
        contrato: "",
        profissionalHabilitado: "",
      },
      clients: ["Posto Xuá", "Cliente 2"],
      admins: ["Felipe", "Douglas"],
      tiposProjeto: ["Projeto", "Inspeção", "Perícia"],
      isBusy: true,
      valid: true,
      rules: {
        required: (value) => !!value || "Campo deve ser preenchido.",
      },
    };
  },
  methods: {
    sendData() {
      this.isBusy = true;
      axios
        .post("/budget/createBudget", this.projeto)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.isBusy = false;
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data.erro,
          });
          this.isBusy = false;
        });
    },
    closeDialog() {
      this.$emit("close");
    },
    fetchUsers() {
      axios
        .get("/users")
        .then((res) => {
          this.clients = res.data.filter((el) => el.role === "cliente");
          this.admins = res.data.filter((el) => el.role === "admin");
          if (this.selectedUser) this.projeto.client = this.selectedUser;
          this.isBusy = false;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
          });
        });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
</style>