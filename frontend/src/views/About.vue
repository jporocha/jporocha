<template>
  <div>
    <v-btn @click='fetchData'>Teste</v-btn>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    methods: {
      fetchData() {
        axios.get('/test').then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      }
    },
  }
</script>

<style scoped>

</style>