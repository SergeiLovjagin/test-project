import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    databaseURL: `https://${process.env.REACT_APP_PROJECTID}-default-rtdb.europe-west1.firebasedatabase.app`,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
}

firebase.initializeApp(firebaseConfig)

export default firebase