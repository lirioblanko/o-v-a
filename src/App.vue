<template>
  <PageWrapper>
    <cards/>
  </PageWrapper>
</template>

<script setup>
  import PageWrapper from "./containers/PageWrapper.vue";
  import Cards from "./containers/ProductCards.vue";
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
