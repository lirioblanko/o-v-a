<template>
  <div >
    <ul class="flex nav">
      <li v-for="item in menuItems" :key="item.label" class="nav-item" >
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
  import {ref, inject, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useRouterLogic } from "../scripts/hooks/useRouter.js";
  const { goToNewProduct } = useRouterLogic();
  const router = useRouter();

  const count = inject('count')
  const isLogin = ref(inject('isLogin'));

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