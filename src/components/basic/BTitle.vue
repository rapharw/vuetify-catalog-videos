<template>
  <h2 :class="cssBTitle" class="headline font-weight-light">{{title}}</h2>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true,
      validator: value => {
        let acceptedValues = ["white", "info", "primary"];
        return acceptedValues.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    cssBTitle() {
      if (this.color === "primary") {
        return "btitle-primary";
      } else if (this.color === "info") {
        return "btitle-info";
      } else {
        return "btitle-white";
      }
    }
  }
};
</script>

<style scoped>
.btitle-white {
  color: #ffffff;
}
.btitle-info {
  color: #2196f3;
}
.btitle-primary {
  color: #212121;
}
</style>
