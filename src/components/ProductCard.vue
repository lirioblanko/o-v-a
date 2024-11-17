<template>
  <Card style="width: 22rem; overflow: hidden; height: 100%">
    <template #header >
      <Image :src="image" :alt="title" width="150" height="150" />
    </template>
    <template #title>{{title}}</template>
    <template #subtitle>{{category}}</template>
    <template #content style="height: 100%">
      <Rating v-model="rating.rate" readonly justify="center" class="pb-3"/>
      <p class="m-0" align="left">{{description}}</p>
    </template>
    <template #footer>
      <div class="flex gap-4" style="margin-top: auto">
        <Button label="Подробнее" outlined class="w-full"  @click="() => onClick(id)"/>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { apiService } from "../api/apiService.js";
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image';
import Rating from 'primevue/rating';

const props = defineProps({
  product: Object
});

const {id, title, category, description, image, rating} = props.product;

const onClick = (id) => {
  // todo: после настройки роутинга делать переход на страницу продукта и там выполнять этот запрос
  apiService.getProductById(id)
}
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