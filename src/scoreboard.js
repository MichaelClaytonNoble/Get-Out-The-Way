import firebase from 'firebase/app';
import 'firebase/analytics';

import 'firebase/auth';
import 'firebase/firestore'; 

let db;
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
  firebase.analytics();
  db = firebase.firestore();
}

function saveScore() {
    // Get name from input box
    let name = document.getElementById('name').value;

    // Make sure name has a value, if not send alert.
    if(name !== "") {
        // Add a new document in collection "scores"
        db.collection("scores").doc().set({
            name: name,
            score: score
        })
        .then(function() {
            console.log("Document successfully written!");
            updateScores();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    } else {
        alert('Please enter a name');
    }
}

