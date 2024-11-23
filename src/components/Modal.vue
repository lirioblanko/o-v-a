<template>
  <Dialog v-model:visible="visible" modal :header="header" :style="{ width: '25rem' }">
    <slot name="form"></slot>
  </Dialog>
</template>

<script setup>
  import Dialog from "primevue/dialog";
</script>