<template>
  <div class="cardBG fill-height d-flex justify-center py-3">
    <v-card width="90vw">
      <v-card-title class="justify-center">
        Área do administrador
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header color="color2 white--text">
              Mensagens
            </v-expansion-panel-header>
            <v-expansion-panel-content class="py-3 mx-n3">
              <Messages />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="color1 white--text">
              Clientes
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-n3 py-3">
              <Users tipo="cliente" />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header color="color1 darken-2 white--text">
              Administradores
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mx-n3 py-3">
              <Users tipo="admin" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
import Messages from "@/components/Admin/Messages.vue";
import Users from "@/components/Admin/Users.vue";
export default {
  components: {
    Messages,
    Users,
  },
};
</script>

<style scoped>
</style>