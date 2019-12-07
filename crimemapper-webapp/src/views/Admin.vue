<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">Cases Pending Review</h1>      
        <v-card>
            <v-card-title>
              Officers
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
              :items="officers"
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
        dialog: false,
        officers: [],
        search: '',
        occurenceId: '',
         headers: [
          { text: 'Service Number',  value: 'serviceNumber', align: 'left',  sortable: true},
          { text: 'First Name',  value: 'firstName', align: 'left',  sortable: true},
          { text: 'Last Name', value: 'lastName' },
          { text: 'Department', value: 'department' },
          { text: 'Rank', value: 'rank' },
          { text: 'Position', value: 'position' },
          { text: 'District', value: 'district' },
          { text: 'Division', value: 'division' }
        ],
        investigator: "",
        editedIndex: -1,
        editedItem: {
        name: '',
      },
    }),
 
    created() {
      db.collection('officers').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            this.officers.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }  
        })
      })
    },
    
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Case Details'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },    
  }
</script>

<style>

</style>
