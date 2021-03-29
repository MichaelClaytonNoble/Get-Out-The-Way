import firebase from 'firebase/app';
import 'firebase/firestore'; 


export function init(){

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDWjWxebLN2W3i3FGYu48YxJxVKxBGqzKw",
    authDomain: "get-out-the-way-scoreboard.firebaseapp.com",
    projectId: "get-out-the-way-scoreboard",
    storageBucket: "get-out-the-way-scoreboard.appspot.com",
    messagingSenderId: "410525736273",
    appId: "1:410525736273:web:2a1872778fe2ca68dec770",
    measurementId: "G-LS92WQHLNG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
}