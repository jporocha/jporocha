<template>
  <div>
    <v-col class="col-md-12 col-lg-8 mx-auto">
      <h3>Porque a Neomecanica se diferencia das demais?</h3>
      <p>
        Pois preza por uma tratativa direta e objetiva, onde o contato é
        realizado diretamente com os engenheiros da empresa. <br />Visamos
        personalizar as soluções à necessidade do cliente e temos parceria com
        outras áreas da engenharia, serviços e produtos.
      </p>
      <h3>Nossa história</h3>
      <p>
        A Neomecanica surgiu em 2020, formada por dois amigos, ambos engenheiros
        mecânicos, que decidiram somar experiências e oferecer o conhecimento
        adquirido que soma mais de 25 anos de experiência. Acreditamos que a
        engenharia deve ser acessível e trazer benefícios à sociedade, sempre
        respeitando a ética e princípios técnicos.
      </p>
    </v-col>
    <v-row class="mx-auto">
      <v-spacer></v-spacer>
      <v-col class="col-md-12 col-lg-4">
        <v-img src="@/assets/felipe.jpeg" height="400" max-width="600"></v-img>

        <h3>Felipe Gonçalves</h3>
        <ul>
          <li>Graduado em 2007 na Universidade Estadual de Maringá</li>
          <li>
            Desenvolvimento de projeto de painéis solares, foguetes e
            plataformas no setor aeroespacial;
          </li>
          <li>
            Planejamento das manutenções preventivas e corretivas em indústria
            de cimento;
          </li>
          <li>
            Coordenação, elaboração e execução de projeto de equipamentos para
            poços de petróleo;
          </li>
          <li>
            Acompanhamento de perfurações de poços petrolífero em tempo real e
            elaboração e revisão de procedimentos operacionais;
          </li>
          <li>Perícias de acidentes automotivos.</li>
        </ul>
      </v-col>
      <v-col class="col-md-12 col-lg-4">
        <v-img src="@/assets/douglas.jpeg" height="400" max-width="600"></v-img>

        <h3>Douglas Baltazar</h3>
        <ul>
          <li>Graduado em 2008 na Universidade Estadual de Maringá</li>
          <li>
            Coordenação no desenvolvimento de bancos, airbags e cintos de
            segurança em indústria automotiva;
          </li>
          <li>
            Supervisão de manutenção de frota e equipamentos em usinas
            sucroenergéticas e construtoras;
          </li>
          <li>
            Desenvolvimento, implantação e manutenção de projetos de sistemas de
            armazenamento de combustíveis (SASC e SAAC), rede GLP e gases
            medicinais.
          </li>
          <li>Perícias de acidentes automotivos e falhas em equipamentos.</li>
        </ul>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-family: "Luxi-Serif";
  font-weight: lighter;
}

h3 {
  color: var(--v-color4-base);
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 10px;
}

p,
li {
  font-size: 1.2rem;
}
</style>