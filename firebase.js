// Replace with your Firebase config from the console
const firebaseConfig = {
    apiKey: "AIzaSyCKnIFyOiD61ce6aHo_MN__7WzWEOC7qKI",
    authDomain: "past-and-future-game.firebaseapp.com",
    databaseURL: "https://past-and-future-game-default-rtdb.firebaseio.com",
    projectId: "past-and-future-game",
    storageBucket: "past-and-future-game.firebasestorage.app",
    messagingSenderId: "309063047664",
    appId: "1:309063047664:web:9bfde2c301b7b91b92e535",
    measurementId: "G-SZ1ZZC4LKL"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Create a global variable for the database.
var database = firebase.database();