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
      <Form v-slot="$form" :initialValues :resolver @submit="addProduct" class="flex flex-column gap-2 w-full sm:w-56">
          <div class="flex flex-column gap-1">
            <FloatLabel variant="in">
              <InputText type="text" name="title" fluid />
              <label for="title">Название товара*</label>
            </FloatLabel>
            <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error?.message }}</Message>
          </div>
        <div class="flex flex-column gap-1">
          <FloatLabel variant="in">
            <InputText name="image" type="text" fluid />
            <label for="title">Изображение*</label>
          </FloatLabel>
          <Message v-if="$form.image?.invalid" severity="error" size="small" variant="simple">{{ $form.image.error?.message }}</Message>
        </div>
        <div class="flex flex-column gap-1">
          <FloatLabel variant="in">
            <Select name="category" inputId="category" :options="categories" optionLabel="name" class="w-full" variant="filled" />
            <label for="category">Категория товара*</label>
          </FloatLabel>
          <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{ $form.category.error.message }}</Message>
        </div>
        <div class="flex flex-column  gap-1">
          <FloatLabel variant="in">
            <Textarea name="description" rows="5" cols="30" style="resize: none" />
            <label for="description">Описание товара</label>
          </FloatLabel>
          <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{ $form.description.error?.message }}</Message>
        </div>
        <p style="margin: 0">* - обязательные поля</p>
        <div class="flex flex-column gap-1 mt-2">
          <Button type="submit" severity="secondary" label="Submit" />
        </div>
      </Form>
    </template>
  </Modal>
</template>

<script setup>
  import { ref, reactive, onMounted } from "vue";
  import { apiService } from '../api/apiService.js';
  import Card from "../components/ProductCard.vue";
  import Modal from "../components/Modal.vue";
  import { Form } from '@primevue/forms';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  import InputText from 'primevue/inputtext';
  import Message from 'primevue/message';
  import Select from 'primevue/select';
  import Textarea from 'primevue/textarea';
  import FloatLabel from 'primevue/floatlabel';

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

  function addProduct({ valid, values }) {
    const {title, image, category, description} = values
    if (valid) {
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
  }
</script>

<style scoped>
  ul {
    justify-content: center;
  }

  textarea[name="description"] {
    width: 100%;
    box-sizing: border-box;
  }
</style>