<template>
  <Menubar :model="menuItems" />
</template>

<script setup>
  import Menubar from "primevue/menubar";

  const menuItems = [
    {label: 'Каталог', item: 'Каталог', root: '/', active: true},
    {label: 'Корзина', item: 'Корзина', root: '/cart', active: false},
  ];
</script>

<style scoped>
  .p-menubar {
    background-color: transparent;
    border: none;
  }
</style>