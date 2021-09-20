<template>
  <div class="fillWidth pa-4">
    <v-form v-model="validate">
      <v-textarea
        outlined
        dense
        label="Descreva o serviço desejado"
        v-model="jobDescription"
        hint="Inclua informações como número de vasos de pressão, cidade onde os vasos estão, etc."
      >
      </v-textarea>
      <v-row class="pa-2">
        <v-spacer></v-spacer>
        <v-btn small text color="red" @click="cancelRequest" class="mr-4"
          >Cancelar</v-btn
        >
        <v-btn small text color="green">Enviar</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validate: false,
      jobDescription: "",
    };
  },
  methods: {
    cancelRequest() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
</style>