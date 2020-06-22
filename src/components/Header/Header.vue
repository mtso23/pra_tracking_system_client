<template>
  <div id="header">
    <img id="logo" width="225" src="../../assets/logo.png" />
    <b-navbar id="navbar">
      <template slot="start">
        <b-navbar-item href="#/">Home</b-navbar-item>
        <b-navbar-item href="#/form">Create</b-navbar-item>
        <b-navbar-item href="/">Logout</b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
#header {
  display: grid;

  grid-template-columns: 0.7fr 1fr 0.1fr;
  grid-template-rows: auto;
  grid-template-areas: "logo navbar";

  justify-content: center;
  align-content: center;
}

#logo {
  grid-area: logo;
}

#navbar {
  grid-area: navbar;
  justify-self: end;
}
</style>
