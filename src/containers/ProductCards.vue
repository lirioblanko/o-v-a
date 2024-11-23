<template>
  <h1>Продукты</h1>
  <div class="flex gap-4 justify-content-center mb-6">
    <Button label="Добавить товар" outlined  @click="addNewProduct"/>
  </div>
  <div v-if="isLoading" class="flex w-full justify-content-center">
    <p>Loading</p>
  </div>
  <div v-else>
    <template v-if="!products.isEmpty">
      <ul class="grid gap-3">
        <li v-for="product in products" :key="product.id" class="flex" >
          <card :product="product" :isLoading="isLoading" @addToCart="addToCart(product.id)"/>
      </li>
      </ul>
    </template>
  </div>
  <Dialog v-model:visible="visible" modal :header="isInfo ? 'Добавление нового товара' : 'Оформление заказа'" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-8">
      <label for="category" class="font-semibold w-24">Категория</label>
      <InputText id="category" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="description" class="font-semibold w-24">Описание товара</label>
      <InputText id="description" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Отмена" severity="secondary" @click="visible = false"></Button>
      <Button type="button" :label="isInfo ? 'Добавить' : 'Оформить'" @click="addProduct"></Button>
    </div>
  </Dialog>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { apiService } from '../api/apiService.js';
  import Card from "../components/ProductCard.vue";
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';

  const products = ref([]);
  const error = ref(false);
  const visible = ref(false);
  const isLoading = ref(true);
  const isInfo = ref(false)

  onMounted(() => {
    fetchProducts();
  });

  async function fetchProducts() {
    try {
      const data = await apiService.getProducts();
      if (data) {
        products.value = data;
        error.value = true
        isLoading.value = false;
      } else {
        error.value = true;
        isLoading.value = false;
      }
    } catch (error) {
      console.error('Ошибка при получении продуктов:', error);
      error.value = true;
      isLoading.value = false;
    }
  }
  function addToCart(id) {
    isInfo.value = false
    visible.value = true;
  }

  function addNewProduct() {
    isInfo.value = true
    visible.value = true
  }

  function addProduct() {
    products.value.unshift(
        {id: 5,
          title: 'test',
          category: 'category',
          rating: {
            rate:0,
            count:0
          },
          description: 'description',
        })
    visible.value = false;
  }
</script>

<style scoped>
  ul {
    justify-content: center;
  }
</style>