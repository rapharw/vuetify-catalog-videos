<template>
  <v-layout row wrap>
    <v-flex xs12 lg5 md7 sm12>
      <br />
      <video width="400" class="video-border elevation-12" controls>
        <source :src="srcvideo" :type="typevideo" />
      </video>
    </v-flex>
    <v-flex xs12 lg7 md5 sm12>
      <v-text-field
        :rules="[v => !!v || 'Title is required']"
        label="Title"
        name="title"
        required
        autocomplete="off"
      ></v-text-field>
      <v-textarea
        :rules="[v => !!v || 'Description is required']"
        required
        autocomplete="off"
        label="Description"
        name="description"
      ></v-textarea>
      <v-text-field
        :value="tagInput"
        label="Tags (press 'Enter' to insert a tag)"
        :rules="[v => !!v || 'At least 1 tag is required']"
        name="tags"
        required
        @keypress="addTag"
        @blur="blurTag"
      ></v-text-field>

      <!-- Upload chip -->
      <span v-if="arrayTags.length > 0">
        <v-chip close @input="removeTag(tag)" v-for="tag in arrayTags" :key="tag">{{tag}}</v-chip>
      </span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      tagInput: " "
    };
  },
  props: {
    arrayTags: {
      type: Array,
      required: true
    },
    srcvideo: {
      type: String,
      required: true
    },
    typevideo: {
      type: String,
      required: true
    }
  },
  methods: {
    addTag(data) {
      this.tagInput = " ";
      this.$emit("addTag", data);
    },
    blurTag(data) {
      this.tagInput = " ";
      this.$emit("blurTag", data);
    },
    removeTag(data) {
      this.tagInput = " ";
      this.$emit("removeTag", data);
    }
  },
  computed: {
    getSrcVideo() {
      return this.srcvideo;
    }
  }
};
</script>

<style>
</style>
