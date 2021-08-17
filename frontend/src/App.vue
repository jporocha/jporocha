<template>
  <v-app>
    <v-app-bar class="appBar" dark app>
      <toolbar fluid />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar";

export default {
  components: {
    Toolbar,
  },
};
</script>

<style>
@font-face {
  font-family: "Luxi-Serif";
  src: local("Luxi-Serif"), url(./fonts/luxirr.ttf) format("truetype");
}

.appBar {
  background: rgb(11, 5, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(44, 87, 132, 1) 100%
  );
}

.cardBG {
  background: #307351; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    22deg,
    #626d58,
    #307351,
    #aad2ba
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    22deg,
    #626d58,
    #307351,
    #aad2ba
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>