<template>
  <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" top center>
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}
    <template v-slot:action="{}">
      <v-icon color="white" @click="showSnackbar = false"> mdi-close </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "success",
      icon: "mdi-check",
      timer: 3000,
    };
  },
  methods: {
    show(data) {
      this.showSnackbar = true;
      this.message = data.message || "Erro desconhecido";
      this.color = data.color || "success";
      this.timer = data.timer || 3000;
      this.icon = data.icon || "mdi-check";
    },
  },
};
</script>