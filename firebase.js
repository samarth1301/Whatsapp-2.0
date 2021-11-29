import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyDD-Aey_KJLvlQ2069_97BpX21nmOBwUwQ",
    authDomain: "whatsapp-2-e5647.firebaseapp.com",
    projectId: "whatsapp-2-e5647",
    storageBucket: "whatsapp-2-e5647.appspot.com",
    messagingSenderId: "686445285931",
    appId: "1:686445285931:web:220b8d468c32e51708906e"
  };
  

// if the firebase app is initialized then move on with config else initialize it first 
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()



const db = app.firestore();       //database ka instance
const auth = app.auth();         //authentication ka instance
const provider = new firebase.auth.GoogleAuthProvider();


export {db, auth,provider};