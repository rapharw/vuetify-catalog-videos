<template>
  <div>
    <v-btn
      @click="btnClick"
      :color="btnColor"
      :flat="btnFlat"
      :outline="btnOutline"
      :dark="btnDark"
    >
      <span v-if="btnText">{{btnText}}</span>
      <v-icon v-if="btnIcon">{{btnIcon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
const { btnPropsMixins } = require("@/mixins/props/btn/btn-props-mixins.js");
export default {
  mixins: [btnPropsMixins]
};
</script>