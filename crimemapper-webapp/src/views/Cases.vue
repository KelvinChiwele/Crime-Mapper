<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">Cases Pending Review</h1>
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
      >

      <template v-slot:top>
      <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                    <v-text-field readonly v-model="editedItem.subject" label="Dessert name"></v-text-field>
                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="Calories"></v-text-field>
                    <v-text-field readonly v-model="editedItem.date" label="Fat (g)"></v-text-field>
                    <v-select
                      v-model="investigator"
                      :items="investigators"
                      item-text="name"
                      item-value="id"
                      :rules="[v => !!v || 'Assign investigator to approve']"
                      label="Investigator"
                      required></v-select>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Approve</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)">visibility</v-icon>
    </template>
      
      </v-data-table>

    </v-container>
   
  </div>
</template>

<script>
  import db from '@/firebase/fb'

  export default {
    data: () => ({
        dialog: false,
        occurences: [],
        investigators: [],
         headers: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Particulars of Offence', value: 'particularOfOffence' },
          { text: 'Date of Occurence', value: 'date' },
          { text: 'Status', value: 'dat' },
          { text: 'Action', value: 'action', sortable: false },
        ],
        investigator: "",
        editedIndex: -1,
        editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
 
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

      db.collection('officers').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            this.investigators.push({
              name: change.doc.data().firstName,
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

      methods: {
  
      editItem (item) {
        this.editedIndex = this.occurences.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.occurences[this.editedIndex], this.editedItem)
            db.collection("crimes").add({
                subject: this.editedItem.subject,
                icon: this.editedItem.subject,
                place: this.editedItem.place,
                date: this.editedItem.date,
                latitude: this.editedItem.latitude,
                longitude: this.editedItem.longitude,
                investigator: this.investigator,
                status:"Approved",
                particularOfOffence: this.editedItem.particularOfOffence,
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                this.$router.push({name: 'Dashboard'})
            }).catch(function(error) {
                console.error("Error adding document: ", error);
            });    
        } else {
          this.feedback = "This service number can not be empty";
        }
        this.close()
      },
    },
    
  }
</script>

<style>

</style>
