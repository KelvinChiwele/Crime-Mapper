<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">Crime Resgister</h1>
        <v-card>

            <v-card-title>
            Crime Resgister
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>


            <v-data-table
              :headers="headers"
              :items="occurences"
              :items-per-page="5"
              :search="search"
              class="elevation-1">      
            </v-data-table>
        </v-card>

    </v-container>
   
  </div>
</template>

<script>
  import db from '@/firebase/fb'

  export default {
    data: () => ({
        occurences: [],
        search: '',
         headers: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Particulars of Offence', value: 'particularOfOffence' },
          { text: 'Date of Occurence', value: 'date' },
          { text: 'Date of Result', value: 'date' },
          { text: 'Status', value: 'status'},
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
