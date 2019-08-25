<template>
 <v-card max-width="500" class="mx-auto mt-4 mb-4 pa-4">
   <v-card-title>Officer Registration</v-card-title>
    <v-card-text>
      <v-form  ref="form" v-model="valid" lazy-validation>
         <v-text-field v-model="serviceNumber" :rules="serviceNumberRules" label="Service Number" required></v-text-field>
        <v-text-field v-model="firstName" :rules="nameRules" label="First Name" required></v-text-field>
        <v-text-field v-model="lastName" :rules="nameRules" label="Last Name" required></v-text-field>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
         <v-text-field v-model="passWord" :rules="nameRules" label="Password" required></v-text-field>
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Division is required']"
          label="--Select Division--"
          required></v-select>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'District is required']"
          label="--Select District--"
          required></v-select>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Post is required']"
          label="--Select Post--"
          required></v-select>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Role is required']"
          label="--Select Role--"
          required></v-select>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Rank is required']"
          label="--Select Rank--"
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
    serviceNumberRules: [
      v => !!v || "Service Number is required",
      v => (v && v.length <= 10) || "Service Number must be less than 10 characters"
    ],
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
              this.feedback ="Officer already registered with this service number";
            } else {
              firebase.auth().createUserWithEmailAndPassword(this.email, this.passWord)
              .then(user =>{
                ref.set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  division: this.division,
                  district: this.district,
                  post: this.post,
                  role: this.role,
                  rank: this.rank,
                  phoneNumber: this.phoneNumber,
                  userId: user.uid
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
            this.feedback = "Officer already registered with this service number";
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
