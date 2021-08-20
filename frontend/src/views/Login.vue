<template>
  <v-container
    fluid
    class="d-flex fill-height justify-center align-center cardBG"
    ><v-spacer></v-spacer>
    <transition name="rotate" mode="out-in">
      <LoginCard
        v-on:Register="changeToRegister"
        v-on:ForgotPass="changeToPass"
        v-if="modo === 1"
      />
      <RegisterCard v-on:Login="changeToLogin" v-else-if="modo === 2" />
      <ForgotPass v-on:Login="changeToLogin" v-else-if="modo === 3" />
    </transition>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
import LoginCard from "@/components/LoginCard";
import ForgotPass from "@/components/ForgotPass";
import RegisterCard from "@/components/RegisterCard";

export default {
  components: {
    LoginCard,
    ForgotPass,
    RegisterCard,
  },
  data() {
    return {
      email: "",
      password: "",
      valid: null,
      modo: 1,
    };
  },
  methods: {
    FacebookLogin() {
      window.location = `${process.env.VUE_APP_SERVER}/auth/facebook`;
    },
    GoogleLogin() {
      window.location = `${process.env.VUE_APP_SERVER}/auth/google`;
    },
    changeToPass() {
      this.modo = 3;
    },
    changeToRegister() {
      this.modo = 2;
    },
    changeToLogin() {
      this.modo = 1;
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: darkblue;
  display: block;
}

@keyframes rotateIn {
  0% {
    opacity: 1;
    transform: perspective(30cm) rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(30cm) rotateY(0deg);
  }
}

@keyframes rotateOut {
  0% {
    opacity: 1;
    transform: perspective(30cm) rotateY(-90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(30cm) rotateY(0deg);
  }
}

.rotate-enter-active {
  animation: rotateIn 0.5s;
}

.rotate-leave-active {
  animation: rotateOut 0.5s reverse;
}
</style>
