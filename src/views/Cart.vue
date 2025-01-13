<template>
  <h1>Оформление заказа</h1>
  <Button label="Очистить корзину" class="w-20rem mb-6" @click="cartStore.clear()" />
  <ul class="flex flex-column gap-3 w-full p-0">
    <li v-for="product in cartProducts" :key="product.id" class="flex">
      <Card style=" overflow: hidden; height: 100%" w-full>
      <template #content  >
        <div style="height: 100%; display: flex; width: 100%; justify-content: space-between; align-items: center;">
          <div class="flex gap-6">
            <Image :src="product.image" :alt="product.title" width="50" height="50" />
            <h3>{{ product.title}}</h3>
          </div>
          <span>{{ `${product.count} шт `}}</span>
        </div>
      </template>
      </Card>
    </li>
  </ul>
  <Toast />
  <OrderForm :resolver="resolverOrder" :initialValues="orderInitialValues" @addOrder="cartStore.addOrder" />
</template>

<script setup>
  import { reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useCartStore } from "../store/cart.js";
  import { zodResolver } from '@primevue/forms/resolvers/zod';
  import { z } from 'zod';
  import OrderForm from "../containers/utility/OrderForm.vue";
  import Button from "primevue/button";
  import Card from "primevue/card";
  import Image from 'primevue/image';

  let cartStore = useCartStore();
  const { cartProducts } = storeToRefs(cartStore)

  const orderInitialValues = reactive({
    name: '',
    address: '',
    birthday: '',
    phone: '',
    agree: false,
  });

  const resolverOrder =  zodResolver(
      z.object({
        name: z.string().min(1, { message: 'Укажите Ваше имя' }),
        address: z.string().min(1, { message: 'Укажите Ваш адрес' }),
        phone: z.string().min(1, { message: 'Укажите Ваш телефон в формате (999) 999-9999' }),
        birthday: z.date({
          format: 'dd.MM.yyyy',
          message: 'Укажите Ваш день рождения в формате ДД.ММ.ГГГГ',
        }),
        agree: z.boolean().refine((val) => val, { message: 'Вы должны согласиться с условиями' }),
      })
  );
</script>

<style >
  .p-card {
    width: 100%;
    padding-top: 0;
  }
</style>