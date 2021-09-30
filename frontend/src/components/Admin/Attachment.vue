<template>
  <div>
    <v-card color="white" max-width="700px">
      <v-card-title>Envio de documentação</v-card-title>
      <v-form ref="form">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-file-input
                dense
                outlined
                label="Anexo"
                v-model="attachment"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="validadeFormatada"
                    label="Validade dos dados"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="validade"
                  locale="pt-br"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
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
            :disabled="isBusy || !formOk"
            class="mr-2"
            type="submit"
            @click="sendData"
          >
            Enviar documentação
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      isBusy: false,
      attachment: null,
      menu: false,
      validade: null,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  computed: {
    validadeFormatada() {
      return this.validade ? dayjs(this.validade).format("DD/MM/YYYY") : "";
    },
    formOk() {
      return this.attachment && this.validade;
    },
  },
  methods: {
    sendData() {
      this.isBusy = true;
      let form = new FormData();
      form.append("attachment", this.attachment);
      form.append("expiration", this.validadeFormatada);
      form.append("id", this.id);
      axios
        .post("/budget/insertAttachment", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.isBusy = false;
          this.attachment = null;
          this.validade = null;
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
  },
};
</script>

<style scoped>
</style>