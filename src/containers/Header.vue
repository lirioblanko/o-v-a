<template>
  <header>
    <div class="container header">
      <slot name="search">
        <search-item @search="search($event)"/>
      </slot>
      <span class="logo" >LOGO</span>
      <slot name="menu">
        <Menu/>
      </slot>
    </div>
  </header>
</template>

<script setup>
  import SearchItem from "../components/SearchItem.vue";
  import Menu from "../components/Menu.vue";

  function search(value) {
    console.log(value)
}
</script>

<style scoped>
  header {
    width: 100%;
    top: 0;
    position: sticky;
    z-index: 99;
    background: #10b981;
    padding: 24px;
    border-bottom: 1px solid #E0E0E0;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 2rem;
    font-weight:bold;
    color:#fff;
  }
</style>