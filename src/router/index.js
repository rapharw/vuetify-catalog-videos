import Vue from "vue";
import Router from "vue-router";

import {
  store
} from "@/store";

Vue.use(Router);

const router = new Router({

  mode: 'hash',
  base: '/',
  linkActiveClass: 'active',

  routes: [{
      path: "/public",
      component: () => import(`@/views/Public.vue`),
      name: "Public",
      props: route => ({
        query: route.query.id
      }),
      meta: {
        public: true
      }
    },
    {
      path: "/",
      name: "Login",
      component: () => import(`@/views/Login.vue`),
      meta: {
        public: true
      }
    },
    {
      path: "/videos",
      name: "Videos",
      component: () => import(`@/views/catalog/HomeVideo.vue`)
    },
    {
      path: "/upload",
      name: "Upload",
      component: () => import(`@/views/upload/UploadVideo.vue`)
    }
  ]
});


router.beforeEach((to, from, next) => {
  next()
  // if (to.name !== 'Login') {

  //   if (store.getters.isAuthenticated || (to.meta.public !== undefined && to.meta.public === true)) {
  //     next()
  //   } else {
  //     store.dispatch('showSnackError', 'Usuário não autorizado.')
  //     next({
  //       name: 'Login'
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router