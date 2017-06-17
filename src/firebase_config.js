import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBs1OIDbkIAwoRRLZP1PHhNroPNVNkXo70',
  authDomain: 'pocketcongress-aaa65.firebaseapp.com',
  databaseURL: 'https://pocketcongress-aaa65.firebaseio.com',
  projectId: 'pocketcongress-aaa65',
  storageBucket: 'pocketcongress-aaa65.appspot.com',
  messagingSenderId: '65829394867'
};
  
firebase.initializeApp(config);

export default firebase;

export const auth = firebase.auth;
export const database = firebase.database();

