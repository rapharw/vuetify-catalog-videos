<template>
  <v-app>
    <v-content>
      <MenuLateral v-if="!$route.meta.public"></MenuLateral>

      <!-- Content -->
      <v-container fluid fill-height style="margin-top: -70px;">
        <v-flex xs12>
          <router-view></router-view>
        </v-flex>
      </v-container>

      <!-- Loading -->
      <v-dialog v-model="loading" persistent width="300">
        <v-card color="secondary" dark>
          <v-card-text>
            Please wait
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Snackbar -->
      <v-snackbar
        :timeout="snackbar.timeout"
        bottom
        right
        :color="snackbar.color"
        v-model="snackbar.show"
      >
        {{ snackbar.text }}
        <v-btn dark flat @click.native="snackbar.show = false" icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import MenuLateral from "@/views/Menu.vue";

export default {
  name: "App",
  components: {
    MenuLateral
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    if (
      this.$store.getters.isAuthenticated &&
      !this.$router.history.pending.meta.public
    ) {
      //this.$store.dispatch("userRequest");
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";
</style>
