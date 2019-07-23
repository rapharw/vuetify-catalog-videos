<template>
  <BasicTextField
    label="Filter by por"
    placeholder="Title, description or tags"
    :outline="outline"
    iconRight="search"
    @input="input"
  ></BasicTextField>
</template>

<script>
import arrayTransform from "@/utils/arrayTransform.js";
import BasicTextField from "@/components/basic/TextField.vue";
export default {
  data() {
    return {
      itemSearch: ""
    };
  },
  props: {
    outline: {
      type: Boolean,
      required: false,
      default: false
    },
    listItems: {
      type: Array,
      required: true
    }
  },
  components: {
    BasicTextField
  },
  methods: {
    filter() {
      let items = this.listItems.filter(item => {
        return (
          this.getComputedItemFilteredSearch(item.titulo) ||
          this.getComputedItemFilteredSearch(item.descricao) ||
          this.getComputedItemFilteredSearchArray(item.tagsVO)
        );
      });
      this.$emit("filtered", items);
    },
    input(value) {
      this.itemSearch = value;
      this.filter();
    },
    getComputedItemFilteredSearch(campo) {
      return campo.toLowerCase().includes(this.itemSearch.toLowerCase());
    },
    getComputedItemFilteredSearchArray(arr) {
      return arrayTransform.findStringOnArrayJson(
        arr,
        this.itemSearch.toLowerCase()
      );
    }
  }
};
</script>
