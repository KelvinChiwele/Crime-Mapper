<template>
 <v-card max-width="500" color="green lighten-2" class="mx-auto mt-4 mb-4 pa-4">
   <v-card-title>Officer Registration</v-card-title>
    <v-card-text>
      <v-form  ref="form" v-model="valid" lazy-validation>
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
            <v-text-field v-model="serviceNumber" :rules="serviceNumberRules" label="Service Number" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
             <v-select
                v-model="department"
                :items="departments"
                :rules="[v => !!v || 'Departments is required']"
                label="--Select Department--"
                required></v-select>
           </v-col>
        </v-row>
       
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="rank"
              :items="ranks"
              :rules="[v => !!v || 'Ranks is required']"
              label="--Select Rank--"
              required></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="position"
              :items="positions"
              :rules="[v => !!v || 'Position is required']"
              label="--Select Position--"
              required></v-select>
          </v-col>
        </v-row>  
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
         <v-text-field v-model="passWord" :rules="nameRules" label="Password" required></v-text-field>
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
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
    district: "Lusaka",
    division: "Lusaka",
    position: null,
    department: null,
    rank: null,
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
    stations: ["Chawama", "Chelstone", "Chilenje", "Emmasdale", "Kabwata" , "Kanyama", "Lusaka Central", "Matero", "Woodlands"],
    departments: ["Criminal Investigations", "General Duties", "Traffic"],
    ranks: ["IG", "DIG-1", "DIG-2", "COMPOL", "SACP" , "ACP", "S/SUPT", "SUPT", "C/INSP", "INSP", "SGT", "CONST"],
    positions: ["CIO", "Investigator", "Records Officer", "Secretary"],
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
                  department: this.department,
                  position: this.position,
                  rank: this.rank,
                 // userId: user.uid
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
