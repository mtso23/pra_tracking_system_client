<template>
  <div id="app">
    <Login v-if="ACCESS_CONTROL.access === 'none'" id="login" />
    <router-view v-if="ACCESS_CONTROL.access !== 'none'" />
  </div>
</template>

<script>
import Login from "./components/Login/Login";
import { ACCESS_CONTROL } from "./definitions.js";

export default {
  name: "app",
  data: function() {
    return {
      ACCESS_CONTROL,
    };
  },
  components: {
    Login,
  },
};
</script>

<style lang="scss">
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
