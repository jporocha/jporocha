<template>
    <div>
        <v-avatar color='black' dark size='36' @click='logOut' v-if='isLogged'>
            JR
        </v-avatar>
        <v-btn small @click='setUser' v-else>
            Log in
        </v-btn>
    </div>
</template>

<script>
    export default {
        computed: {
            isLogged() {
                return this.$store.getters.getUser 
            }
        },
        methods: {
            setUser() {
                this.$store.dispatch('setUser', {nome: 'João Rocha'})
                let cook = document.cookie
                console.log(cook)
            },
            logOut() {
                this.$store.dispatch('setUser', null)
            }
        },
    }
</script>

<style scoped>

</style>