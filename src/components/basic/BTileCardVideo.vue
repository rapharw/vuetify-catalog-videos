<template>
  <div v-if="title && img" class="tile">
    <div class="tile__media">
      <img class="tile__img" :src="img">
    </div>
    <div class="tile__details">
      <div class="tile__title">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 140px;
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: 450ms all;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.tile__img {
  width: 250px;
  height: 140px;
  // -o-object-fit: cover;
  // object-fit: cover;

  object-fit: cover;
  object-position: 50% 50%; /* default value: image is centered*/
  object-position: 0 0; /* positioned top left of the content box */
}
.tile__details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  font-size: 10px;
  opacity: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  transition: 450ms opacity;
}

.tile__details:after,
.tile__details:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: #000;
}
.tile__details:after {
  margin-top: -25px;
  margin-left: -25px;
  width: 50px;
  height: 50px;
  border: 3px solid #ecf0f1;
  line-height: 50px;
  text-align: center;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.tile__details:before {
  content: "▶";
  left: 0;
  width: 100%;
  font-size: 30px;
  margin-left: 4px;
  margin-top: -20px;
  text-align: center;
  z-index: 2;
  color: #fff;
}
.tile:hover .tile__details {
  opacity: 1;
}
.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  color: #fff;
}

.tile:hover ~ .tile {
  -webkit-transform: translate3d(125px, 0, 0);
  transform: translate3d(125px, 0, 0);
}
</style>