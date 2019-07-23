<template>
  <span class="group pa-4">
    <v-icon
      class="pr-2"
      :class="activeIconBorderBottomGrid"
      :color="getIconColorCard"
      @click="changeViewToGrid"
    >view_module</v-icon>

    <v-icon
      :class="activeIconBorderBottomList"
      :color="getIconColorList"
      @click="changeViewToList"
    >list</v-icon>
  </span>
</template>

<script>
export default {
  props: {
    disabledView: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeIconBorderBottomList: "",
      activeIconBorderBottomGrid: "active-icon-border-bottom"
    };
  },
  computed: {
    getIconColorList() {
      if (this.disabledView[0] === true && !this.disabledView[1]) {
        return "primary";
      } else {
        return "default";
      }
    },
    getIconColorCard() {
      if (!this.disabledView[0] === true && this.disabledView[1]) {
        return "primary";
      } else {
        return "default";
      }
    }
  },
  methods: {
    changeViewToGrid() {
      this.activeIconBorderBottomGrid = "active-icon-border-bottom";
      this.activeIconBorderBottomList = "";
      this.$emit("change-view-to-grid", [false, true]);
    },
    changeViewToList() {
      this.activeIconBorderBottomGrid = "";
      this.activeIconBorderBottomList = "active-icon-border-bottom";
      this.$emit("change-view-to-list", [true, false]);
    }
  }
};
</script>

<style scoped>
.active-icon-border-bottom {
  border-bottom: 1px solid #1e90ca;
}
</style>

