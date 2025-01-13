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
  import { ref, onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { useCatalogStore } from "../store/catalog.js";
  import Card from "../components/ProductCard.vue";
  import ModalInfo from "./utility/ModalInfo.vue";
  import { useOrderLogic } from "../scripts/hooks/useOrderLogic.js";

  const visible = ref(false);
  let catalogStore = useCatalogStore();
  const { allProducts, isLoading } = storeToRefs(catalogStore)

  onMounted(() => {
    catalogStore.fetchProducts();
  });

  const { addToCart, toggleModal } = useOrderLogic(visible)
</script>

<style scoped>
  ul {
    justify-content: center;
  }
</style>