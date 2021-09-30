<template>
  <v-card width="100%">
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
      <v-btn
        class="my-2"
        small
        color="color1 white--text"
        @click="createUser"
        v-if="tipo === 'cliente'"
        >Inserir cliente</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="usersHeader"
      :items="users"
      :search="busca"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando usuários..."
      no-data-text="Não há usuários a exibir..."
      :items-per-page="10"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Usuários por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item._id`]="{ item }">
        {{ convertToDate(item._id) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="item.role === 'admin'"
              icon
              @click="demoteUser(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="red">mdi-account-minus</v-icon>
            </v-btn>
          </template>
          <span>Remover acesso</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="item.role === 'cliente'"
              icon
              @click="editUser(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="purple">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar cliente</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="item.role === 'cliente'"
              icon
              @click="createJob(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="green">mdi-folder-account</v-icon>
            </v-btn>
          </template>
          <span>Novo projeto</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="item.role === 'cliente'"
              icon
              @click="promoteUser(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small color="blue">mdi-account-star</v-icon>
            </v-btn>
          </template>
          <span>Tornar administrador</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="dialog">
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>
        <v-card-text class="text-justify">{{ cardText }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          ><v-btn small color="red" @click="dialog = false">Cancelar</v-btn
          ><v-spacer></v-spacer
          ><v-btn small color="green" @click="execAction"
            >Confirmar</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
    <v-dialog max-width="500" v-model="userDialog">
      <EditUser :key="userKey" :user="user" v-on:close="closeUser" />
    </v-dialog>
    <v-dialog max-width="500" v-model="projectDialog">
      <NewProject
        :selectedUser="activeAction.owner"
        :key="activeAction.owner"
        v-on:close="closeProject"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import EditUser from "./EditUser.vue";
import NewProject from "./Project.vue";

export default {
  props: ["tipo"],
  components: {
    EditUser,
    NewProject,
  },
  computed: {
    usersHeader() {
      let headers = [
        {
          text: "Nome",
          value: "name",
          sortable: false,
        },
        { text: "E-mail", value: "email", sortable: false },
        { text: "Cadastro", value: "tipo", sortable: false },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
      return headers;
    },
  },
  data() {
    return {
      users: [],
      loading: true,
      busca: "",
      cardTitle: "",
      cardText: "",
      dialog: false,
      activeAction: {
        owner: "",
      },
      userDialog: false,
      projectDialog: false,
      user: null,
      userKey: Math.random(),
    };
  },
  methods: {
    fetchUsers() {
      axios
        .get("/users")
        .then((res) => {
          this.users = res.data.filter((el) => el.role === this.tipo);
          this.users.forEach(
            (user) => (user.tipo = user.googleId ? "Google" : "Local")
          );
          this.loading = false;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
          });
          this.loading = false;
        });
    },
    promoteUser(item) {
      this.dialog = true;
      this.cardTitle = "Promover usuário";
      this.cardText = `Tem certeza que deseja promover o usuário ${item.name} (${item.email}) para perfil de administrador do sistema?`;
      this.activeAction = {
        method: "put",
        target: `/users/${item._id}`,
        payload: {
          role: "admin",
        },
        user: item._id,
      };
    },
    demoteUser(item) {
      this.dialog = true;
      this.cardTitle = "Remover privilégio";
      this.cardText = `Tem certeza que deseja remover o privilégio de administrador do usuário ${item.name} (${item.email})?`;
      this.activeAction = {
        method: "put",
        target: `/users/${item._id}`,
        payload: {
          role: "cliente",
        },
        user: item._id,
      };
    },
    createJob(item) {
      this.dialog = true;
      this.cardTitle = "Criar novo projeto";
      this.cardText = `Criar novo projeto vinculado ao cliente ${item.name} (${item.email})?`;
      this.activeAction = {
        target: `/jobs`,
        owner: item._id,
      };
    },
    execAction() {
      if (this.activeAction.target === "/jobs") {
        this.dialog = false;
        this.projectDialog = true;
        return;
      }
      axios[this.activeAction.method](
        `${this.activeAction.target}`,
        this.activeAction.payload
      )
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.$emit("usersChanged");
          if (this.activeAction.user) {
            let index = this.users.findIndex(
              (el) => el._id === this.activeAction.user
            );
            this.users[index].role = this.activeAction.payload.role;
          }
          this.dialog = false;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
          });
        });
    },
    closeUser(reload) {
      if (reload) this.fetchUsers();
      this.userDialog = false;
    },
    closeProject(reload) {
      if (reload) this.$emit("FetchProjects");
      this.projectDialog = false;
    },
    editUser(user) {
      this.user = user;
      this.userKey = user._id;
      this.userDialog = true;
    },
    createUser() {
      this.user = null;
      this.userKey = Math.random();
      this.userDialog = true;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
</style>