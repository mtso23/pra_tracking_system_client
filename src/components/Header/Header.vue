<template>
  <div class="Header">
    <img class="Header--Logo" width="225" src="../../assets/logo.png" />
    <b-navbar>
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
  name: "Header"
};
</script>

<style>
.Header {
  align-items: center;
  display: flex;
  justify-content: center;
  padding-left: 3rem;
  padding-right: 5rem;
}

.Header--Logo {
  margin-right: auto;
}
</style>
