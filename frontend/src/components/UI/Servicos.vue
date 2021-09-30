<template>
  <div class="color3 lighten-1 pt-2">
    <div class="text-center text-h5 mb-4">Nossos serviços</div>
    <v-divider class="mb-2 mt-n2"></v-divider>
    <v-carousel
      cycle
      height="150"
      hide-delimiters
      show-arrows-on-hover
      :interval="3000"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-row class="fill-height text-center">
          <v-col cols="12">
            <h4>{{ slide.title }}</h4>
            <br />
            <p v-for="item in slide.list" :key="item" class="caption">
              {{ item }}
            </p>
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          title: "Projetos",
          list: [
            "Redes de GLP, gases medicinais e ar comprimido",
            "Sistemas de armazenamento de combustíveis",
            "Estruturas metálicas",
          ],
        },
        {
          title: "NR-13",
          list: [
            "Inspeção externa e interna de vasos de pressão",
            "Teste hidrostático",
            "Reconstituição de documentação",
          ],
        },
        {
          title: "NR-18",
          list: [
            "Projeto de instalação para andaimes em balanço",
            "Acompanhamento de montagem e instalação",
            "Treinamentos",
          ],
        },
        {
          title: "Sistema de climatização",
          list: [
            "Projetos de sistema de climatização",
            "Projetos de sistema de exaustão e ventilação",
            "PMOC",
          ],
        },
        {
          title: "Perícias e inspeções",
          list: [
            "Acidentes automotivos",
            "Equipamentos",
            "Parques e brinquedos INFA",
          ],
        },
      ],
    };
  },
};
</script>