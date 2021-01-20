import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD27rU68JLX3v7zphm-D86xlWF4uHIaimg",
    authDomain: "booksanta-85a1b.firebaseapp.com",
    projectId: "booksanta-85a1b",
    storageBucket: "booksanta-85a1b.appspot.com",
    messagingSenderId: "147199458698",
    appId: "1:147199458698:web:b7909456978cf081749c73"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();