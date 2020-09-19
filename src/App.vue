<template>
  <div id="app">
    <Login v-if="config.ACCESS_CONTROL === 'none'" />
    <router-view v-if="config.ACCESS_CONTROL !== 'none'" />
  </div>
</template>

<script>
import Login from "./components/Login/Login";
import config from "./config.js";

export default {
  name: "app",
  data: function() {
    return {
      config,
    };
  },
  components: {
    Login,
  },
};
</script>

<style lang="scss">
// Import Bulma and Buefy core
@import "~bulma/sass/utilities/_all";

$primary: #dd6b4c;
$primary-invert: findColorInvert($primary);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
);

@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  color: #2c3e50;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
</style>
