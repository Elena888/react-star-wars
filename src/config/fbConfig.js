import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDjxtRRGVPR5Vss1ipoS2w-8lf7snWloL4",
  authDomain: "react-star-wars-e1563.firebaseapp.com",
  databaseURL: "https://react-star-wars-e1563.firebaseio.com",
  projectId: "react-star-wars-e1563",
  storageBucket: "react-star-wars-e1563.appspot.com",
  messagingSenderId: "835249354145",
  appId: "1:835249354145:web:22aa846ba729dad67d87e0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;