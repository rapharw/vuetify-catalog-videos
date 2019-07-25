<template>
  <div>
    <v-hover class="my-card-hover">
      <v-card class="pa-2 ma-1 mr-3">
        <video-video-item size="small" :urlVideo="item.url.urlVideo" :urlImage="item.url.urlImage"></video-video-item>

        <v-card-title primary-title>
          <div>
            <div class="primary--text title font-weight-regular">{{item.titulo}}</div>

            <div class="descricaoItem">
              Created on
              <span class="font-weight-regular">{{formatData(item.dataInclusao)}}</span>
            </div>
            <div class="descricaoItem">
              From: {{formatData(item.dataPublicacao)}}
              <span
                v-if="item.dataFinal !== null"
              >Until: {{formatData(item.dataFinal)}}</span>
            </div>
          </div>
        </v-card-title>

        <!-- Ver mais -->
        <div class="space-card-bottom-nav" @click="hover = true">
          <v-bottom-nav
            :active.sync="activeBtn"
            :value="showNav"
            absolute
            fixed
            color="transparent"
            v-if="!hover"
          >
            <v-btn flat>
              <span class="btn-ver-mais">More</span>
              <v-icon class="btn-ver-mais">expand_less</v-icon>
            </v-btn>
          </v-bottom-nav>
        </div>

        <!-- Expand on hover (descrição) -->
        <div>
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out primary v-card--reveal white--text"
              style="height: 100%;"
            >
              <v-container fluid fill-height>
                <v-layout row wrap>
                  <v-flex>
                    <div class="font-weight-light title pb-2">{{item.descricao}}</div>
                    <v-chip v-for="tag in item.tagsVO" :key="tag.id" small>{{tag.nomeTag}}</v-chip>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-expand-transition>

          <v-bottom-nav
            :active.sync="activeBtn"
            :value="showNav"
            absolute
            color="transparent"
            v-if="hover"
          >
            <v-btn flat @click="goLink(item)">
              <span>Link</span>
              <v-icon>near_me</v-icon>
            </v-btn>
            <v-btn flat @click="hover = false">
              <span>Less</span>
              <v-icon>expand_more</v-icon>
            </v-btn>
            <v-btn flat @click="modalEdit(item)">
              <span>Edit</span>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-bottom-nav>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
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
  data() {
    return {
      hover: false,
      activeBtn: 1,
      showNav: true
    };
  },
  methods: {
    goLink(item) {
      //this.$router.push({ name: "Public", query: { id: item.id } });

      let routeData = this.$router.resolve({
        name: "Public",
        query: { id: item.id }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
.my-card-hover {
  -webkit-transition: all 0.8s ease-in-out;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
  margin-left: -8px;
  border-radius: 6px;
  color: white !important;
}

.btn-ver-mais {
  color: #dc6b2f !important;
}
.v-item-group.v-bottom-nav .v-btn {
  color: white !important;
}
.space-card-bottom-nav {
  margin-top: 3em !important;
}

.v-chip.v-chip--small {
  background: white !important;
  opacity: 1;
  color: #1b365d;
}

.btn-ver-menos .v-btn__content {
  color: #dc6b2f !important;
  background-color: green !important;
}

/* .v-item-group.v-bottom-nav.theme--light.v-bottom-nav--absolute.v-bottom-nav--active {
  color: #dc6b2f !important;
  background-color: green !important;
} */

.v-btn.v-btn--active.v-btn--flat {
  text-decoration: none;
}

/* <div data-v-8a898e6c="" class="v-item-group v-bottom-nav theme--light v-bottom-nav--absolute v-bottom-nav--active transparent" style="height: 56px;">
    <a data-v-8a898e6c="" href="#/public?id=3" class="" target="_blank">
        <button data-v-8a898e6c="" type="button" class="v-btn v-btn--active v-btn--flat theme--light secondary--text">
            <div class="v-btn__content">
                <span data-v-8a898e6c="">Link</span>
                <i data-v-8a898e6c="" aria-hidden="true" class="v-icon material-icons theme--light">near_me</i>
            </div>
        </button>
    </a>
    <button data-v-8a898e6c="" type="button" class="btn-ver-menos v-btn v-btn--flat theme--light">
        <div class="v-btn__content">
            <span data-v-8a898e6c="">Ver menos</span>
            <i data-v-8a898e6c="" aria-hidden="true" class="v-icon material-icons theme--light">expand_more</i>
        </div>
    </button><button data-v-8a898e6c="" type="button" class="v-btn v-btn--flat theme--light secondary--text"><div class="v-btn__content"><span data-v-8a898e6c="">Editar</span><i data-v-8a898e6c="" aria-hidden="true" class="v-icon material-icons theme--light">edit</i></div></button></div>

 */
</style>
