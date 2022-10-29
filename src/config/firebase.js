import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWDXsQHCmXu9WU8IFwRlaDi6FjwOMtmDA",
  authDomain: "house-market-place-e6d19.firebaseapp.com",
  projectId: "house-market-place-e6d19",
  storageBucket: "house-market-place-e6d19.appspot.com",
  messagingSenderId: "534205649266",
  appId: "1:534205649266:web:d837b5c60fc7aba0764deb"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const authFirestore = firebase.auth();
const storageFirestore= firebase.storage();
const googleProvider= new firebase.auth.GoogleAuthProvider();
const facebookProvider= new firebase.auth.FacebookAuthProvider();
const timeStamp = firebase.firestore.Timestamp;

export { 
projectFirestore, 
authFirestore, 
googleProvider,
facebookProvider, 
storageFirestore, 
timeStamp
}
