<template>
  <div id="home">
    <Header id="header" />
    <Table id="table" />
  </div>
</template>

<script>
import Header from "./Header/Header";
import Table from "./Table/Table";

export default {
  name: "app",
  components: {
    Header,
    Table,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;
  color: #2c3e50;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: "header" "table";
}

#login {
  top: 0;
  left: 0;
  position: absolute;
  margin: auto;
  bottom: 0;
  right: 0;
  width: 30%;
  height: 30%;
}

#header {
  grid-area: header;
}

#table {
  grid-area: table;
}
</style>
