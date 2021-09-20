<template>
  <div>
    <div class="text-center text-h5">Nossos serviços</div>
    <v-carousel
      cycle
      height="100"
      hide-delimiters
      show-arrows-on-hover
      :interval="3000"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-lg-h4 text-h5">
              {{ slide }}
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        "Certificação de vasos de pressão",
        "Projetos mecânicos",
        "Lorem Ipsum Dolor Sit Amet",
      ],
    };
  },
};
</script>