<template>
  <v-text-field
    :label="label"
    v-on="inputListeners"
    :solo="solo"
    :outline="outline"
    :box="box"
    :append-outer-icon="icon"
    :append-icon="iconRight"
    :placeholder="placeholder"
    :class="spacing"
    @click:append-outer="sendInput"
    :color="color"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      solo: false,
      box: false
    };
  },
  props: {
    outline: {
      type: Boolean,
      required: false,
      default: false
    },
    icon: {
      type: String,
      required: false,
      description: "Sets icon to the textfield"
    },
    iconRight: {
      type: String,
      required: false,
      description: "Sets icon to the textfield"
    },
    color: {
      type: String,
      required: false,
      default: "info",
      description: "Applies specified color to the control"
    },
    placeholder: {
      type: String,
      required: false,
      description: "Sets placeholder to the textfield"
    },
    spacing: {
      type: String,
      required: false,
      description: "Sets spacing over element"
    },
    label: {
      type: String,
      required: false,
      description: "Sets input label"
    },
    type: {
      type: String,
      required: false,
      description: "Applies the outline style to the input",
      validator: value => {
        let acceptedValues = ["regular", "outline", "box", "solo"];
        return acceptedValues.indexOf(value) !== -1;
      }
    }
  },
  computed: {
    inputListeners: function() {
      var vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(value) {
          vm.$emit("input", value);
        }
      });
    }
  },
  methods: {
    sendInput() {
      this.$emit("sendInput", this.inputValue);
    }
  },
  watch: {
    type(value) {
      this.solo = false;
      this.outline = false;
      this.box = false;
      if (value === "solo") {
        this.solo = true;
      } else if (value === "outline") {
        this.outline = true;
      } else if (value === "box") {
        this.box = true;
      }
    }
  }
};
</script>