<template>
  <v-snackbar
    :timeout="snackbarProgressUpload.timeout"
    top
    center
    :color="snackbarProgressUpload.color"
    v-model="snackbarProgressUpload.show"
  >
    <v-layout row wrap>
      <v-flex xs12>
        <h5 class="white--text">Upload em andamento</h5>
      </v-flex>
      <v-flex xs12>
        <v-progress-linear color="white" v-model="progressUpload"></v-progress-linear>
      </v-flex>
    </v-layout>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    snackbarProgressUpload: {
      type: Object,
      required: true
    },
    progressUpload: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
</style>
