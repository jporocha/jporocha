<template>
  <div class="cardBG fill-height d-flex justify-center py-3">
    <v-card width="90vw">
      <v-card-title class="justify-center"> Área do cliente </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <Projetos />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Projetos from "@/components/Cliente/Projetos.vue";
export default {
  components: {
    Projetos,
  },
};
</script>

<style scoped>
</style>