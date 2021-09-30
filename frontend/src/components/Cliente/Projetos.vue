<template>
  <v-card>
    <v-card-title class="py-3 my-0" v-if="budgets.length">
      <v-text-field
        style="max-width: 600px"
        outlined
        dense
        class="white"
        v-model="busca"
        append-icon="mdi-magnify"
        label="Busca"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      v-if="budgets.length"
      :headers="budgetHeader"
      :items="budgets"
      :expanded.sync="expanded"
      dense
      show-expand
      :search="busca"
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando serviços..."
      no-data-text="Não há serviços a exibir..."
      :items-per-page="5"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Serviços por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="my-2" v-if="item.anexos.length">
            <v-simple-table>
              <thead>
                <tr>
                  <th>Nome do arquivo</th>
                  <th>Validade</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tr v-for="anexo in item.anexos" :key="anexo._id">
                <td>{{ anexo.filename }}</td>
                <td>{{ anexo.validade }}</td>
                <td>
                  <v-btn icon color="blue" @click="downloadFile(anexo)">
                    <v-icon small>mdi-file</v-icon>
                  </v-btn>
                </td>
              </tr>
            </v-simple-table>
          </div>
          <div v-else>Projeto não possui arquivos vinculados.</div>
        </td>
      </template>
    </v-data-table>
    <div v-if="!budgets.length">
      Você não possui serviços cadastrados no sistema
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    budgetHeader() {
      let headers = [
        {
          text: "Tipo",
          value: "tipoProjeto",
          sortable: false,
        },
        { text: "Cliente", value: "client.name", sortable: false },
        {
          text: "Responsável",
          value: "profissionalHabilitado.name",
          sortable: false,
        },
        { text: "Contrato", value: "contrato", sortable: false },
        { text: "Anexos", value: "data-table-expand", sortable: false },
      ];
      return headers;
    },
  },
  data() {
    return {
      budgets: [],
      expanded: [],
      loading: true,
      busca: "",
    };
  },
  methods: {
    FetchBudgets() {
      axios
        .get("/budget/byId")
        .then((res) => {
          console.log("Budgets:", res.data);
          this.budgets = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err.data);
          this.loading = false;
        });
    },
    downloadFile(file) {
      axios
        .post(
          `/budget/anexo`,
          { file },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.filename);
          document.body.appendChild(link);
          link.click();
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
    this.FetchBudgets();
  },
};
</script>

<style scoped>
</style>