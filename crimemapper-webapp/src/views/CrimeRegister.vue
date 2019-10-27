<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">Crime Resgister</h1>
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
        class="elevation-1">      
      </v-data-table>

    </v-container>
   
  </div>
</template>

<script>
  import db from '@/firebase/fb'

  export default {
    data: () => ({
        occurences: [],
         headers: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Particulars of Offence', value: 'particularOfOffence' },
          { text: 'Date of Occurence', value: 'date' },
          { text: 'Date of Result', value: 'date' },
          { text: 'Status', value: 'action'},
        ],
    }),
 
    created() {
      db.collection('crimes').onSnapshot(res => {
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

</style>
