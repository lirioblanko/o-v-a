<template>
  <Header />
  <main class="container">
    <slot name="default"></slot>
  </main>
  <Footer />
</template>

<script>
import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  components: {Footer, Header}
})
</script>

<style scoped>
.container {
  width: 100%;
}
</style>