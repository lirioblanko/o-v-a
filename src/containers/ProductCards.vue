<template>
  <h1>Каталог</h1>
  <Toast />
  <div v-if="isLoading" class="flex w-full justify-content-center">
    <p>Loading</p>
  </div>
  <div v-else>
    <template v-if="!allProducts.isEmpty">
      <ul class="grid gap-3">
        <li v-for="product in allProducts" :key="product.id" class="flex" >
          <card :product="product" :addToCart="addToCart"/>
        </li>
      </ul>
    </template>
  </div>
  <ModalInfo v-model:visible="visible" :toggleModal="toggleModal" />
</template>

<script setup>
  import { ref, onMounted, inject } from "vue";
  import { apiService } from '../api/apiService.js';
  import { useToastLogic } from "../scripts/hooks/useToast.js";
  import Card from "../components/ProductCard.vue";
  import ModalInfo from "./utility/ModalInfo.vue";
  import {useOrderLogic} from "../scripts/hooks/useOrderLogic.js";

  const { toastInfo } = useToastLogic()

  const visible = ref(false);
  const isLoading = ref(true);

  const allProducts = inject('allProducts')

  onMounted(() => {
    fetchProducts();
  });

  const { addToCart, toggleModal } = useOrderLogic(visible)

  async function fetchProducts() {
    try {
      const data = await apiService.getProducts();
      if (data) {
        allProducts.value = [...allProducts.value, ...data];
      }
    } catch (error) {
      toastInfo(`Ошибка при получении товаров: ${error}`, 'error' )
    }
    isLoading.value = false;
  }
</script>

<style scoped>
  ul {
    justify-content: center;
  }
</style>