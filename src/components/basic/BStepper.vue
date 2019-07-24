<template>
  <div>
    <v-stepper v-for="item in itemsStepper" :key="item.step" v-model="step" vertical>
      <v-stepper-step :complete="step > item.step" :step="item.step">
        {{item.name}}
        <small>{{item.desc}}</small>
      </v-stepper-step>

      <v-stepper-content :step="item.step">
        <div>
          <slot :name="stepperContent + item.step"></slot>
        </div>
        <br />
        <br />
        <v-btn outline flat @click="backStep">Back</v-btn>
        <v-btn color="primary" @click="continueStep">Continue</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      stepperContent: "stepper-content-"
    };
  },
  methods: {
    continueStep() {
      if (this.step < this.itemsStepper.length) this.step = this.step + 1;
    },
    backStep() {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    }
  },
  props: {
    itemsStepper: {
      type: Array,
      required: true,
      validator: value => {
        const jsonValidator = require("@/utils/json-validator.js").default;

        let innerSchema = {
          type: "object",
          properties: {
            step: { type: "number" },
            name: { type: "string" },
            desc: { type: "string" }
          },
          required: ["step", "name"]
        };

        let schema = {
          type: "array",
          items: innerSchema
        };
        //Must be array of object json with properties step and name required: [{step:1, name: 'some string'}]
        return jsonValidator.validateSchema(schema, value);
      }
    }
  }
};
</script>

<style scoped>
.theme--light.v-stepper {
  box-shadow: none !important;
}

.v-stepper--vertical {
  /* padding-bottom: 36px; */
  margin-left: -30px;
  margin-right: -30px;
}
</style>
