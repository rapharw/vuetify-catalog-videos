<template>
  <v-app id="public">
    <v-container
      fluid
      fill-height
      class="white"
      style="background-image: linear-gradient(to top right, #eeeeee, white);"
    >
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
          <img src="@/assets/logo.png" width="200" class="pb-5 pt-3" />
          <br />
          <video-video-item
            v-if="getUrl !== null"
            :urlVideo="getUrl.urlVideo"
            :urlImage="getUrl.urlImage"
          ></video-video-item>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      id: this.$route.query.id,
      url: null
    };
  },
  computed: {
    getUrl() {
      return this.url;
    }
  },
  mounted() {
    this.getUrlById();
  },
  methods: {
    getUrlById() {
      this.$store
        .dispatch("getUrl", this.id)
        .then(() => {
          this.url = this.$store.getters.getUrl;
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
</style>
