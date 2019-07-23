<template>
  <v-carousel hide-delimiters>
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src">
      <div class="tile__title">{{item.src}}</div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
      validator: value => {
        const jsonValidator = require("@/utils/json-validator.js").default;

        let innerSchema = {
          type: "object",
          properties: {
            src: { type: "string" }
          },
          required: ["src"]
        };

        let schema = {
          type: "array",
          items: innerSchema
        };
        //Must be array of object json with property src required: [{src:''}]
        return jsonValidator.validateSchema(schema, value);
      }
    }
  }
};
</script>
<style scoped>
.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  color: rgb(189, 181, 181);
  width: 100%;
  background-color: wheat;
  opacity: 0.2;
}
</style>
