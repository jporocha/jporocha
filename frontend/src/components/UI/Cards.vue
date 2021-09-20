<template>
  <v-row class="d-flex justify-center color4 my-6">
    <Card
      :card="card"
      v-for="(card, index) in cards"
      :key="`card${index}`"
      class="col-sm-12 col-md-4 col-lg-3"
    />
  </v-row>
</template>

<script>
import Card from "./Card.vue";
export default {
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data: () => ({
    overlay: false,
  }),
};
</script>