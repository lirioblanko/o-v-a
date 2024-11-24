<template>
  <h1>Каталог</h1>
  <Toast />
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
  <Modal v-model:visible="visible" :header="isInfo ? 'Добавление нового товара' : 'Оформление заказа'">
    <template #form>
      <ProductForm :resolver="resolver" :categories="categories" :initialValues="initialValues" @addProduct="addProduct" />
    </template>
  </Modal>
</template>

<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { apiService } from '../api/apiService.js';
  import { useToast } from 'primevue/usetoast';
  import Button from 'primevue/button';

  import Card from "../components/ProductCard.vue";
  import Modal from "../components/Modal.vue";
  import ProductForm from './utility/ProductForm.vue';

  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { z } from 'zod';

  const toast = useToast();

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
      toast.add({
        severity: 'error',
        summary: `Ошибка при получении товаров: ${error}`,
        life: 3000
      });
      error.value = true;
      isLoading.value = false;
    }
  }

  const initialValues = reactive({
    title: '',
    description: '',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    category: { name: ''},
  });

  const categories = ref([
    { name: 'Мужская одежда', code: 'men' },
    { name: 'Женская одежда', code: 'women' },
    { name: 'Детская одежда', code: 'children' },
  ]);

  const resolver =  zodResolver(
      z.object({
        title: z.string().min(1, { message: 'Укажите название товара' }),
        image: z.string().min(1, { message: 'Укажите ссылку на изображение товара' }),
        category: z.union([
          z.object({
            name: z.string().min(1, 'Укажите категорию товара')
          }),
          z.any().refine((val) => false, { message: 'Укажите категорию товара' })
        ])
      })
  );

  function addToCart(id) {
    isInfo.value = false
    visible.value = true;
  }

  function addNewProduct() {
    isInfo.value = true
    visible.value = true
  }

  function addProduct({ values }) {
    const {title, image, category, description} = values
    products.value.unshift(
        {
          // todo: сомнительное решение
          id: Math.floor(Math.random() * 1000),
          image,
          title,
          description,
          category: category.name,
          rating: {
            rate: 0,
            count: 0
          },
        })
    toast.add({
      severity: 'success',
      summary: 'Товар успешно добавлен',
      life: 3000
    });
    visible.value = false;
  }
</script>

<style scoped>
  ul {
    justify-content: center;
  }
</style>