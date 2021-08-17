<template>
    <div>
        <v-avatar color='black' dark size='36' @click='logOut' v-if='isLogged'>
            JR
        </v-avatar>
        <v-btn small @click='logIn' v-else>
            Log in
        </v-btn>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        computed: {
            isLogged() {
                return this.$store.getters.getUser 
            }
        },
        methods: {
            logIn() {
                this.$router.push('login')
            },
            logOut() {
                axios.get('/auth/logout').then((res) => {
                    console.log(res)
                    this.$store.dispatch('setUser', null)
                    this.$router.push('login')
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped>

</style>