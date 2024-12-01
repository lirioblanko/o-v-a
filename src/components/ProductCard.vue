<template>
  <Card style="width: 22rem; overflow: hidden; height: 100%">
    <template #header >
      <Image :src="product.image" :alt="product.title" width="150" height="150" />
    </template>
    <template #title>{{product.title}}</template>
    <template #subtitle>{{product.category}}</template>
    <template #content style="height: 100%">
      <Rating v-model="product.rating.rate" readonly justify="center" class="pb-3"/>
      <p class="m-0" align="left">{{product.description}}</p>
    </template>
    <template #footer>
      <div class="flex gap-4" style="margin-top: auto">
        <Button label="Подробнее" outlined class="w-full"  @click="goToProduct(product.id)"/>
        <Button label="Купить" class="w-full"   @click="addToCart(product)"/>
      </div>
    </template>
  </Card>
</template>

<script setup>
  import Button from 'primevue/button';
  import Card from 'primevue/card';
  import Image from 'primevue/image';
  import Rating from 'primevue/rating';
  import { useRouterLogic } from "../scripts/hooks/useRouter.js";
  import {defineProps} from "vue";

  const { goToProduct } = useRouterLogic();

  defineProps({
    product: Object,
    addToCart: Function,
  });
</script>

<style >
  .p-card  {
    padding-top: 2rem;
  }
  .p-card-body {
    height: inherit;
  }
  .p-card-caption {
  min-height: 7rem;
  }
  .p-card-content {
    justify-items: center;
  }
  .p-card-footer {
    margin-top: auto;
  }
</style>