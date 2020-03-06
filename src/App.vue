<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Lego from "./utils/lego/index";

@Component({})
export default class App extends Vue {
  mounted() {
    const lego = new Lego({
      el: document.getElementById("app")
    });
    // lego.render();
    lego.debug();
    lego.createGround();
    lego.createRectangle({ width: 100, height: 100, x: 0, y: 0, z: 0 });
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
