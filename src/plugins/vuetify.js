import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: "#1e90ca", // #E53935
    subprimary: "#6d6d6d", // #E53935
    secondary: "#232323", // #FFCDD2
    accent: "#DC6B2F", // #3F51B5,
    oops: "#97999B",
    subsecondary: '#C05131',
    subsectionsecondary: '#E28600',
    alert: "#A92B0C"
  }
})