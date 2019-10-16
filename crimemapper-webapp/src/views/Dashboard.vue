<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">Dashboard</h1>
      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
          <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By subject</span>
          </v-btn>
          </template>
          <span>Sort by project name</span>
        </v-tooltip>
        <v-tooltip top>
           <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon small left>person</v-icon>
              <span class="caption text-lowercase">By Person</span>
            </v-btn>
          </template>
          <span>Sort by project author</span>
        </v-tooltip>
      </v-layout>

      <v-data-table
        :headers="headers"
        :items="occurences"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-container>
   
  </div>
</template>

<script>
  import db from '@/firebase/fb'

  export default {
    data() {
      return {
        occurences: [],
         headers: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Particulars of Offence', value: 'particularOfOffence' },
          { text: 'Time', value: 'time' },
        ],
      }
    },
 
    created() {
      db.collection('occurences').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === 'added') {
            this.occurences.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }  
        })
      })
    }
  }
</script>

<style>

.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid #ffaa2c;
}
.project.overdue{
  border-left: 4px solid #f83e70;
}
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}

</style>
