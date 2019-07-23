<template>
        <v-dialog v-model="dialogDadosPessoa"  width="700">
        <v-card>
            <v-card-title primary-title  class="headline secondary">
              <span class="white--text">
              <h4 class="title font-weight-light mb-2">
                <v-icon class="white--text">person</v-icon>
                    {{title}}
              </h4>
            </span>
            </v-card-title>

            <v-card-text>
        <!-- <material-card
          color="orange lighten-1"
        >
        <v-flex slot="header">
          <span>
          <h4 class="title font-weight-light mb-2">
             <v-icon>person</v-icon>
                Dados do usuário
          </h4>
          <p class="category font-weight-thin">Dados do usuário</p>
        </span>
        </v-flex> -->
                <!-- <dados-pessoa :dados=dados></dados-pessoa> -->
                <slot />
                <v-container fluid grid-list-xl pa-1>
                <div class="text-xs-center">
                    <!-- <v-btn color="primary" @click="togleDialog">Fechar</v-btn> -->
                    <v-btn slot="activator" color="primary" @click="togleDialog" outline round><v-icon dark>keyboard_backspace</v-icon>Voltar</v-btn>
                </div>
                </v-container>
            </v-card-text>
        </v-card>
      <!-- </material-card> -->
    </v-dialog>
</template>
<script>
export default {
  props: {
    dialogDadosPessoa: Boolean,
    title: {
      type: String,
      required: false,
      default: 'Dados do usuário'
    }
  },
  methods: {
    togleDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>
