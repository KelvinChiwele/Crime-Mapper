<template>
 <v-card max-width="520" color="green lighten-2" class="mx-auto mt-4 mb-4 pa-4">
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
            <v-text-field v-model="phoneNumber" :rules="serviceNumberRules" label="Phone Number" required></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="serviceNumber" :rules="serviceNumberRules" label="Service Number" required></v-text-field>
          </v-col>
        </v-row>

         <v-row>   
          <v-col cols="12" sm="6" md="6">
             <v-select
                v-model="station"
                :items="stations"
                 item-text="text"
                 item-value="value"
                :rules="[v => !!v || 'Stations is required']"
                label="--Select Station--"
                required></v-select>
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
         <v-text-field v-model="passWord" 
              :rules="passWordRules" 
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'passWord'"
              label="Password" required
              @click:append="showPassword = !showPassword"></v-text-field>
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="signup">Register</v-btn>
          <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
           <v-btn text>
            <span class="mr-2">OR</span>
          </v-btn>
          <v-btn @click="redirectToLogin()">
            <span class="mr-2">Login</span>
          </v-btn>
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
    showPassword: false,
    valid: true,
    serviceNumber: null,
    passWord: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    district: "Lusaka",
    division: "Lusaka",
    position: null,
    department: null,
    station: null,
    rank: null,
    feedback: null,

    stations: [],

    phoneNumberRules: [
      v => !!v || "Phobe Number is required",
      v => (v && v.trim().length > 10) || "Name must be atleast 10 character long"
    ],

    passWordRules: [
      v => !!v || "Password is required",
      v => (v && v.trim().length > 8) || "Name must be atleast 8 characters long"
    ],
    serviceNumberRules: [
      v => !!v || "Service Number is required",
      v => (v && v.trim().length > 4) || "Name must be atleast 5 characters long"
    ],
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.trim().length > 1) || "Name must be atleast 1 character long"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

   // stations: ["Chawama", "Chelstone", "Chilenje", "Emmasdale", "Kabwata" , "Kanyama", "Lusaka Central", "Matero", "Woodlands"],

    departments: ["Criminal Investigations", "General Duties", "Traffic"],

    ranks: ["IG", "DIG-1", "DIG-2", "COMPOL", "SACP" , "ACP", "S/SUPT", "SUPT", "C/INSP", "INSP", "SGT", "CONST"],

    positions: ["CIO", "Investigator", "Records Officer", "Secretary"],
  }),

  created() {
    db.collection("stations")
      .get()
      .then(crimes => {        
        crimes.docs.forEach(doc => {
          let elem = doc.data();
          var infowindow;            
          var lastWindow = null;
          this.stations.push({
            value: elem.station,
            text: elem.station
          });
        });
    }); 
  },

  methods: {
    signup() {
      if (this.$refs.form.validate()) {
            db.collection("officers").where('serviceNumber', '==', this.serviceNumber)
            .get().then(doc => {
                  if (doc.empty) {                  
                    firebase.auth().createUserWithEmailAndPassword(this.email.trim(), this.passWord)
                    .then(cred =>{
                      db.collection("officers").doc(cred.user.uid).set({
                        firstName: this.firstName.trim(),
                        lastName: this.lastName.trim(),
                        serviceNumber: this.serviceNumber.trim(),
                        division: this.division.trim(),
                        district: this.district.trim(),
                        department: this.department.trim(),
                        position: this.position,
                        rank: this.rank.trim(),
                        userId: cred.user.uid
                      })
                    }).then(() =>{
                      this.$router.push({name: 'Login'})
                    }).catch(err => {
                        this.feedback = err.message;
                    });
                } else{
                     this.feedback ="Officer already registered with this service number";
                } 
         });  
      }//End validate
    },
    reset() {
      this.$refs.form.reset();
    },

    redirectToLogin(){
       this.$router.push({name: 'Login'})
    },
  }
};
</script>
