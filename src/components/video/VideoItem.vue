<template>
  <video controls :width="sizeWindow" class="border-video elevation-12" :poster="urlImage">
    <source :src="urlVideo" />
  </video>
</template>

<script>
export default {
  props: {
    urlVideo: {
      type: String,
      required: true
    },
    urlImage: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: "large",
      validator: function(valueSize) {
        return ["large", "small"].indexOf(valueSize) !== -1;
      }
    }
  },
  computed: {
    sizeWindow() {
      if (this.size === "small") {
        return "350px";
      } else {
        return "800px";
      }
    }
  }
};
</script>

<style scoped>
.border-video {
  border-radius: 6px;
}
</style>
