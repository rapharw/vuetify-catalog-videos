<template>
  <CardTemplate
    title="Upload"
    iconTitle="cloud_upload"
    subtitle="Upload your videos"
    class="bg-color"
  >
    <v-layout row wrap slot="content">
      <br />
      <v-flex xs12>
        <BasicFormStepper :itemsStepper="arraySteps">
          <!-- Step 1 -->
          <div slot="stepper-content-1">
            <UploadStepDragDropFile :dropOptions="dropOptions"></UploadStepDragDropFile>
            <!-- <vue-dropzone
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
                <h3 class="dropzone-custom-title primary--text">Drag and drop to upload content!</h3>
                <div class="subtitle">...or click to select a file from your computer</div>
              </div>
            </vue-dropzone>-->
          </div>

          <!-- Step 2 -->
          <div slot="stepper-content-2">
            <v-layout row wrap>
              <v-flex xs12 lg5 md7 sm12 v-if="srcvideo !== null && typevideo !== null">
                <video width="400" class="video-border elevation-12" controls>
                  <source :src="selectedVideo" :type="selectedTypeVideo" />
                </video>
              </v-flex>
              <v-flex xs12 lg7 md5 sm12 class="padding-basic-info">
                <v-text-field
                  v-model="tituloVideo"
                  :rules="[v => !!v || 'Title is required']"
                  label="Title"
                  name="titulo"
                  required
                  autocomplete="off"
                ></v-text-field>
                <v-textarea
                  :rules="[v => !!v || 'Description is required']"
                  required
                  autocomplete="off"
                  label="Description"
                ></v-textarea>
                <v-text-field
                  v-model="tags"
                  label="Tags (pressione 'Enter' para inserir a tag)"
                  :rules="[v => !!v || 'Informe ao menos 1 tag']"
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
          </div>

          <!-- Step 3 -->
          <div slot="stepper-content-3">
            <v-layout row wrap>
              <v-flex xs12 lg5 md7 sm12>
                <vue-dropzone
                  slot="stepper-content-3"
                  :useCustomSlot="true"
                  id="dropzoneImage"
                  ref="dropzoneImage"
                  :options="dropOptions"
                  @vdropzone-complete="afterCompleteImage"
                  @vdropzone-removed-file="removedFileImage"
                  @vdropzone-file-added="addedImage"
                  @vdropzone-total-upload-progress="progressImage"
                  class="dropzone-custom"
                >
                  <div class="dropzone-custom-content">
                    <h3 class="dropzone-custom-title primary--text">Drag and drop to upload content!</h3>
                    <div class="subtitle">...or click to select a file from your computer</div>
                  </div>
                </vue-dropzone>
                <v-progress-linear
                  v-if="progressBarImage > 0"
                  slot="stepper-content-3"
                  color="info"
                  v-model="progressBarImage"
                ></v-progress-linear>
              </v-flex>

              <v-flex xs12 lg7 md5 sm12 class="pl-5">
                <HelperDatePicker label-text="From"></HelperDatePicker>
                <br />
                <HelperDatePicker label-text="To"></HelperDatePicker>
              </v-flex>
            </v-layout>
          </div>

          <!-- Final Step -->
          <div slot="stepper-content-4">
            <v-layout row wrap class="text-xs-center">
              <v-flex xs12>
                <video width="400" class="video-border elevation-12" controls :poster="srcimage">
                  <source :src="selectedVideo" :type="selectedTypeVideo" />
                </video>
              </v-flex>
            </v-layout>
          </div>
        </BasicFormStepper>
      </v-flex>
    </v-layout>
  </CardTemplate>
</template>

<script>
import arrayTransform from "@/utils/arrayTransform.js";
import BasicFormStepper from "@/components/basic/BStepper.vue";
import CardTemplate from "@/templates/CardTemplate.vue";
import vueDropzone from "vue2-dropzone";
import HelperDatePicker from "@/components/helper/DatePicker.vue";
import UploadStepDragDropFile from "@/views/upload/StepDragDropFile.vue";
export default {
  components: {
    BasicFormStepper,
    vueDropzone,
    CardTemplate,
    HelperDatePicker,
    UploadStepDragDropFile
  },
  mounted() {},
  data() {
    return {
      showStepper: false,
      progressBar: 0,
      progressBarImage: 0,
      file: null,
      dropOptions: {
        url: "https://httpbin.org/post",
        maxFilesize: 50, // MB
        maxFiles: 1,
        thumbnailWidth: 200,
        addRemoveLinks: true
      },
      arraySteps: [
        { step: 1, name: "Upload your video" },
        { step: 2, name: "Basic info", desc: "Information of your video" },
        {
          step: 3,
          name: "Poster and calendar options",
          desc: "Select a poster to the video, and a date calendar to expire"
        },
        { step: 4, name: "Preview" }
      ],
      srcvideo: null,
      typevideo: null,
      srcimage: null,
      typeimage: null,
      arrayTags: [],
      arrayTagsEdit: [],
      chip: true,
      tags: "",
      tituloVideo: ""
    };
  },
  methods: {
    afterComplete(data) {
      console.log("afterComplete");
      console.log(data);
      // this.showStepper = true;

      this.srcvideo = data.src;
      this.typevideo = data.type;
    },
    removedFile(file, error, xhr) {
      this.file = null;
      this.progressBar = 0;
    },
    added(data) {
      console.log("added");
      console.log(data);
      this.progressBar = 1;
    },
    progress(totaluploadprogress, totalBytes, totalBytesSent) {
      //   console.log(totaluploadprogress);
      this.progressBar = totaluploadprogress;
    },
    afterCompleteImage(data) {
      this.file = data;
      console.log("afterCompleteImage");
      console.log(data);
      this.showStepper = true;

      this.srcimage = JSON.parse(data.xhr.response).files.file;
      this.typeimage = data.type;
    },
    removedFileImage(file, error, xhr) {
      this.file = null;
      this.progressBarImage = 0;
    },
    addedImage(data) {
      console.log("addedImage");
      console.log(data);
      this.progressBarImage = 1;
    },
    progressImage(totaluploadprogress, totalBytes, totalBytesSent) {
      //   console.log(totaluploadprogress);
      this.progressBarImage = totaluploadprogress;
    },

    /**
     * TAGS
     */
    isTagHasAlreadyExist(array, value) {
      let exists = false;
      array.forEach(element => {
        if (value === element) exists = true;
      });
      return exists;
    },

    /**
     * [UPLOAD/EDIT]
     * Realiza a adição de novas tags em um array de elementos da tag
     */
    addTag(evt) {
      if (evt.key === "Enter") {
        if (
          !this.isTagHasAlreadyExist(this.arrayTags, evt.target.value.trim()) &&
          !this.isTagHasAlreadyExist(
            this.arrayTagsEdit,
            evt.target.value.trim()
          )
        ) {
          arrayTransform.addElement(this.arrayTags, evt.target.value.trim());
          this.tags = " ";
        }
      }
    },

    /**
     * [UPLOAD/EDIT]
     * Evento de (focus out) do campo Tag, para verificar se o usuário ao menos já incluiu alguma Tag no array (pressionando Enter no campo).
     * Se o array estiver vazio, exibe crítica.
     */
    blurTag() {
      if (this.arrayTags.length > 0) {
        this.tags = " ";
      } else {
        this.tags = null;
      }
    },

    /**
     * [UPLOAD/EDIT]
     * Realiza a adição de novas tags em um array de elementos da tag
     */
    removeTag(data) {
      arrayTransform.removeElement(this.arrayTags, data.trim());
      arrayTransform.removeElement(this.arrayTagsEdit, data.trim());
      this.tags = " ";
    }
  },
  computed: {
    getFile() {
      if (this.file !== null) return this.file;
      return "";
    },
    selectedVideo() {
      return this.srcvideo;
    },
    selectedTypeVideo() {
      return this.typevideo;
    }
  }
};
</script>

<style scoped>
.dropzone-custom {
  background-color: transparent;
  border-style: dashed;
  border-radius: 4px;
  border-width: 1.5px;
  /* padding: 65px; */
}
.dropzone-custom-content {
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.video-border {
  border-radius: 6px;
}
.container {
  position: relative;
}
.container video {
  position: relative;
  z-index: 0;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
