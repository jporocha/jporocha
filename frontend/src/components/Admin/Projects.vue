<template>
  <v-card>
    <v-card-title class="py-3 my-0">
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
      <v-btn class="my-2" small color="color1 white--text" @click="createJob"
        >Inserir serviço</v-btn
      >
    </v-card-title>
    <v-data-table
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              disabled
              icon
              @click="editProject(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="blue">mdi-database-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar serviço</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="insertAttachment(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="green">mdi-attachment</v-icon>
            </v-btn>
          </template>
          <span>Inserir anexo</span>
        </v-tooltip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="my-2" v-if="item.anexos.length">
            <v-simple-table>
              <thead>
                <tr>
                  <th>Download</th>
                  <th>Nome do arquivo</th>
                  <th>Validade</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tr v-for="anexo in item.anexos" :key="anexo._id">
                <td>
                  <v-btn icon color="blue" @click="downloadFile(anexo)">
                    <v-icon small>mdi-file</v-icon>
                  </v-btn>
                </td>
                <td>{{ anexo.filename }}</td>
                <td>{{ anexo.validade }}</td>
                <td>
                  <v-btn
                    icon
                    disabled
                    color="red"
                    @click="removeFile(item._id, anexo._id)"
                  >
                    <v-icon small>mdi-trash-can</v-icon>
                  </v-btn>
                </td>
              </tr>
            </v-simple-table>
          </div>
          <div v-else>Projeto não possui anexos.</div>
        </td>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="projectDialog">
      <NewProject
        :selectedUser="selectedProjectOwner"
        :key="selectedProjectOwner"
        v-on:close="closeProject"
      />
    </v-dialog>
    <v-dialog max-width="700" v-model="attachDialog">
      <NewAttachment :id="attachId" v-on:close="closeAttach" />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import NewProject from "./Project.vue";
import NewAttachment from "./Attachment.vue";

export default {
  components: {
    NewProject,
    NewAttachment,
  },
  computed: {
    budgetHeader() {
      let headers = [
        { text: "Id.", value: "_id", sortable: false },
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
        { text: "Ações", value: "actions", sortable: false },
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
      projectDialog: false,
      selectedProjectOwner: null,
      attachDialog: false,
      attachId: "",
    };
  },
  methods: {
    FetchBudgets() {
      axios
        .get("/budget/all")
        .then((res) => {
          this.budgets = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err.data);
          this.loading = false;
        });
    },
    editProject(ev) {
      console.log(ev);
    },
    insertAttachment(ev) {
      this.attachId = ev._id;
      this.attachDialog = true;
    },
    createJob() {
      this.projectDialog = true;
    },
    closeProject() {
      this.projectDialog = false;
    },
    closeAttach(reload) {
      this.attachDialog = false;
      if (reload) this.FetchBudgets();
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
    removeFile(projeto, arquivo) {
      console.log(projeto);
      console.log(arquivo);
    },
  },
  mounted() {
    this.FetchBudgets();
  },
};
</script>

<style scoped>
</style>