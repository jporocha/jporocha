import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0B0500",
        color1: "#626D58",
        color2: "#307351",
        color3: "#AAD2BA",
        color4: "#2C2784",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
