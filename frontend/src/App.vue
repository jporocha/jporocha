<template>
  <v-app>
    <v-app-bar class="appBar" dark app>
      <Header />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <vtoast ref="vtoast" />
  </v-app>
</template>

<script>
import Header from "@/components/UI/Header";
import vtoast from "@/helpers/vtoast";
import axios from "axios";

export default {
  components: {
    Header,
    vtoast,
  },
  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
    axios
      .get("auth/user")
      .then((res) => {
        if (res.data.id) {
          this.$store.dispatch("setUser", res.data);
        } else {
          this.$router.push({ name: "Home" });
        }
      })
      .catch(() => {
        this.$router.push({ name: "Home" });
      });
  },
};
</script>

<style>
@font-face {
  font-family: "Luxi-Serif";
  src: local("Luxi-Serif"), url(./fonts/luxirr.ttf) format("truetype");
}

.appBar {
  background: var(--v-primary-base);
  background: linear-gradient(
    90deg,
    var(--v-primary-base),
    var(--v-color4-base)
  );
}

.cardBG {
  background: var(--v-fourth-base);
  background: -webkit-linear-gradient(
    22deg,
    var(--v-color3-base),
    var(--v-color2-base),
    var(--v-color4-base)
  );
  background: linear-gradient(
    22deg,
    var(--v-color3-base),
    var(--v-color2-base),
    var(--v-color4-base)
  );
}
</style>