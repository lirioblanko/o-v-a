<template>
      <IconField class="flex">
        <InputIcon class="pi pi-search" />
        <InputText
            placeholder="Поиск товара"
            v-model="searchText"
            @keyup.enter="() => {$emit('search', searchText); searchText = ''}"
        />
      </IconField>
</template>

<script setup>
  import {ref} from "vue";
  import InputIcon from "primevue/inputicon";
  import IconField from "primevue/iconfield";
  import InputText from "primevue/inputtext";

  const searchText = ref('')
</script>

<style scoped>

</style>