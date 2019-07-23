<template>
  <v-btn dark fab bottom right :color="color" :small="small" class="elevation-12" @click="action">
    <v-icon>{{icon}}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: "primary"
    },
    small: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    action() {
      this.$emit("action");
    }
  }
};
</script>

<style>
</style>
