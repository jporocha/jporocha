<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card width="100%" color="color4" height="450" class="elevation-0 ml-2">
        <v-card-text class="text-center">
          <v-icon large color="white">{{ card.icon }}</v-icon>
          <h2 class="text-h6 white--text">{{ card.title }}</h2>
        </v-card-text>
        <v-img :src="require(`@/assets/${card.img}`)" height="75%">
          <v-card
            v-if="alwaysOn"
            v-html="card.text"
            class="white--text text-justify text-body-1 fill-height pa-4"
            color="rgb(0, 0, 0, 0.7)"
          ></v-card>
        </v-img>
        <v-fade-transition>
          <v-overlay
            v-if="hover && !alwaysOn"
            absolute
            color="color4 darken-2"
            opacity="0.8"
          >
            <div class="mx-5 text-justify white--text">
              <span v-html="card.text"></span>
            </div>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    alwaysOn() {
      return window.innerWidth < 960;
    },
  },
};
</script>