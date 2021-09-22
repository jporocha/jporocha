<template>
  <div fluid class="d-flex flex-column">
    <v-parallax :src="require(`@/assets/parallax2.jpg`)" width="100%">
      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center cols-sm-12 cols-md-3">
          <v-img
            :src="require('@/assets/logo_transparente.png')"
            max-width="70%"
          ></v-img>
        </v-col>
        <v-col
          class="text-right text-h5 black--text d-none d-md-flex cols-md-9"
        >
          Entregamos projetos inovadores com soluções personalizadas, simples e
          práticas, utilizando todo nosso conhecimento técnico e prático, além
          dos melhores softwares e hardwares disponíveis no mercado.
        </v-col>
      </v-row>
    </v-parallax>
    <v-col class="text-right text-subtitle-1 d-flex d-md-none cols-sm-12 pt-4">
      Entregamos projetos inovadores com soluções personalizadas, simples e
      práticas, utilizando todo nosso conhecimento técnico e prático, além dos
      melhores softwares e hardwares disponíveis no mercado.
    </v-col>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>