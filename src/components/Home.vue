<template>
  <div id="Home">
    <Header class="Home--Header" />
    <Table class="Home--Table" />
  </div>
</template>

<script>
import Header from "./Header/Header";
import Table from "./Table/Table";

export default {
  name: "Home",
  components: {
    Header,
    Table
  }
};
</script>

<style>
.Home {
  display: grid;
  grid-template-areas: "header" "table";
  grid-template-columns: 1fr;
  grid-template-rows: auto;
}

.Home--Header {
  grid-area: header;
}

.Home--Table {
  grid-area: table;
}
</style>
