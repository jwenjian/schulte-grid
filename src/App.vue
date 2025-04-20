<template>
  <div id="app">
    <h3>QWERTY 键盘布局 + 字母记忆游戏</h3>
    <h5>从 A 到 Z 依次按下字母即可</h5>
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
