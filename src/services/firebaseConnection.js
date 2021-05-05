import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAqt2p4o9WfWwG_AZJ-xkPVYCKqKyhwYJQ",
    authDomain: "controle-financeiro-mobile.firebaseapp.com",
    projectId: "controle-financeiro-mobile",
    storageBucket: "controle-financeiro-mobile.appspot.com",
    messagingSenderId: "222253473960",
    appId: "1:222253473960:web:a30424c8e67971b2baa29d",
    measurementId: "G-D1T0LHMBK4"
  };

  if(!firebase.apps.length){
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

}

export default firebase;