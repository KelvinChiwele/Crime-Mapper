import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCUHBHBSRt9xKm5_ON2UZMHazIQd6Hyr9w",
  authDomain: "crimemapper-26387.firebaseapp.com",
  databaseURL: "https://crimemapper-26387.firebaseio.com",
  projectId: "crimemapper-26387",
  storageBucket: "crimemapper-26387.appspot.com",
  messagingSenderId: "1063401287389",
  appId: "1:1063401287389:web:aa6b5198c2a85e55"
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;