<template>
  <div id="app">
    <BarChart/>
    <LineChart/>
  </div>
</template>

<script>


import BarChart from './BarChart'
import LineChart from './LineChart'

export default {
  name: "App",
  components: {
    BarChart,
    LineChart
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      }
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
