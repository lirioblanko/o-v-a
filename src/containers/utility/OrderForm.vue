<template>
  <Form v-slot="$form" :initial-values="initialValues" :resolver="resolver" @submit="onSubmit" class="flex flex-column gap-2 w-full sm:w-56">
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <InputText type="text" name="name" fluid />
        <label class="text-xs" for="name">Ваше имя*</label>
      </FloatLabel>
      <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{ $form.name.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <Textarea name="address" rows="2" style="resize: none" />
        <label class="text-xs" for="address">Ваш адрес</label>
      </FloatLabel>
      <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <InputMask name="phone" mask="(999) 999-9999"  fluid />
        <label for="phone" class="text-xs">Ваш телефон</label>
      </FloatLabel>
      <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error?.message }}</Message>
    </div>
    <div class="flex flex-column">
      <FloatLabel variant="in">
        <DatePicker v-model="icondisplay" :maxDate="maxDate" name="birthday" showIcon fluid iconDisplay="input" />
        <label class="text-xs" for="birthday">Ваша дата рождения</label>
      </FloatLabel>
      <Message v-if="$form.birthday?.invalid" severity="error" size="small" variant="simple">{{ $form.birthday.error?.message }}</Message>
    </div>
    <div class="flex flex-row gap-2">
      <Checkbox name="agree" binary />
      <label class="text-md" for="agree">Принимаю условия*</label>
    </div>
    <p class="text-xs" style="margin: 0">* - обязательные поля</p>
    <div class="flex flex-column mt-2">
      <Button type="submit" label="Заказать" />
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
import DatePicker from 'primevue/datepicker';
import Checkbox from 'primevue/checkbox';
import InputMask from 'primevue/inputmask';

import {defineProps, defineEmits, computed, ref} from 'vue';

defineProps({
  resolver: Object,
  categories: Array,
  initialValues: Object,
});

const today = new Date();
const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
const maxDate = ref(eighteenYearsAgo);

const emit = defineEmits(['addProduct']);

const onSubmit = ($form) => {
  if ($form.valid) {
    emit('addOrder', {
      values: $form.values,
    });
  }
};
</script>

<style>
textarea[name="address"] {
  width: 100%;
  box-sizing: border-box;
}
</style>