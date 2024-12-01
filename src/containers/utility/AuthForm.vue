<template>
  <Form v-slot="$form" :initial-values="initialValues" :resolver="resolver" @submit="onSubmit" class="flex flex-column gap-2 w-full sm:w-56">
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <InputText type="text" name="login" fluid />
        <label class="text-xs" for="login">Логин</label>
      </FloatLabel>
      <Message v-if="$form.login?.invalid" severity="error" size="small" variant="simple">{{ $form.login.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <Password  name="password" fluid :feedback="false" toggleMask />
        <label for="password" class="text-xs">Пароль</label>
      </FloatLabel>
      <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
    </div>
    <div class="flex flex-column mt-4">
      <Button type="submit" label="Submit" />
    </div>
  </Form>
</template>

<script setup>
  import { Form } from "@primevue/forms";
  import InputText from "primevue/inputtext";
  import Password from 'primevue/password';
  import Message from "primevue/message";
  import Button from "primevue/button";
  import FloatLabel from "primevue/floatlabel";

  import {defineProps, defineEmits, computed, ref} from 'vue';

  defineProps({
    resolver: Object,
    initialValues: Object,
    onSubmit: Function
  });

  const emit = defineEmits(['addProduct']);

  const onSubmit = ($form) => {
    if ($form.valid) {
      emit('onLogin');
    }
  };
</script>

<style>
  textarea[name="address"] {
    width: 100%;
    box-sizing: border-box;
  }
</style>