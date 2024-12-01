<template>
  <Menubar :model="menuItems" />
</template>

<script setup>
  import { inject, computed } from "vue";
  import Menubar from "primevue/menubar";
  import { useRouterLogic } from "../scripts/hooks/useRouter.js";
  const { goToHome, goToNewProduct, goToCart, goToAuth } = useRouterLogic();

  const count = inject('count')
  const isLogin = inject('isLogin');

  const menuItems = computed(() => {
    const items = [
      {label: 'Каталог',
        command: goToHome,
      },
      {
        label: `Корзина: ${count.value}`,
        command: goToCart
      },
      {
        label: isLogin.value ? 'Выход' : 'Авторизация',
        command: () => {
          if (isLogin.value) {
            isLogin.value = false;
            localStorage.removeItem('isLogin');
            goToAuth();
          } else {
            localStorage.setItem('isLogin', 'true')
            goToAuth();
          }
        }
      },
    ];

    if (isLogin.value) {
      items.splice(1, 0, { label: 'Новый товар', command: goToNewProduct });
    }

    return items;
  });
</script>

<style scoped>
  .p-menubar {
    background-color: transparent;
    border: none;
  }
</style>