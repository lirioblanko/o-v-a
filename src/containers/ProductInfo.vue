<template>
  <Card style="overflow: hidden; height: 100%">
    <template #content>
      <div class="flex flex-column">
          <div class="flex flex-row sm:items-center gap-6" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
            <div>
              <div class="md:w-40">
                <img class="block xl:block mx-auto rounded w-15rem" :src="`${product.image}`" :alt="product.title" />
              </div>
            </div>
            <div class="flex flex-column">
              <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                <div class="flex flex-column align-items-start">
                  <Tag :value="product.category" severity="info"></Tag>
                  <p class="flex font-medium align-content-start mt-2" style="text-align: start">{{ product.description }}</p>
                </div>
              </div>
              <div class="flex flex-col md:items-end gap-8 mt-auto">
                <span class="text-xl font-semibold">${{ product.price }}</span>
                <div class="flex flex-row-reverse md:flex-row gap-2">
                  <Button icon="pi pi-shopping-cart" label="Купить" class="flex-auto md:flex-initial whitespace-nowrap" @click="addToCart(product)"></Button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import {defineProps} from "vue";
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Card from "primevue/card";

defineProps({
  product: Object,
  addToCart: Function,
});

</script>

<style scoped>
  nav {
    padding: 0;
  }
</style>