<template>
  <v-container style="margin-top: -50px;">
    <v-flex xs12>
      <material-card>
        <v-flex slot="header">
          <span>
            <h4 class="title font-weight-light mb-2">
              <v-icon left>{{iconTitle}}</v-icon>
              {{title}}
            </h4>
            <p class="category font-weight-thin">
              <b>{{subtitle}}</b>
            </p>
          </span>
        </v-flex>
        <v-expansion-panel
          v-model="painel"
          expand
          readonly
          class="v-expansion-panel-no-shadow"
          id="v-expansion-panel-parent"
        >
          <v-expansion-panel-content>
            <v-layout wrap>
              <v-container fluid grid-list-xl>
                <v-layout wrap align-center>
                  <v-form
                    enctype="multipart/form-data"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    id="fupload"
                  >
                    <v-layout row wrap>
                      <!-- Preview do arquivo de vídeo EDIT -->
                      <v-flex lg4 md6 sm6 xs12 v-if="videoToEdit !== null">
                        <video-video-item
                          size="small"
                          :urlVideo="videoToEdit.url.urlVideo"
                          :urlImage="videoToEdit.url.urlImage"
                        ></video-video-item>
                      </v-flex>
                      <v-flex lg8 md6 sm6 xs12 v-if="videoToEdit !== null">
                        <div class="text-xs-right">
                          <v-btn color="error" round @click="dialogRemove = true">
                            <v-icon left dark>delete</v-icon>Deletar vídeo
                          </v-btn>
                          <helper-modal-confirmation
                            title="Deleção de vídeo"
                            text="Este vídeo será <strong class='body-2'>permanentemente removido</strong>, assim como todos os dados referentes a ele. A ação <strong class='body-2'>não pode ser desfeita</strong>."
                            textButton="Deletar"
                            icon="delete"
                            color="error"
                            :dialog="dialogRemove"
                            :action="removeVideo"
                            @goBack="dialogRemove = false"
                          ></helper-modal-confirmation>
                        </div>
                        <br>
                      </v-flex>

                      <v-flex xs12 v-if="videoToEdit !== null">
                        <h4 class="descricaoItem title pt-3">Vídeo em edição</h4>
                        <v-alert
                          :value="true"
                          color="secondary"
                          outline
                        >Selecione um novo vídeo e/ou uma nova imagem para alterar as informações atuais da mídia.</v-alert>
                        <br>
                        <v-divider></v-divider>
                      </v-flex>

                      <!-- Título do Vídeo -->
                      <v-flex xs12 sm12 md6>
                        <v-text-field
                          v-model="tituloVideo"
                          :rules="[v => !!v || 'O título é obrigatório']"
                          label="Título do Vídeo"
                          name="titulo"
                          required
                          autocomplete="off"
                        ></v-text-field>
                      </v-flex>

                      <!-- Data de Publicação -->
                      <v-flex xs12 sm6 md3>
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="publicacaoDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              :value="computedDateFormattedPublicacao"
                              label="Data de Publicação"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                              name="dataPublicacao"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="publicacaoDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(publicacaoDate)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>

                      <!-- Data Final -->
                      <v-flex xs12 sm6 md3>
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="endDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              :value="computedDateFormattedEnd"
                              label="Data Final"
                              prepend-icon="event"
                              readonly
                              clearable
                              v-on="on"
                              name="dataFinal"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="endDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu2.save(endDate)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>

                      <!-- Descrição -->
                      <v-flex xs12 sm12 md6>
                        <v-text-field
                          v-model="descricaoVideo"
                          :rules="[v => !!v || 'A descrição é obrigatória']"
                          label="Descrição"
                          name="descricao"
                          required
                          autocomplete="off"
                        ></v-text-field>
                      </v-flex>

                      <!-- Tags -->
                      <v-flex xs12 sm12 md6>
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
                          <v-chip
                            close
                            @input="removeTag(tag)"
                            v-for="tag in arrayTags"
                            :key="tag"
                          >{{tag}}</v-chip>
                        </span>

                        <!-- Edit chip -->
                        <span v-if="arrayTagsEdit.length > 0">
                          <v-chip
                            close
                            @input="selectTagToRemove(videoToEdit.id, tag)"
                            v-for="tag in arrayTagsEdit"
                            :key="tag"
                          >{{tag}}</v-chip>
                        </span>
                      </v-flex>

                      <!-- Arquivo Vídeo -->
                      <v-flex xs12 sm12 md6>
                        <label class="label-file">
                          Arquivo de vídeo 120MB aprox.
                          <small>(mp4, webm, ogv)</small>
                        </label>
                        <br>
                        <br>
                        <input
                          type="file"
                          data-max-size="2097152"
                          accept=".mp4, .webm, .ogv"
                          @change="processVideo($event)"
                          required
                          name="arquivoVideo"
                        >
                        <helper-critica-input
                          v-show="fileVideo === null"
                          critica="O arquivo de vídeo é obrigatório"
                        ></helper-critica-input>
                      </v-flex>

                      <!-- Arquivo imagem -->
                      <v-flex xs12 sm12 md6>
                        <label class="label-file">
                          Arquivo da imagem 1MB aprox.
                          <small>(jpg, jpeg, png)</small>
                        </label>
                        <br>
                        <br>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          data-max-size="2097152"
                          @change="processImage($event)"
                          required
                          name="arquivoImagem"
                        >
                        <helper-critica-input
                          v-show="fileImage === null"
                          critica="O arquivo de imagem é obrigatório"
                        ></helper-critica-input>
                      </v-flex>

                      <v-flex xs12 class="pa-0 pm-0">
                        <div class="text-xs-right">
                          <!-- Upload -->
                          <v-btn
                            :disabled="buttonDisabled"
                            color="primary"
                            round
                            v-on:click="upload(false)"
                            v-if="videoToEdit === null"
                          >
                            <v-icon left dark>cloud_upload</v-icon>upload
                          </v-btn>

                          <!-- Edit Form -->
                          <div v-else>
                            <v-btn color="primary" round light flat outline @click="voltar">
                              <v-icon>arrow_back</v-icon>Voltar
                            </v-btn>
                            <v-btn :disabled="buttonDisabled" color="primary" round @click="edit">
                              <v-icon left dark>edit</v-icon>Editar
                            </v-btn>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-layout>
              </v-container>
            </v-layout>

            <!-- Dialogo remoção tag -->
            <helper-modal-confirmation
              title="Remoção de tag"
              text="Você está prester a remover a tag "
              :parameter="nomeTagToRemove"
              textButton="Remover"
              icon="delete"
              color="primary"
              :dialog="dialog"
              :action="deleteTag"
              @goBack="dialog = false"
            ></helper-modal-confirmation>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Snackbar Progress Upload (ver uma forma de criar um "listener") -->
        <!-- <views-upload-progress-upload
          :snackbarProgressUpload="snackbarProgressUpload"
          :progressUpload="progressUpload"
        ></views-upload-progress-upload>-->
      </material-card>
    </v-flex>
  </v-container>
</template>


<script>
import arrayTransform from "@/utils/arrayTransform.js";
import { mixinUploadData } from "@/mixins/mixin-upload-data.js";
import { mixinUploadComputed } from "@/mixins/mixin-upload-computed.js";

export default {
  mixins: [mixinUploadData, mixinUploadComputed],

  methods: {
    redirectRotaCatalogo(title) {
      //push para rota catalogo com o titulo do video
      let router = this.$router;
      let param =
        title === undefined
          ? { name: "Videos" }
          : { name: "Videos", params: { video: title } };
      setTimeout(function() {
        router.push(param);
      }, 2000);
    },

    voltar() {
      this.$router.go(-1);
    },

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
    },

    /**
     * [UPLOAD]
     * Faz o handle do arquivo de vídeo
     */
    processVideo(event) {
      let file = event.target.files[0];
      if (file !== undefined) this.fileVideo = file;
      else if (this.videoToEdit === null) this.fileVideo = null;
    },

    /**
     * [UPLOAD]
     * Faz o handle do arquivo de imagem
     */
    processImage(event) {
      let file = event.target.files[0];
      if (file !== undefined) this.fileImage = file;
      else if (this.videoToEdit === null) this.fileImage = null;
    },

    /**
     * [UPLOAD/EDIT]
     * Valida o formulário para verificar se os campos estão devidamente preenchidos
     * OBS: Se for edição, arquivo de vídeo e imagem não podem ser editados
     */
    validateForm(edit) {
      //valida form
      let formValid = this.$refs.form.validate();

      if (edit === true) {
        return formValid;
      } else {
        //valida input files

        let isValidFileVideo =
          this.fileVideo !== null &&
          this.fileVideo !== undefined &&
          this.fileVideo !== "";

        let isValidFileImage =
          this.fileImage !== null &&
          this.fileImage !== undefined &&
          this.fileImage !== "";

        if (isValidFileVideo && isValidFileImage) {
          return formValid;
        } else {
          if (!isValidFileVideo) this.fileVideo = null;
          if (!isValidFileImage) this.fileImage = null;
          return false;
        }
      }
    },

    /**
     * [UPLOAD/EDIT]
     * Realiza o upload de um vídeo, ou realiza a edição das info's de um vídeo já submetido
     */
    upload(edit) {
      let formValidated = this.validateForm(edit);
      if (formValidated) {
        let formData = new FormData(document.getElementById("fupload"));

        //append do array de tags no FormData (a ser enviado ao backend)
        this.arrayTags.forEach(element => {
          formData.append("tagsInput", element);
        });

        this.arrayTagsEdit.forEach(element => {
          formData.append("tagsInput", element);
        });

        this.appendFormDataToEditVideo(edit, formData);
        this.buttonDisabled = true;

        this.$store
          .dispatch("uploadVideo", {
            formData: formData,
            tituloVideo: this.tituloVideo,
            edit: edit
          })
          .then(title => {
            this.redirectRotaCatalogo(title);
          })
          .catch(() => {})
          .finally(() => {
            this.buttonDisabled = false;
          });
      }
    },

    /**
     * [EDIT-VIDEO]
     * Realiza um append no FormData do atributo ID a ser editado
     */
    appendFormDataToEditVideo(edit, formData) {
      if (edit === true) {
        formData.append("id", this.videoToEdit.id);
      }
    },

    /**
     * [EDIT-VIDEO]
     * Método invocado no V-IF do botão de edição, para realizar o update das info's do vídeo
     */
    edit() {
      let edit = true;
      this.upload(edit);
    },

    /**
     * [EDIT-VIDEO]
     * Na edição do vídeo, mantém no atributo videoToEdit o Vídeo selecionado (via tela de catálogo) para realizar a edição
     */
    populateVideoToEdit(video) {
      this.videoToEdit = video;

      this.publicacaoDate = video.dataPublicacao;
      this.endDate = video.dataFinal;
      this.tituloVideo = video.titulo;
      this.descricaoVideo = video.descricao;

      video.tagsVO.forEach(element => {
        this.arrayTagsEdit.push(element.nomeTag);
      });

      this.tags = " ";
    },

    /**
     * [EDIT-VIDEO-TAG-1]
     * Na edição do vídeo, seleciona a tag a ser removida
     */
    selectTagToRemove(idVideo, nomeTag) {
      this.dialog = true;

      this.videoToRemove = idVideo;
      this.nomeTagToRemove = nomeTag;

      this.tagToRemove = this.videoToEdit.tagsVO.filter(element => {
        return element.nomeTag === nomeTag;
      })[0].id;
    },

    /**
     * [EDIT-VIDEO-TAG-2]
     * Na edição do vídeo, removerá a Tag selecionada
     */
    deleteTag() {
      let tagToRemove = {
        idVideo: this.videoToRemove,
        idTag: this.tagToRemove,
        nomeTag: this.nomeTagToRemove
      };
      this.$store
        .dispatch("removeTag", tagToRemove)
        .then(() => {
          this.removeTag(tagToRemove.nomeTag);
        })
        .finally(() => {
          this.dialog = false;
          this.videoToRemove = "";
          this.tagToRemove = "";
          this.nomeTagToRemove = "";
        });
    },

    /**
     * [EDIT-VIDEO-REMOVE]
     * Na edição do vídeo, delete o vídeo do repositório
     */
    removeVideo() {
      this.$store
        .dispatch("removeVideo", { idVideo: this.videoToEdit.id })
        .then(() => this.redirectRotaCatalogo())
        .finally(() => {
          this.dialogRemove = false;
        });
    }
  },
  mounted() {
    //pega o video via params (quando é realizada uma edição)
    if (
      this.$route.params !== undefined &&
      this.$route.params.videoToEdit !== undefined
    ) {
      this.populateVideoToEdit(this.$route.params.videoToEdit);
    }
  }
};
</script>
<style scoped>
.label-file {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
  font-size: 14px !important;
  font-weight: normal !important;
  color: grey !important;
}
.img-border {
  border-radius: 6px;
}
</style>

