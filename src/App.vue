<template>
  <PageWrapper>
    <router-view />
  </PageWrapper>
</template>

<script setup>
  import PageWrapper from "./containers/PageWrapper.vue";
  import {ref, provide} from "vue";

  const count = ref(0)
  const allProducts = ref([])
  const cartProducts = ref([])
  const isLogin = ref(localStorage.getItem('isLogin') === 'true')

  provide ('count', count);
  provide('allProducts', allProducts);
  provide('cartProducts', cartProducts);
  provide('isLogin', isLogin);
</script>

<style >
  .container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    justify-items: flex-start;
  }
</style>
