<template>
  <div>
    <LogoView />
    <QuemSomos class="mb-7" />
    <Cards :cards="cardContent" />
    <Servicos />
    <v-divider class="mx-4 mb-4"></v-divider>
    <FaleConosco />
    <Footer />
  </div>
</template>

<script>
import Cards from "@/components/UI/Cards.vue";
import LogoView from "@/components/UI/LogoView.vue";
import QuemSomos from "@/components/UI/QuemSomos.vue";
import FaleConosco from "@/components/UI/FaleConosco.vue";
import Servicos from "@/components/UI/Servicos.vue";
import Footer from "@/components/UI/Footer";

export default {
  components: {
    LogoView,
    Cards,
    QuemSomos,
    Servicos,
    FaleConosco,
    Footer,
  },
  data() {
    return {
      cardContent: [
        {
          text: "Buscamos constantemente trazer projetos inovadores, entregando mais do que o cliente solicita, de forma rápida e prática.<br />Pensando no projeto como um todo: concepção, planejamento, projeto técnico, custo, montagem e entrega ao cliente, nós entregamos segurança e tranquilidade para nosso cliente, sabendo que ele terá a melhor solução de engenharia que ele poderia encontrar.",
          title: "Nosso diferencial",
          icon: "mdi-desk-lamp",
          img: "1.jpg",
        },
        {
          text: "Queremos difundir a engenharia por todas a sociedade, independente do problema.<br />Sabemos que com estudo e dedicação existe uma solução simples, prática e economicamente viável para ser apresentada; só precisamos pensar.",
          title: "O que fazemos",
          icon: "mdi-cloud-question",
          img: "2.jpg",
        },
        {
          text: "Para qualquer pessoa ou empresa que busca por soluções simples, práticas e diferenciadas, a Neomecanica Escritório de engenharia é um escritório multidisciplinar que lhe entrega projetos customizados, diferente do que você pode encontrar hoje no mercado brasileiro.",
          title: "Nossos valores",
          icon: "mdi-target",
          img: "3.jpg",
        },
      ],
    };
  },
};
</script>

<style>
</style>