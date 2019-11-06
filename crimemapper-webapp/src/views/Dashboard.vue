<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">OB Book</h1>
        <v-card>
            <v-card-title>
            OB Book
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

              <template v-slot:top>
                   <v-dialog
                      v-model="dialog"
                      fullscreen
                      hide-overlay
                      transition="dialog-bottom-transition"
                      scrollable>
                      <v-card tile>
                        <v-toolbar
                          flat
                          dark
                          color="primary">
                          <v-btn
                            icon
                            dark
                            @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title>Details</v-toolbar-title>
                          <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-card-text>
                     
                             <v-row>
                                <v-col cols="6" sm="4" md="4"> 
                                  <v-subheader>Complainant</v-subheader>
                                    <v-text-field readonly v-model="editedItem.subject" label="First Name"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.subject" label="Last Name"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="NRC"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="Age"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="Residential Address"></v-text-field>
                                </v-col>
                                <v-col cols="6" sm="4" md="4">   
                                  <v-btn
                                    color="primary"
                                    dark
                                    class="ma-2"
                                    @click="dialog2 = !dialog2">Add Defendant</v-btn>
                                   <v-subheader>Defendant</v-subheader>
                                    <v-text-field readonly v-model="editedItem.subject" label="First Name"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.subject" label="Last Name"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="NRC"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="Age"></v-text-field>
                                    <v-text-field readonly v-model="editedItem.particularOfOffence" label="Residential Address"></v-text-field>
                                </v-col>
                              
                                 <v-col cols="6" sm="4" md="4">     
                                  <v-btn
                                    color="primary"
                                    dark
                                    class="ma-2"
                                    @click="dialog2 = !dialog2">Add Item</v-btn>
                                   <v-subheader>Recovered Items</v-subheader>
                                    <v-data-table
                                      :headers="recovered"
                                      :items="occurences"
                                      :items-per-page="5"
                                      :search="search"
                                      class="elevation-1"> </v-data-table>
                                </v-col>
                              </v-row>
                        </v-card-text>
              
                        <div style="flex: 1 1 auto;"></div>
                      </v-card>
                    </v-dialog>
              </template> 

                <template v-slot:top>
                   <v-dialog v-model="dialog" max-width="500px">
                      <v-card tile>
                            <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="firstName" :rules="nameRules" label="First Name" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="lastName" :rules="nameRules" label="Last Name" required></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="nrc" :rules="nameRules" label="NRC" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="residence" :rules="nameRules" label="Residence" required></v-text-field>
                            </v-col>
                          </v-row>
                      </v-card>
                    </v-dialog>
              </template> 
              
  
            <template v-slot:item.action="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)">edit</v-icon>
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)">add</v-icon>
            </template>  
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
         dialog: false,
         headers: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Particulars of Offence', value: 'particularOfOffence' },
          { text: 'Location', value: 'place' },
          { text: 'Date of Occurence', value: 'date' },
          { text: 'Suspect', value: 'defendant' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
         recovered: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Date of Occurence', value: 'date' },
          { text: 'Actions', value: 'action', sortable: false },
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
