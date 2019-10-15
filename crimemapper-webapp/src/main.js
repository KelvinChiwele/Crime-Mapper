import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import {ModalPlugin} from 'bootstrap-vue'

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'

let app = null;
//Wait for firebase auth to initialize before creating app
firebase.auth().onAuthStateChanged(() =>{
  //check if app is not initialized
    if(!app){
      app = new Vue({
      router,
      vuetify,
      ModalPlugin,
      render: h => h(App)
    }).$mount('#app')
  }
})

