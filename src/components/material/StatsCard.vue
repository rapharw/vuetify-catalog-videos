<template>
  <material-card
   :to="url"
    v-bind="$attrs"
    class="v-card--material-stats"
    v-on="$listeners"
  >
    <v-card 
      slot="offset"
      :class="`elevation-${elevation}`"
      :color="color"
      class="pa-4"
      dark
    >
      <v-icon
        size="40"
      >
        {{ icon }}
      </v-icon>
    </v-card>
    <div class="text-xs-right">
      <p
        class="category grey--text font-weight-light"
        v-text="title"
      />
      <h3
        class="title display-1 font-weight-light">
        {{ value }} <small>{{ smallValue }}</small>
      </h3>
      <h3
        class="title display-1 font-weight-light" v-if="valueWithVisibility && withVisibility != undefined">
        <label>{{ valueWithVisibility }} </label>
        <small>{{ smallValueWithVisibility }}</small>
        <v-icon @click="changeVisibility">{{withVisibility == false ? 'visibility_off' : 'visibility'}}</v-icon>
      </h3>
    </div>

    <template slot="actions">
      <v-flex pa-1 xs12 class="text-xs-right sub-text-padding">
        <span
          :class="subTextColor"
          class="caption font-weight-light"
          v-text="subText"
        />
        <v-icon
          :color="subIconColor"
          size="20"
          class="mr-2"
        >
          {{ subIcon }}
        </v-icon>
        
        <v-chip
          v-if="subTextButton" 
          class="elevation-2 font-weight-regular sub-text-chip-border sub-text-chip-padding"
          color="default" 
          outline 
          small
          @click="viewMore"
          >
          {{subTextButton}}
          <v-icon dark v-if="expand == false">expand_more</v-icon>
          <v-icon dark v-if="expand == true">expand_less</v-icon>
        </v-chip>
        <v-expand-transition>
          <div v-show="expand">
              <v-timeline dense>
                  <v-timeline-item
                      class="mb-3 items-timeline"
                      :color="listDetailsTimelineColor"
                      small
                      v-for="(item, id) in listDetailsTimeline" :key="id">
                      <v-layout justify-space-between>
                          <v-flex xs7>{{item.descricao}}</v-flex>
                          <v-flex xs5 text-xs-right>R$ {{item.valor}}</v-flex>
                      </v-layout>
                  </v-timeline-item>

              </v-timeline>
          </div>
      </v-expand-transition>
      </v-flex>
    </template>
  </material-card>
</template>

<script>
import Card from './Card'

export default {
  inheritAttrs: false,

  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true
    },
    subIcon: {
      type: String,
      default: undefined
    },
    subIconColor: {
      type: String,
      default: undefined
    },
    subTextColor: {
      type: String,
      default: undefined
    },
    subText: {
      type: String,
      default: undefined
    },
    subTextButton: {
      type: String,
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    smallValue: {
      type: String,
      default: undefined
    },

    valueWithVisibility: {
      type: String,
      default: undefined
    },
    smallValueWithVisibility: {
      type: String,
      default: undefined
    },
    withVisibility: {
      type: Boolean,
      default: undefined
    },

    url: {
      type: String,
      default: undefined
    },
    listDetailsTimeline: {
      type: Array,
      default: undefined
    },
    listDetailsTimelineColor: {
      type: String,
      default: 'grey'
    },
    expand: {
      type: Boolean,
      default: undefined
    }
  },
  methods: {
    changeVisibility(){
      let visibility = !this.withVisibility
      this.$emit("changeVisibility", visibility);
    },
    viewMore(){
      this.$emit("viewMore");
    }
  }
}
</script>

<style lang="scss">
.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 4px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
  
  i.v-icon.material-icons.theme--dark{
    font-size: 25px !important;
  }

  .sub-text-padding{
    margin: -4px 2em -4px 0px;
  }

  .sub-text-chip-border{
    border-radius: 6px;
  }

  .sub-text-chip-padding{
    margin-top: 0em;
    margin-bottom: 0em;
  }

}
.items-timeline{
    padding-bottom: 0px;
    text-align: left;
    font-size: 13px;
}
</style>
