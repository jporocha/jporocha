<template>
  <v-container fluid class="d-flex align-center mx-0">
    <v-spacer></v-spacer>
    <v-img
      src="@/assets/nlogo.png"
      :aspect-ratio="1 / 1"
      max-width="40"
      class="mr-2"
    ></v-img>
    <div @click="goHome" class="logo">NeoMecanica</div>
    <v-spacer></v-spacer>
    <Avatar />
  </v-container>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
  components: {
    Avatar,
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.logo {
  font-family: "Luxi-Serif";
  font-size: large;
  text-transform: uppercase;
  font-weight: lighter;
  letter-spacing: 5px;
}
</style>
