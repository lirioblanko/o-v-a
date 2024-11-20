<template>
  <h1>Продукты</h1>
  <template v-if="!products.isEmpty">
    <ul class="grid gap-3">
      <li v-for="product in products" :key="product.id" class="flex">
        <card :product="product" />
    </li>
    </ul>
  </template>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { apiService } from '../api/apiService.js';
  import Card from "../components/ProductCard.vue";

  const products = ref([]);
  const error = ref(false);

  onMounted(() => {
    fetchProducts();
  });

  async function fetchProducts() {
    try {
      const data = await apiService.getProducts();
      if (data) {
        products.value = data;
        error.value = true
      } else {
        error.value = true;
      }
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
      error.value = true;
    }
  }
</script>

<style scoped>
  ul {
    justify-content: center;
  }
</style>