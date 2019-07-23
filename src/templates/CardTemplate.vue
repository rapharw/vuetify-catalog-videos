<template>
  <v-flex>
    <material-card>
      <v-flex slot="header">
        <span>
          <h4 class="title font-weight-light mb-2">
            <v-icon>{{iconTitle}}</v-icon>
            {{title}}
          </h4>
          <p class="category font-weight-thin">
            <b>{{subtitle}}</b>
          </p>
        </span>
      </v-flex>
      <v-expansion-panel
        v-model="painel"
        expand
        readonly
        class="v-expansion-panel-no-shadow"
        id="v-expansion-panel-parent"
      >
        <v-expansion-panel-content>
          <v-layout wrap>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <slot name="content"></slot>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </material-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    iconTitle: {
      type: String,
      required: false
    },
    subtitle: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      painel: [true, false]
    };
  }
};
</script>
