<template>
<nav>
    <v-app-bar app>
      <v-app-bar-nav-icon v-if="user" class="grey--text" @click="drawer =!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="red--text">Crime</span>
        <span class="font-weight-light">Mapper</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
         <v-flex v-if="user" class="mt-4 mb-3">
            <AddStation/>
         </v-flex>

      <v-btn v-if="user" text @click="logout()">
        <span class="mr-2">Log Out</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    
    <v-navigation-drawer v-if="user" v-model="drawer" app class="indigo">
        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar size="100">
                    <img src="/zp.png" alt="">
                </v-avatar>
            </v-flex>

            <v-btn rounded color="primary" class="mt-2 mb-2" dark>{{ serviceNumber }} </v-btn>
            <v-btn rounded color="primary" class="mt-2 mb-2" dark>{{ rankName }} </v-btn>
             <v-btn rounded color="primary" class="mt-2 mb-2" dark>{{ division }} </v-btn>
                  

            <v-flex class="mt-4 mb-3">
                <Addcase/>
            </v-flex>
            
        </v-layout>        
     
        <v-list>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                <v-list-item-icon class="mr-2">
                    <v-icon class="white--text">{{link.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                   <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</nav>
</template>

<script>
import Addcase from './Addcase'
import AddStation from './AddStation'
import firebase from 'firebase'

import db from '@/firebase/fb' 

export default {
    components: {Addcase,AddStation},

    data(){
        return{
            drawer: false,
            user:'',
            fullName: '',
            rankName: '',
            serviceNumber: '',
            division: '',
            rank: '',
            links:[
                {icon: 'dashboard', text: "OB Book", route: '/'},
                {icon: 'map', text: "Crime Map", route: '/mapper'},
                {icon: 'folder', text: "Cases", route: '/cases'},
                {icon: 'assignment', text: "Crime Register", route: '/crimeRegister'},
                {icon: 'room', text: "Location Picker", route: '/picker'},
                {icon: 'info', text: "Reports", route: '/reports'},
                {icon: 'home_work', text: "Stations", route: '/stations'},
                {icon: 'settings_applications', text: "Admin", route: '/admin'},
            ]
        }
    },
    method: {
        logout(){
            firebase.auth().signOut().then(() =>{
                this.$router.push({name: 'Login'})
            })
        },
    },

    watch: {
    // whenever question changes, this function will run
    rankName: function (newQuestion) {
      //this.fullName = 'Waiting for you to stop typing...'
    },

    division: function (newQuestion) {
      //this.fullName = 'Waiting for you to stop typing...'
    }
  },

    mounted(){
        var self = this;
        firebase.auth().onAuthStateChanged(function(cred) {
            if (cred) {
                self.user = cred
                db.collection("officers").doc(cred.uid)
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                       self.rankName = doc.data().rank + " " +  doc.data().lastName;
                       self.serviceNumber = doc.data().serviceNumber;
                       self.division = doc.data().division;
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            } else {
                // No user is signed in.
                //this.user = null
            }
        })
    }
}
</script>