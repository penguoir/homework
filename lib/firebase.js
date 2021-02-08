import firebase from "firebase/app"
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD_rHMU3jWBwO4URWqqYCqvKxoN9en4vio",
  authDomain: "ori-homework.firebaseapp.com",
  projectId: "ori-homework",
  storageBucket: "ori-homework.appspot.com",
  messagingSenderId: "420633676487",
  appId: "1:420633676487:web:e99ced068a2187e3a5cce2"
};

let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
}
export default app

export const firestore = firebase.firestore()

