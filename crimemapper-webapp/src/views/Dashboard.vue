<template>
  <div class="dashboard">
    <v-container class="my-5 ">
      <h1 class="subheading grey--text">Occurence Book</h1>
        <v-card>
            <v-card-title>
            Occurence Book
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
                      transition="dialog-bottom-transition">
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
                                      <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field readonly v-model="firstName" label="First Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field readonly v-model="lastName" label="Last Name"></v-text-field>
                                        </v-col>
                                      </v-row>
                                      <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field readonly v-model="nrc" label="NRC"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                          <v-text-field readonly v-model="age" label="Age"></v-text-field>
                                          </v-col>                                                     
                                      </v-row>
                                      <v-text-field readonly v-model="residence" label="Residential Address"></v-text-field>                                                 
                                </v-col>

                                <v-col cols="6" sm="4" md="4">   
                                  <v-btn
                                    color="primary"
                                    dark
                                    class="ma-2"
                                    @click="modalAddSuspect = true">Add Suspect</v-btn>      
                                   <v-subheader>Suspects</v-subheader>
                                     <v-data-table
                                      :headers="suspects"
                                      :items="defendant"
                                      :items-per-page="5"
                                      :search="search"
                                      class="elevation-1"> </v-data-table>
                                </v-col>

                                <v-dialog
                                  v-model="modalAddSuspect"
                                  max-width="500px">
                                  <v-card>
                                    <v-card-title>
                                              <span class="headline">Add Suspect</span>
                                            </v-card-title>
                                            <v-card-text>
                                              <v-form ref="form" v-model="valid" lazy-validation>
                                              <v-container>
                                                <v-row>
                                                  <v-row>
                                                    <v-col cols="12" sm="6" md="6">
                                                      <v-text-field v-model="firstName" :rules="firstNameRules" label="First Name"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                      <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name"></v-text-field>
                                                    </v-col>
                                                  </v-row>
                                                  <v-row>
                                                    <v-col cols="12" sm="6" md="6">
                                                      <v-text-field v-model="nrc" :rules="nrcRules" label="NRC"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                      <v-text-field v-model="age" :rules="ageRules" label="Age"></v-text-field>
                                                     </v-col>                                                     
                                                  </v-row>
                                                    <v-text-field v-model="residence" label="Residential Address"></v-text-field>                                                 
                                               </v-row>
                                              </v-container>
                                              <small>*indicates required field</small>
                                              </v-form>
                                            </v-card-text>
                                    <v-card-actions>
                                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveSuspect">Save</v-btn>
                                        <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>

                                                             
                                 <v-col cols="6" sm="4" md="4">     
                                  <v-btn
                                    color="primary"
                                    dark
                                    class="ma-2"
                                    @click="modalAddVariable = true">Add Item</v-btn>
                                   <v-subheader>Recovered Items</v-subheader>
                                    <v-data-table
                                      :headers="recovered"
                                      :items="recovered"
                                      :items-per-page="5"
                                      :search="search"
                                      class="elevation-1"> </v-data-table>
                                </v-col>
                              </v-row>

                              
                                <v-dialog
                                  v-model="modalAddVariable"
                                  max-width="300px">
                                  <v-card>
                                    <v-card-title>
                                              <span class="headline">Add Recovered Item</span>
                                            </v-card-title>
                                            <v-card-text>
                                              <v-form ref="form" v-model="valid" lazy-validation>
                                              <v-container>
                                                <v-row>
                                                    <v-text-field  v-model="variable" label="Variable recovered"></v-text-field>
                                                    <v-text-field  v-model="description" label="Description"></v-text-field>
                                                     <v-menu
                                                        v-model="menu2"
                                                        :close-on-content-click="false"
                                                        :nudge-right="40"
                                                        transition="scale-transition"
                                                        offset-y
                                                        full-width
                                                        min-width="290px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field
                                                                v-model="date"
                                                                label="Date of Occurence"
                                                                prepend-icon="event"
                                                                readonly
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                                                    </v-menu>                                               
                                               </v-row>
                                              </v-container>
                                              </v-form>
                                            </v-card-text>
                                    <v-card-actions>
                                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="saveVariable">Save</v-btn>
                                        <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                        </v-card-text>              
                        <div style="flex: 1 1 auto;"></div>
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
        valid: true,
        name:"",
        firstName: "",
        firstNameRules: [
          v => !!v || "First Name is required"
        ],
        lastName: "",
        lastNameRules: [
          v => !!v || "Last Name is required"
        ],
        nrc: "",
        nrcRules: [
          v => !!v || "NRC is required"
        ],
        age: "",       
        ageRules: [
          v => !!v || "Age is required"
        ],
        residence: "",

        menu2: false,
        variable: "",
        description: "",
        date: new Date().toISOString().substr(0, 10),

        occurences: [],
        recovered: [],
        defendant: [],
         search: '',
         dialog: false,
         dialog2: false,
         modalAddSuspect: false,
         modalAddVariable: false,
         complainant: false,
         headers: [
          { text: 'Subject', 
            value: 'subject',    
            align: 'left',
            sortable: true,},
          { text: 'Particulars of Offence', value: 'particularOfOffence' },
          { text: 'Location', value: 'place' },
          { text: 'Date of Occurence', value: 'date' },
          { text: 'Station', value: 'station' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
         recovered: [
          { text: 'Item', 
            value: 'item',    
            align: 'left',
            sortable: true,},
          { text: 'Date Recovered', value: 'date' },
        ],
         suspects: [
          { text: 'First Name', 
            value: 'firstName',    
            align: 'left',
            sortable: true,},
          { text: 'Last Name', value: 'lastName' },
          
        ],
        firstName: "",
        lastName: "",
        age: "",
         nrc: "",
        residence: "",
        
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

       db.collection('recovered').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            this.recovered.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }  
        })
      })

         db.collection('suspects').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            this.defendant.push({
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

      saveSuspect () {
        if (this.$refs.form.validate()) {
            db.collection("suspects").add({
                firstName: this.firstName,
                lastName: this.lastName,
                nrc: this.nrc,
                age: this.age,
                residence: this.residence,
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            }).catch(function(error) {
                console.error("Error adding document: ", error);
            });    
        } else {
          this.feedback = "This service number can not be empty";
        }
        this.close()
      },

      saveVariable () {
       if (this.$refs.form.validate()) {
            db.collection("recoveredItem").add({
                variable: this.variable,
                description: this.description,
                date: this.date,
            }).then(function(docRef) {
              
            }).catch(function(error) {
                
            });    
        } else {
          this.feedback = "This service number can not be empty";
        }
        this.close()
      },
    reset() {
      this.$refs.form.reset();
    },
    },
  }
</script>

<style>

</style>
