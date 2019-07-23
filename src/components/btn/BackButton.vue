<template>
    <!-- Btn GO BACK (retorna para a página de origem da chamada) -->
    <v-btn v-if="typeBack === 'back'" :color="color" @click="goBack">{{text}}</v-btn>
    
    <!-- Btn GO HOME (retorna para a página HOME) -->
    <v-btn v-else :color="color" @click="goHome">{{text}}</v-btn>
</template>

<script>
export default {
    props:{
        color: {
            required: false,
            type: String,
            default: 'primary',
            validator: function(valueColorProp){
                return ['primary', 'secondary'].indexOf(valueColorProp) !== -1
            }
        },
        text: {
            required: true,
            type: String
        },
        icon: {
            required: false,
            type: String
        },
        typeBack: {
            required: false,
            type: String,
            default: 'back',
            validator: function(valueColorProp){
                return ['back', 'home'].indexOf(valueColorProp) !== -1
            }
        }
    },
    methods: {
        goHome(){
            this.$router.push({ path: '/home' })
        },
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>
