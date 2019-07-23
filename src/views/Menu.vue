<template>
  <v-content>
    <v-toolbar :v-if="false" dark app fixed color="secondary">
      <v-btn icon small @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span class="primary--text">MY</span>
        <span class="font-weight-light">VIDEOS</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary hide-overlay app>
      <v-list dense>
        <v-list-tile class="pa-2">
          <div class="text-xs-center">
            <img src="@/assets/logo.png" width="50" height="80" />
          </div>
        </v-list-tile>
        <v-divider class="pa-1"></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>subscriptions</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/videos">Catalog</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>video_call</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/upload">Upload</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="pa-1"></v-divider>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            <router-link to="#">Logout</router-link>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  functions: {
    changeDraw: function() {
      this.drawer = false;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("showSnackSucces", "Logout successful.");
      this.$router.replace({ path: "/" });
      this.drawer = false;
    }
  }
};
</script>

