<template>
<nav>
    <v-app-bar app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer =!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="red--text">Crime</span>
        <span class="font-weight-light">Mapper</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!user" text>
        <span class="mr-2">Login</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <v-btn v-if="user" text @click="logout()">
        <span class="mr-2">Log Out</span>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    
    <v-navigation-drawer v-model="drawer" app class="indigo">
        <v-layout column align-center>
            <v-flex class="mt-5">
                <v-avatar size="100">
                    <img src="/dp.jpg" alt="">
                </v-avatar>
                <p class="white--text subheading mt-1" align-center>
                    TechArt
                </p>
            </v-flex>
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
import firebase from 'firebase'
export default {
    components: {Addcase},
    data(){
        return{
            drawer: false,
            user:'',
            links:[
                {icon: 'dashboard', text: "Dashboard", route: '/'},
                {icon: 'map', text: "Crime Map", route: '/mapper'},
                {icon: 'folder', text: "Cases", route: '/cases'},
                {icon: 'person', text: "Team", route: '/team'},
            ]
        }
    },
    method: {
        logout(){
            firebase.auth().signOut().then(() =>{
                this.$router.push({name: 'Login'})
            })
        }
    },
    created(){

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.user = user
                // User is signed in.
            } else {
                // No user is signed in.
                //this.user = null
            }
            })
    }
}
</script>