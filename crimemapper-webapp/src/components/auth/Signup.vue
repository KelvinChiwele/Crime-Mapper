<template>
 <v-card max-width="600" class="mx-auto mt-4 pa-4">
   <v-card-title>Register an Officer</v-card-title>
    <v-card-text>
      <v-form  ref="form" v-model="valid" lazy-validation>
         <v-text-field v-model="serviceNumber" label="serviceNumber" required></v-text-field>
        <v-text-field v-model="firstName" :counter="10" :rules="nameRules" label="firstName" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
         <v-text-field v-model="passWord" label="Password" required></v-text-field>
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required></v-select>
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Register</v-btn>
          <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
      </v-form>
      </v-card-text>
  </v-card>
  
</template>

<script>
import db from "@/firebase/fb";
import firebase from 'firebase';
require('firebase/auth')
export default {
  data: () => ({
    valid: true,
    serviceNumber: null,
    passWord: null,
    firstName: null,
    lastName: null,
    division: null,
    district: null,
    post: null,
    role: null,
    rank: null,
    phoneNumber: null,
    feedback: null,
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,

  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
         if (this.serviceNumber) {
          let ref = db.collection("officers").doc(this.serviceNumber);
          ref.get().then(doc => {
            if (doc.exits) {
              this.feedback =
                "Officer already registered with this service number";
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.passWord)
              .then(cred =>{
                ref.set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  division: this.division,
                  district: this.district,
                  post: this.post,
                  role: this.role,
                  rank: this.rank,
                  phoneNumber: this.phoneNumber,
                  userId: cred.uid
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
        
      } else {
        //console.log("Pass")
      }
    },
    reset() {
      this.$refs.form.reset();
    },

    signup() {
      if (this.serviceNumber) {
        let ref = db.collection("officers").doc(this.serviceNumber);
        ref.get().then(doc => {
          if (doc.exits) {
            this.feedback =
              "Officer already registered with this service number";
          } else {
            firebase.auth
              .createUserWithEmailAndPassword(this.email, this.password)
              .catch(err => {
                //console.log(err)
                this.feedback = err.message;
              });
          }
        });
      } else {
        this.feedback = "This service number can not be empty";
      }
    }
  }
};
</script>
