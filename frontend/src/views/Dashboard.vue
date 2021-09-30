<template>
  <div class="cardBG fill-height d-flex justify-center py-3">
    <v-card width="90vw">
      <v-card-title class="justify-center">
        Área do administrador
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-expansion-panels multiple :value="openPanels">
          <v-expansion-panel>
            <v-expansion-panel-header color="color2 white--text">
              Mensagens
            </v-expansion-panel-header>
            <v-expansion-panel-content class="py-3 mx-n3">
              <Messages />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="color3 darken-2 white--text">
              Projetos
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-n3 py-3">
              <Projetos :key="projectKey" />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="color1 white--text">
              Clientes
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-n3 py-3">
              <Users
                tipo="cliente"
                v-on:usersChanged="reloadUsers"
                v-on:FetchProjects="reloadProjects"
                :key="userKey"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="color1 darken-2 white--text">
              Administradores
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-n3 py-3">
              <Users
                tipo="admin"
                v-on:usersChanged="reloadUsers"
                :key="adminKey"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Messages from "@/components/Admin/Messages.vue";
import Users from "@/components/Admin/Users.vue";
import Projetos from "@/components/Admin/Projects.vue";

export default {
  components: {
    Messages,
    Users,
    Projetos,
  },
  data() {
    return {
      openPanels: [0, 1],
      userKey: 1000,
      adminKey: 2000,
      projectKey: 3000,
    };
  },
  methods: {
    reloadUsers() {
      this.userKey++;
      this.adminKey++;
    },
    reloadProjects() {
      this.projectKey++;
    },
  },
  mounted() {
    if (window.innerWidth < 960) this.openPanels = [0];
  },
};
</script>

<style scoped>
</style>