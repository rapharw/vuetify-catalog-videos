<template>
  <CardTemplate
    title="Videos"
    iconTitle="playlist_play"
    subtitle="Catalog of videos"
    class="bg-color"
  >
    <v-layout row wrap slot="content">
      <br />
      <v-flex xs12>
        <!-- Filter -->
        <CatalogVideoFilter :outline="true" :list-items="videos" @filtered="filtered"></CatalogVideoFilter>
      </v-flex>
      <v-flex xs12 align-end>
        <!-- Card view -->
        <div class="text-xs-right">
          <CatalogCardView
            :disabled-view="disabledView"
            @change-view-to-grid="changeViewToGrid"
            @change-view-to-list="changeViewToList"
          ></CatalogCardView>
        </div>
      </v-flex>
      <!-- List -->
      <v-flex v-if="disabledView[0]">
        <v-flex xs12 v-for="item in getLista" :key="item.id">
          <CatalogVideoList :item="item" :modal-edit="modalEdit" :format-data="formatData"></CatalogVideoList>
        </v-flex>
      </v-flex>

      <!-- Card -->
      <v-flex v-if="disabledView[1]">
        <v-container fill-height fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex lg4 md6 sm6 xs12 v-for="item in getLista" :key="item.id">
              <CatalogVideoCard :item="item" :modal-edit="modalEdit" :format-data="formatData"></CatalogVideoCard>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <!-- Paginação -->
      <v-flex xs12>
        <div class="text-xs-center pt-5">
          <BasicPagination
            color="primary"
            :circle="true"
            :pageable="pageable"
            :pageableTotal="pageableTotal"
            :total-visible="7"
            @eventInput="setPageableInput"
          ></BasicPagination>
        </div>
      </v-flex>
    </v-layout>
  </CardTemplate>
</template>

<script>
import moment from "moment";
import CardTemplate from "@/templates/CardTemplate.vue";
import BasicPagination from "@/components/basic/BasicPagination.vue";
import CatalogVideoCard from "@/views/catalog/VideoCard.vue";
import CatalogVideoList from "@/views/catalog/VideoList.vue";
import CatalogCardView from "@/views/catalog/CardView.vue";
import CatalogVideoFilter from "@/views/catalog/VideoFilter.vue";

export default {
  components: {
    CardTemplate,
    BasicPagination,
    CatalogVideoCard,
    CatalogVideoList,
    CatalogCardView,
    CatalogVideoFilter
  },
  data: function() {
    return {
      itemSearch: "",
      pageable: 1,
      pageableList: 0,
      pageableTotal: 0,

      disabledView: [false, true],
      videos: [],
      videosFiltered: []
    };
  },
  methods: {
    filtered(value) {
      this.videosFiltered = value;
    },
    changeViewToGrid() {
      this.disabledView = [false, true];
    },
    changeViewToList() {
      this.disabledView = [true, false];
    },
    setPageableInput(pageableInput) {
      this.pageableList = pageableInput - 1;
      this.listaVideosPageable();
    },
    formatData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    listaVideosPageable() {
      this.$store
        .dispatch("listVideosPageable", { page: this.pageableList })
        .then(pageable => {
          this.videos = this.$store.getters.listVideos;
          this.videosFiltered = this.$store.getters.listVideos;
          this.pageableTotal = pageable.totalPages;
        });
    },
    modalEdit(item) {
      this.$router.push({
        name: "Upload",
        params: { videoToEdit: item }
      });
    }
  },
  computed: {
    //regra do filtro de itens solic
    getLista() {
      return this.videosFiltered;
    }
  },
  mounted() {
    //pega o titulo do video via params (quando realizar o upload de um video) e insere no Filtro de pesquisa
    // if (
    //   this.$route.params !== undefined &&
    //   this.$route.params.video !== undefined
    // ) {
    //   this.itemSearch = this.$route.params.video;
    // } else {
    //   this.itemSearch = "rrw";
    // }

    this.listaVideosPageable();

    this.host = window.location.hostname;
    this.port = window.location.port;
  }
};
</script>