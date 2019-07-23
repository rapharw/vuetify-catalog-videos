<template>
  <v-pagination
    :color="color"
    :circle="circle"
    v-model="pageable"
    :length="pageableTotal"
    :total-visible="totalVisible"
    @input="eventInput"
  ></v-pagination>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "primary"
    },
    circle: {
      type: Boolean,
      required: false,
      default: true
    },
    pageable: {
      type: Number,
      required: true
    },
    pageableTotal: {
      type: Number,
      required: true
    },
    totalVisible: {
      type: Number,
      required: true
    }
  },
  methods: {
    eventInput() {
      this.$emit("eventInput");
    }
  }
};
</script>

<style>
</style>
