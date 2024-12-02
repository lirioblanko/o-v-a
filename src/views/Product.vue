<template>
  <div class="card flex justify-center pl-0">
    <Breadcrumb :home="homeMenuItem" :model="menuItems" />
  </div>
  <h1>{{ product.title }}</h1>
  <ProductInfo :product="product" :addToCart="addToCart" />
  <ModalInfo  v-model:visible="isVisibleModal" :toggleModal="toggleModal"/>
  <Toast />
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import {useRoute} from "vue-router";
  import Breadcrumb from 'primevue/breadcrumb';
  import ModalInfo from "../containers/utility/ModalInfo.vue";
  import ProductInfo from "../containers/ProductInfo.vue";
  import {useToastLogic} from "../scripts/hooks/useToast.js";
  import {apiService} from "../api/apiService.js";
  import {useOrderLogic} from "../scripts/hooks/useOrderLogic.js";

  onMounted(() => {
    fetchProduct();
  });

  const route = useRoute();
  const { toastInfo } = useToastLogic()

  const productId = route.params.productId;

  const product = ref({});
  const isLoading = ref(true);
  const isVisibleModal = ref(false);

  const homeMenuItem = ref({
    icon: 'pi pi-home',
    label: 'Весь каталог',
    url: '/'
  });

  const menuItems = ref([
    { label: product.value.title, disabled: true },
  ]);

  const { addToCart, toggleModal } = useOrderLogic(isVisibleModal)

  async function fetchProduct() {
    try {
      const data = await apiService.getProductById(productId)

      if (data) {
        product.value = data;
        menuItems.value[0].label = data.title;
        isLoading.value = false;
      } else {
        isLoading.value = false;
      }
    } catch (error) {
        toastInfo(`Ошибка при получении товара: ${error}`, 'error' )
        isLoading.value = false;
    }
  }
</script>

<style scoped>
  nav {
    padding: 0;
  }
</style>
