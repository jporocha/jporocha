<template>
  <v-col class="col-md-12 col-lg-6" v-intersect="onIntersect">
    <v-img
      max-width="600px"
      :class="currentClass"
      :src="require(`@/assets/${imgName}`)"
    ></v-img>
  </v-col>
</template>

<script>
export default {
  props: ["imgName"],
  data() {
    return {
      isIntersecting: false,
    };
  },
  computed: {
    currentClass() {
      return this.isIntersecting ? "square square-transition" : "square";
    },
  },
  methods: {
    onIntersect(entries) {
      this.isIntersecting = entries[0].isIntersecting;
    },
  },
};
</script>

<style scoped>
.square {
  opacity: 0;
  transform: scale(0.8);
}

@media (prefers-reduced-motion: no-preference) {
  .square {
    transition: opacity 1.5s ease, transform 1.5s ease;
  }
}

.square-transition {
  opacity: 1;
  transform: none;
}
</style>