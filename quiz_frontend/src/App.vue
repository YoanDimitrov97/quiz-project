<!-- CREATE QUIZ -->
<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue"
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: Estandar;
    src: url("fonts/Estandar-Regular.ttf");
}

* {
  padding:0;
  margin:0;
  list-style:none;
  text-decoration:none;
  font-family:"Estandar";
}

#app {
  height:100vh;
  background: transparent linear-gradient(1deg, #1C011B 0%, #5D083C 100%) 0% 0% no-repeat padding-box;
}
</style>
