<template>
  <div class="pt-2">
    <div class="v-text-field__details">
      <div class="v-messages theme--light error--text">
        <div class="v-messages__wrapper">
          <div class="v-messages__message">{{critica}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    critica: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
</style>
