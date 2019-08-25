<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">Add new case</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add Case</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Subject" v-model="title"></v-text-field>
            <v-textarea label="Particulars of Offense" v-model="title"></v-textarea>
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn right class="success mx-0 mt-3 mr-4" @click="dialog = false">Add Case</v-btn>
          <v-btn class="danger mx-0 mt-3 mr-3" @click="dialog = false">Cancel</v-btn>
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
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        menu2: false,
        dialog: false,
        subject: "",
        occurence: "",
        due: "",
    }),
     validate() {
      if (this.$refs.form.validate()) {
          let ref = db.collection("occurences").doc(this.serviceNumber);
          ref.get().then(doc => {
            if (doc.exits) {
              this.feedback =
                "Officer already registered with this service number";
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.passWord)
              .then(cred =>{
                ref.set({
                  subject: this.subject,
                  occurence: this.occurence,
                  obNumber: this.obNumber,
                  timeStamp: this.timeStamp,
                  particularOfOffence: this.particularOfOffence,
                  complainantId: this.complainantId,
                  accusedId: this.accusedId,
                  reportingOfficer: this.reportingOfficer,
                })
              }).then(() =>{
                this.$router.push({name: 'Dashboard'})
              }).catch(err => {
                 // console.log(err)
                  this.feedback = err.message;
                });
            }
          });
        } else {
          this.feedback = "This service number can not be empty";
        }
    },
}
</script>
