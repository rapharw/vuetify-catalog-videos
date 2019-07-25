<template>
  <vue-dropzone
    :useCustomSlot="true"
    id="dropzone"
    ref="dropzone"
    :options="dropOptions"
    @vdropzone-complete="afterComplete"
    @vdropzone-removed-file="removedFile"
    @vdropzone-file-added="added"
    @vdropzone-total-upload-progress="progress"
    class="dropzone-custom"
  >
    <div class="dropzone-custom-content">
      <v-icon x-large color="primary">cloud_upload</v-icon>
      <h3 class="dropzone-custom-title primary--text">Drag and drop to upload content!</h3>
      <div class="subtitle">...or click to select a file from your computer</div>
    </div>
  </vue-dropzone>
</template>

<script>
import vueDropzone from "vue2-dropzone";
export default {
  props: {
    dropOptions: {
      type: Object,
      required: true
    }
  },
  components: {
    vueDropzone
  },
  methods: {
    afterComplete(data) {
      this.$emit("afterComplete", {
        src: JSON.parse(data.xhr.response).files.file,
        type: data.type
      });
    },
    removedFile(file, error, xhr) {
      this.$emit("removedFile", { file: file, error: error, xhr: xhr });
    },
    added(data) {
      this.$emit("added", data);
    },
    progress(totaluploadprogress, totalBytes, totalBytesSent) {
      this.$emit("progress", {
        totaluploadprogress: totaluploadprogress,
        totalBytes: totalBytes,
        totalBytesSent: totalBytesSent
      });
    }
  }
};
</script>

<style scoped>
.v-icon.material-icons.theme--light.primary--text {
  font-size: 55px !important;
  color: #6d6d6d !important;
}
.v-icon.material-icons.theme--light.primary--text:hover {
  color: #1e90ca !important;
}
</style>
