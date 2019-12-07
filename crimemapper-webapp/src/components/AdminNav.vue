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

<!--
      <v-btn v-if="!user" text>
        <span class="mr-2">Login</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>-->
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

            <input type="text" v-model="fullName"/>
               <v-btn rounded color="primary" class="mt-2 mb-2" dark v-model="fullName"/>
               <v-btn rounded color="primary" class="mt-2" dark v-model="fullName"/>
<!--
               <input type="text" v-model="serviceNumber"/>
               <input type="text" v-model="rank"/>-->

                  

              <v-flex cl`ass="mt-4 mb-3">
                <AddStation/>
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
            serviceNumber: '',
            rank: '',
            links:[
                {icon: 'dashboard', text: "Register Officer", route: '/'},
                {icon: 'dashboard', text: "Officers", route: '/'},
                {icon: 'map', text: "Crime Map", route: '/mapper'},
                {icon: 'room', text: "Location Picker", route: '/picker'},
                {icon: 'home_work', text: "Stations", route: '/stations'},
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

    mounted(){
        var self = this;
        firebase.auth().onAuthStateChanged(function(cred) {
            if (cred) {
                self.user = cred
                db.collection("officers").doc(cred.uid)
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                       self.fullName = doc.data().firstName + " "+  doc.data().firstName
                       self.serviceNumber = doc.data().serviceNumber
                       self.rank = doc.data().rank
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