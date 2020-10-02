<template :style="myStyle" id="wrapper">
  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainWindow from './components/MainWindow.vue';


@Options({
  components: {
    MainWindow,
  },
})

export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100%;
}
html, body {
  height: 100%;
  margin: 0;
}

#wrapper {
  height: 100%;
}

</style>
