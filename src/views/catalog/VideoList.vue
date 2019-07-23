<template>
  <v-card class="pa-2 ma-1 elevation-2">
    <v-layout>
      <v-flex lg3 md3 xs12>
        <video-video-item size="small" :urlVideo="item.url.urlVideo" :urlImage="item.url.urlImage"></video-video-item>
      </v-flex>

      <v-flex lg4 md4 xs12 class="pl-4">
        <div>
          <div class="primary--text title font-weight-regular">{{item.titulo}}</div>
          <div class="descricaoItem">Enviado: {{formatData(item.dataInclusao)}}</div>
          <div class="descricaoItem">
            Publicação: {{formatData(item.dataPublicacao)}}
            <span
              v-if="item.dataFinal !== null"
            >até {{formatData(item.dataFinal)}}</span>
          </div>

          <v-chip v-for="tag in item.tagsVO" :key="tag.id" small>{{tag.nomeTag}}</v-chip>

          <div class="descricaoItem">
            Link público:
            <router-link :to="{name: 'Public', query: { id: item.id }}" target="_blank">
              <span
                class="font-weight-regular"
              >{{`https://${host +":" + port}/public/?id=${item.id}`}}</span>
            </router-link>
          </div>
        </div>
      </v-flex>

      <v-flex lg4 md5 xs12 class="pl-4">
        <br />
        <label class="descricaoItem font-weight-regular">Descrição do vídeo</label>
        <div class="descricaoItem font-weight-light">{{item.descricao}}</div>
      </v-flex>
      <div class="float-button-padding">
        <BasicFabButton icon="edit" @action="modalEdit(item)"></BasicFabButton>
      </div>
    </v-layout>
  </v-card>
</template>

<script>
import BasicFabButton from "@/components/basic/BasicFabButton.vue";
export default {
  data() {
    return {
      host: "",
      port: ""
    };
  },
  components: {
    BasicFabButton
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    modalEdit: {
      type: Function,
      required: false
    },
    formatData: {
      type: Function,
      required: false
    }
  },
  mounted() {
    this.host = window.location.hostname;
    this.port = window.location.port;
  }
};
</script>

<style scoped>
.float-button-padding {
  margin: 1em;
  padding-top: 6em;
}
</style>
