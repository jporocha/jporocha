<template>
  <div class="cardBG fill-height d-flex justify-center align-center py-3">
    <v-card width="90vw">
      <v-card-title class="justify-center"> Área do cliente </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        Orçamentos solicitados<br />
        Serviços realizados <br />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end my-2">
        <v-btn small text @click="newRequest"> Solicitar novo orçamento </v-btn>
      </v-card-actions>
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    newRequest() {
      this.$router.push("dashboard/pedido");
    },
  },
};
</script>

<style scoped>
</style>