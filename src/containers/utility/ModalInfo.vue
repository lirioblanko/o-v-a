<template>
  <Modal  header="Товар добавлен в корзину" :style="{ width: '30rem' }">
    <template #form>
      <div class="flex flex-row mt-2 gap-4 w-full">
        <Button severity="success" label="Перейти в корзину" class="w-full" @click="goToCart()"/>
        <Button severity="secondary" label="Продолжить покупки" class="w-full" @click="toggleModal(false)" />
      </div>
    </template>
  </Modal>
</template>

<script setup >
import Button from "primevue/button";
import Modal from "../../components/Modal.vue";
import { useRouterLogic } from "../../scripts/hooks/useRouter.js";

defineProps({
  toggleModal: Function
})

const { goToCart } = useRouterLogic()
</script>