import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyDeZUlwtxoVf8eGNGONaM8LzKixxcoKaPw",
  authDomain: "uneri-d668d.firebaseapp.com",
//  databaseURL: "https://uneri-d668d.firebaseio.com",
  projectId: "uneri-d668d",
//  storageBucket: "uneri-d668d.appspot.com",
  messagingSenderId: "218158864499",
  appId: "1:218158864499:web:3c63cb7de8a2154384f206",
  measurementId: "G-NWM4TZZ5Q3"
}

const firebaseApp = initializeApp(config);

export { firebaseApp };
