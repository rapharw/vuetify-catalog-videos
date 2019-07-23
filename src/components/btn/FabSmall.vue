<template>
    <v-tooltip bottom>
         <v-btn @click="click"
                slot="activator"
                dark fab small
             >
             <v-icon dark>{{ico}}</v-icon>
         </v-btn>
        <span>Voltar</span>
    </v-tooltip>
</template>
<script>
export default {
  props: {
    ico: String,
    click: Function
  }
}
</script>
