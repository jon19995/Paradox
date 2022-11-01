<template>
    <document-list />
    <!-- <input type="text" /> -->
</template>

<script>
import DocumentList from './pages/DocumentList.vue'

export default {
  name: 'App',

  components: {
    DocumentList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-grey);
  margin-top: 60px;
}
</style>
