<template>
  <v-dialog v-model="dialog" max-width="490">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>

      <v-card-text>
        <span class="subheading font-weight-light" v-html="text"></span>
        <span v-if="parameter !== null" class="font-weight-regular">
          <b class="body-2">"{{parameter}}"</b>.
        </span>
        <br />
        <br />
        <span class="font-weight-light">Deseja realmente prosseguir?</span>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :color="color" round light flat outline @click="goBack">
          <v-icon>arrow_back</v-icon>Voltar
        </v-btn>

        <v-btn :color="color" round @click="action">
          <v-icon dark>{{icon}}</v-icon>
          &nbsp;&nbsp;{{textButton}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    textButton: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false,
      default: "primary",
      validator: function(param) {
        return ["primary", "secondary", "error"].indexOf(param) !== -1;
      }
    },
    parameter: {
      type: String,
      required: false,
      default: null
    },
    dialog: {
      type: Boolean,
      required: true
    },
    action: {
      type: Function,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    }
  }
};
</script>
