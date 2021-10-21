  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDeX0snX4mNNjQ3Up95ITaKjOF9a4zIQjc",
    authDomain: "ecalculator-f5f9c.firebaseapp.com",
    projectId: "ecalculator-f5f9c",
    storageBucket: "ecalculator-f5f9c.appspot.com",
    messagingSenderId: "859988104696",
    appId: "1:859988104696:web:ae349d61ecbda968cd720d",
    measurementId: "G-QQZ41J8Z5B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();
  