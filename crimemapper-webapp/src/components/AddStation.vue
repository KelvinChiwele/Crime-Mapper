<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on">Add new station</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add Station</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row>
                <v-text-field v-model="station" :rules="nameRules" label="Station" required></v-text-field>                
            </v-row>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>           
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
       <!--   <v-btn right class="success mx-0 mt-3 mr-4" @click="dialog = false">Add Case</v-btn>
          <v-btn class="danger mx-0 mt-3 mr-3" @click="dialog = false">Cancel</v-btn>-->
            <v-btn right class="success mx-0 mt-3 mr-4" @click="validate">Add Station</v-btn>

            <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "@/firebase/fb";
import firebase from 'firebase';
require('firebase/auth')
    export default {
      name: 'AddStation',
    data: () => ({
        menu2: false,
        feedback: null,
        dialog: false,
        station: "",
        nameRules: [
          v => !!v || "Name is required",
          v => (v && v.length <= 10) || "Name must be less than 10 characters"
        ],
    }),
    methods: {
      validate() {
        if (this.$refs.form.validate()) {
            db.collection("stations").add({
                station: this.station,
                latitude: window.lat,
                longitude: window.lng
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                this.dialog = false
                //this.$router.push({name: 'Dashboard'})
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });    
        } else {
          this.feedback = "This service number can not be empty";
        }
      },
      reset() {
        this.$refs.form.reset();
      },
    }
}
</script>
