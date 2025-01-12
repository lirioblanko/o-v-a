<template>
  <section class="w-30rem">
    <h1>Авторизация</h1>
    <AuthForm :resolver="resolverAuth" :initialValues=" authInitialValues" @onLogin="onAuth()"/>
  </section>
</template>

<script setup>
  import { defineProps, reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../store/auth.js";
  import { useRouterLogic } from "../scripts/hooks/useRouter.js";
  import { zodResolver } from "@primevue/forms/resolvers/zod";
  import { z } from 'zod';
  import AuthForm from "../containers/utility/AuthForm.vue";

  const { goToNewProduct } = useRouterLogic()
  let authStore = useAuthStore();
  const { isLogin } = storeToRefs(authStore)

  defineProps({
    resolver: Object,
    initialValues: Object,
    onLogin: Object,
  });

  const authInitialValues = reactive({
    login: '',
    password: '',
  });

  const resolverAuth =  zodResolver(
      // todo: тестовый вариант
      z.object({
        login: z.string().min(1, { message: 'Укажите логин' }),
        password: z.string().min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
      })
  );

  function onAuth() {
    localStorage.setItem('isLogin', 'true');
    isLogin.value = true;
    goToNewProduct()
  }
</script>