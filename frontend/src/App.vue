<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>

      <Avatar />
    </v-app-bar>

    <v-main fluid>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  components: {
    Avatar,
  },
};
</script>
