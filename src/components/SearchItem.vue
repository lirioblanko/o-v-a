<template>
      <IconField class="flex">
        <InputIcon class="pi pi-search" />
        <InputText
            placeholder="Поиск товара"
            v-model="searchText"
            @keyup.enter="handleSearch"
        />
      </IconField>
</template>

<script setup>
  import {ref} from "vue";
  import InputIcon from "primevue/inputicon";
  import IconField from "primevue/iconfield";
  import InputText from "primevue/inputtext";

  const emit = defineEmits(['search']);
  const searchText = ref('')

  function handleSearch(text) {
    emit('search-products', searchText)
    searchText.value = ''
  }
</script>

<style scoped>

</style>