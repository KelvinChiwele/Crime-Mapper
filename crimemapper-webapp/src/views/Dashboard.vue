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
      
      <v-card text v-for="occurence in occurences" :key="occurence.subject">
        <v-layout row wrap :class="`pa-2 project ${occurence.status}`">
          <v-flex xs12 md6  class="pl-2">
            <div class="caption grey--text">Subject</div>
            <div>{{ occurence.subject }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Particulars of Offence</div>
            <div>{{ occurence.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Time</div>
            <div>{{ occurence.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${occurence.status} white--text my-2 caption`">{{ occurence.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>
  import db from '@/firebase/fb'

  export default {
    data() {
      return {
        occurences: []
      }
    },
    methods: {
      sortBy(prop) {
        this.occurences.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
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
