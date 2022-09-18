import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2mPY3hXyhrj0eFw_jj0WW4XR0WxOUxXY",
    authDomain: "fir-1331c.firebaseapp.com",
    projectId: "fir-1331c",
    storageBucket: "fir-1331c.appspot.com",
    messagingSenderId: "423172012362",
    appId: "1:423172012362:web:031ab82775b10da5d369b3",
    measurementId: "G-559ZXNFYJL"
  };

  export default firebase.initializeApp(firebaseConfig)