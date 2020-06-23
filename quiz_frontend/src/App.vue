<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'app',
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
  box-sizing:border-box;
}

body {
  overflow:hidden;
}

#app {
  min-height:100vh;
  height:100%;
  background: transparent linear-gradient(1deg, #1C011B 0%, #5D083C 100%) 0% 0% no-repeat padding-box;
}
</style>
