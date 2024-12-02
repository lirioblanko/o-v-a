<template>
  <section>
    <h1>Добавление нового товара</h1>
    <ProductForm :resolver="resolverProduct" :categories="categories" :initialValues="productInitialValues" @addProduct="addProduct" />
  </section>
  <Toast />
</template>

<script setup>
import {inject, reactive, ref} from "vue";
import ProductForm from "../containers/utility/ProductForm.vue";
import { useToastLogic } from "../scripts/hooks/useToast.js";
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from "zod";

const { toastInfo } = useToastLogic()
const allProducts = inject('allProducts')

const productInitialValues = reactive({
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

const resolverProduct =  zodResolver(
    z.object({
      title: z.string().min(1, { message: 'Укажите название товара' }),
      image: z.string().min(1, { message: 'Укажите ссылку на изображение товара' }),
      description: z.string().optional(),
      category: z.union([
        z.object({
          name: z.string().min(1, 'Укажите категорию товара')
        }),
        z.any().refine((val) => false, { message: 'Укажите категорию товара' })
      ])
    })
);

function addProduct({ values }) {
  const {title, image, category, description} = values

  allProducts.value.unshift(
      {
        id: uuidv4(),
        image,
        title,
        description,
        category: category.name,
        rating: {
          rate: 0,
          count: 0
        },
      })
  toastInfo(`Товар успешно добавлен`, 'success' )
}
</script>