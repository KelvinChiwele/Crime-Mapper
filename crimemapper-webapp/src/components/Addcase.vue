<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on">Add new case</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add Case</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
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
            <v-select
              v-model="subject"
              :items="items"
              :rules="[v => !!v || 'Subject is required']"
              label="SUBJECT"
              required></v-select>
            <v-text-field v-model="place" label="Place of Occurence" required></v-text-field>
            <v-textarea label="Particulars of Offense" v-model="particularOfOffence"></v-textarea>
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
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
           
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
       <!--   <v-btn right class="success mx-0 mt-3 mr-4" @click="dialog = false">Add Case</v-btn>
          <v-btn class="danger mx-0 mt-3 mr-3" @click="dialog = false">Cancel</v-btn>-->
            <v-btn right class="success mx-0 mt-3 mr-4" @click="validate">Add Case</v-btn>

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
      name: 'Addcase',
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu2: false,
        feedback: null,
        dialog: false,
        firstName: "",
        lastName: "",
        nameRules: [
          v => !!v || "Name is required",
         // v => (v && v.length < 1) || "Name must be less than 1 character long"
        ],
        nrc: "",
        residence: "",
        subject: "",
        occurence: "",
        particularOfOffence: "",
        place: "",
        items: ["== SELECT  SUBJECT ==","assault", "burglary", "drugs", "robbery"],
    }),
    methods: {
      validate() {
        if (this.$refs.form.validate()) {
            db.collection("occurences").add({
                subject: this.subject,
                icon: this.subject,
                place: this.place,
                date: this.date,
                latitude: window.lat,
                longitude: window.lng,
                particularOfOffence: this.particularOfOffence,
                status:"Pending",
            })
            .then(function(docRef) {
                db.collection("occurences").doc(docRef.id).update({occurenceId: docRef.id})
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
