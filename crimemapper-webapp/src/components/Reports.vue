<template>
   <v-container class="grey lighten-5">
     <v-row>
      <v-col
        cols="8">
        <v-card
          class="pa-2"
          outlined
          tile>
          <BarChart/> 
        </v-card>
      </v-col>

    <!-- 
       <v-col
        :key="n"
        cols="8">
        <v-card
          class="pa-2"
          outlined
          tile>
          <LineChart/> 
        </v-card>
      </v-col> -->

      <v-col
        cols="4">
        <v-card
          class="pa-2"
          outlined
          tile>
          <PieChart/>
        </v-card>
      </v-col>
      <!--
      <v-col
        :key="n"
        cols="4">
        <v-card
          class="pa-2"
          outlined
          tile>
          <BarChart/> 
        </v-card>
      </v-col>-->

    </v-row>

    <v-row>
      <v-col
          cols="12">
          <v-card
            class="pa-2"
            outlined
            tile>
            <LineChart/> 
          </v-card>
        </v-col> 
      </v-row>

  </v-container>
</template>

<script>


import PieChart from './PieChart'
import BarChart from './BarChart'
import LineChart from './LineChart'

export default {
  name: "Reports",
  components: {
    BarChart,
    LineChart,
    PieChart
  },
  
   computed: {
      cols () {
        const { lg, sm } = this.$vuetify.breakpoint
        return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
      },
    },
};
</script>

<style>

</style>
