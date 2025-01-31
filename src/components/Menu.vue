<template>
  <div>
    <ul class="flex nav">
      <li :data-test="`menu-link-${char}`" v-for="item in menuItems" :key="item.label" class="nav-item" >
        <router-link
            :to="item.to"
            @click.native.prevent="handleClick(item)"
        >
          {{item.label}}
        </router-link>
    </li>
    </ul>
  </div>
</template>

<script setup>
  import { defineProps, computed } from "vue";
  import { storeToRefs } from "pinia";
  import { useCartStore } from "../store/cart.js";
  import { useAuthStore } from "../store/auth.js";
  import { useRouter } from "vue-router";
  import { useRouterLogic } from "../scripts/hooks/useRouter.js";

  defineProps(['char']);
  const { goToNewProduct } = useRouterLogic();
  const router = useRouter();

  let cartStore = useCartStore();
  let authStore = useAuthStore();
  const { count } = storeToRefs(cartStore)
  const { isLogin } = storeToRefs(authStore)

  const menuItems = computed(() => {
    const items = [
      {label: 'Каталог',
        to: "/"
      },
      {
        label: `Корзина: ${count.value}`,
        to: "/cart"
      },
      {
        label: isLogin.value ? 'Выход' : 'Авторизация',
        to: "/auth"
      },
    ];

    if (isLogin.value) {
      items.splice(1, 0, { label: 'Новый товар', command: goToNewProduct, to: "/new"  });
    }

    return items;
  });

  const handleClick = (item) => {
    if (item.label === 'Выход' || item.label === 'Авторизация') {
      if (isLogin.value) {
        isLogin.value = false;
        localStorage.removeItem('isLogin');
      } else {
        localStorage.setItem('isLogin', 'true');
      }
      router.push(item.to);
    } else {
      router.push(item.to);
    }
  };


</script>

<style scoped >
  ul {
    list-style: none;
    color: black;
    display: flex;
    gap: 2rem;
    a {
      color: black;
    }
  }

  .router-link-active {
    color: #fff !important;
  }
  .router-link-exact-active {
    color: #fff !important;
  }

</style>