<template>
  <v-app id="login">
    <v-content>
      <v-container
        fluid
        fill-height
        style="background: url('') no-repeat center center fixed; background-size: cover; background-image: linear-gradient(to bottom right, #dddddd, white);"
      >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-form>
              <v-card class="elevation-1 pa-3 fadeInDown">
                <v-card-text>
                  <div class="layout column align-center">
                    <img :src="imgLogo" class="fadeIn second" width="120" height="150" />
                    <h3 class="flex my-4 primary--text fadeIn second">{{titulo}}</h3>
                  </div>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="model.username"
                    class="fadeIn second"
                    autocomplete="nope"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.password"
                    @keyup.enter="login"
                    class="fadeIn third"
                    autocomplete="new-password"
                  ></v-text-field>
                  <div>
                    <v-alert v-model="alert" dismissible type="error" dense outline>{{critica}}</v-alert>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="fadeIn fourth"
                    block
                    color="primary"
                    @click="login"
                    :loading="loading"
                    round
                  >Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    titulo: "Videos",
    loading: false,
    alert: false,
    imgLogo: require("@/assets/logo.png"),
    model: {
      username: "",
      password: ""
    },
    critica: ""
  }),
  methods: {
    login() {
      this.alert = false;
      this.loading = true;
      setTimeout(() => {
        this.$store
          .dispatch("login", this.model)
          .then(() => {
            this.$store.dispatch("userRequest");
            this.$router.push("/upload");
          })
          // eslint-disable-next-line no-unused-vars
          .catch(e => {
            if (e.type !== undefined && e.type === "notauth") {
              this.critica = e.error;
            } else {
              this.critica = "Usuário não autorizado";
            }
            this.alert = true;
            this.loading = false;
          });
      }, 500);
    }
  },
  mounted() {
    this.$store.dispatch("logout");
    this.alert = false;
    this.loading = false;
  }
};
</script>
<style scoped lang="css">
#login {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}
</style>
