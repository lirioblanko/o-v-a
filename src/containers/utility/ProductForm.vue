<template>
  <Form v-slot="$form" :initial-values="initialValues" :resolver="resolver" @submit="onSubmit" class="flex flex-column gap-2 w-full sm:w-56">
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <InputText type="text" name="title" fluid />
        <label for="title" class="text-xs">Название товара*</label>
      </FloatLabel>
      <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <InputText name="image" type="text" fluid />
        <label for="title" class="text-xs">Изображение*</label>
      </FloatLabel>
      <Message v-if="$form.image?.invalid" severity="error" size="small" variant="simple">{{ $form.image.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <Select name="category" inputId="category" :options="categories" optionLabel="name" class="w-full" variant="filled" />
        <label for="category" class="text-xs">Категория товара*</label>
      </FloatLabel>
      <Message v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{ $form.category.error.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <Textarea name="description" rows="4" style="resize: none" />
        <label for="description" class="text-xs">Описание товара</label>
      </FloatLabel>
      <Message v-if="$form.description?.invalid" severity="error" size="small" variant="simple">{{ $form.description.error?.message }}</Message>
    </div>
    <p class="text-xs" style="margin: 0">* - обязательные поля</p>
    <div class="flex flex-column mt-2">
      <Button type="submit" severity="secondary" label="Submit" />
    </div>
  </Form>
</template>

<script setup>
import { Form } from "@primevue/forms";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Message from "primevue/message";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";

import { defineProps, defineEmits } from 'vue';

defineProps({
  resolver: Object,
  categories: Array,
  initialValues: Object,
});

const emit = defineEmits(['addProduct']);

const onSubmit = ($form) => {
  if ($form.valid) {
    emit('addProduct', {
      values: $form.values,
    });
  }
};
</script>

<style>
textarea[name="description"] {
  width: 100%;
  box-sizing: border-box;
}
</style>