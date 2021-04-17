import firebase from 'firebase';
import 'firebase/firebase-firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCV_t42q9OpoYKsQZdDAfSFW7hu8fN1c6E',
  authDomain: 'todoist-c9be0.firebaseapp.com',
  projectId: 'todoist-c9be0',
  storageBucket: 'todoist-c9be0.appspot.com',
  messagingSenderId: '1010732200347',
  appId: '1:1010732200347:web:6504d2f5d53bc7b576713e',
});

const firestore = firebaseConfig.firestore();

export { firestore };
