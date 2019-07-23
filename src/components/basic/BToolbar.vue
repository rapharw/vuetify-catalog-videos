<template>
  <v-toolbar
    :color="color"
    :app="app"
    :dense="dense"
    :flat="flat"
    :dark="dark"
    :extended="extended"
  >
    <v-toolbar-title class="headline text-uppercase">
      <span class="info--text">{{title}}</span>
      <span class="font-weight-light">{{subtitle}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <slot name="buttons"></slot>
    <template v-slot:extension>
      <slot name="extended"></slot>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
      description: "Color of toolbar"
    },
    title: {
      type: String,
      required: false,
      description: "Title of toolbar"
    },
    subtitle: {
      type: String,
      required: false,
      description: "SubTitle of toolbar"
    },
    app: {
      type: Boolean,
      required: false,
      default: true,
      description: "Designates the component as part of the application layout"
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
      description: "Reduces the height of the toolbar content and extension"
    },
    flat: {
      type: Boolean,
      required: false,
      default: false,
      description: "Removes the toolbar box-shadow"
    },
    dark: {
      type: Boolean,
      required: false,
      default: true,
      description: "Applies the dark theme variant"
    },
    extended: {
      type: Boolean,
      required: false,
      default: false,
      description:
        "Force the toolbar to generate the extension without using the slot"
    }
  }
};
</script>
