<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Lego from "./utils/lego/index";
import Model from "./utils/lego/core/Model";

@Component({})
export default class App extends Vue {
  mounted() {
    const lego = new Lego({
      el: document.getElementById("app")
    });
    Model.crtRectangleGround({
      width: 2000,
      length: 2000,
      height: 10,
      color: "#efefef"
    });
    Model.crtRectangle([
      { width: 100, length: 100, height: 10, x: 0, y: 0, color: "#00ff00" },
      {
        width: 500,
        length: 500,
        height: 50,
        x: 500,
        y: -500,
        color: "#00ff00"
      }
    ]);
    lego.debug();
    // lego.createRectangle({ width: 100, height: 100, x: 0, y: 0, z: 0 });
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
