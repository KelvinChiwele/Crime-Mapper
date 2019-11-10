<template>
 <v-card max-width="500" color="green lighten-2" class="mx-auto mt-4 pa-4">
   <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form  ref="form" v-model="valid" lazy-validation>
         <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
         <v-text-field v-model="passWord" :rules="passWordRules" label="Password" required></v-text-field>
        <p class="red-text center" v-if="feedback">{{feedback}}</p>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>
        <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
      </v-form>
      </v-card-text>
  </v-card>
  
</template>

<script>
import firebase from 'firebase';
require('firebase/auth')
export default {
  data: () => ({
    valid: true,
    passWord: null,
    feedback: null,
    passWordRules: [
      v => !!v || "Password is required"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.passWord)
          .then(cred =>{
             this.$router.push({name: 'Dashboard'})
          }).catch(err => {
              // console.log(err)
              this.feedback = err.message;
            });
      } else {
        //console.log("Pass")
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  }
};
</script>
