// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCLJfCHT4M-3MZ8yDfj6HMras2mQjMkVpQ",
  authDomain: "expnses-tracker.firebaseapp.com",
  projectId: "expnses-tracker",
  storageBucket: "expnses-tracker.appspot.com",
  messagingSenderId: "837338579652",
  appId: "1:837338579652:web:7ae36049c3dfca0561bf91",
  measurementId: "G-Q9VRP685HL",
  databaseURL:"https://expnses-tracker-default-rtdb.europe-west1.firebasedatabase.app/"
};


const app = initializeApp(firebaseConfig);
const database=getDatabase(app);

export {database}