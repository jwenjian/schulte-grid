<template>
  <div id="app">
    <schulte-grid></schulte-grid>
  </div>
</template>

<script>
import SchulteGrid from './components/SchulteGrid'

export default {
  name: 'app',
  components: {
    SchulteGrid
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
