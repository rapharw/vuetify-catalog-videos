<template>
  <v-text-field
    v-model="password"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[rules.required, rules.min]"
    :type="show ? 'text' : 'password'"
    name="input-10-1"
    :label="label"
    :hint="hint"
    @click:append="show = !show"
    v-on="inputListeners"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    hint: {
      type: String
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
  data() {
    return {
      show: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  }
};
</script>
