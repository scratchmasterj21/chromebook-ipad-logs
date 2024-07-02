// background.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDartyiMXChZ3RVXPnxcPhynZ_BTEWc0jM",
    authDomain: "gfa-typing.firebaseapp.com",
    databaseURL: "https://gfa-typing-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gfa-typing",
    storageBucket: "gfa-typing.appspot.com",
    messagingSenderId: "462808707659",
    appId: "1:462808707659:web:7bb886979156c5d47653ce",
    measurementId: "G-950PGZTH9D"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

chrome.runtime.onInstalled.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    const credential = GoogleAuthProvider.credential(null, token);
    signInWithCredential(auth, credential).then(({ user }) => {
      logUserLogin(user.uid);
    }).catch((error) => console.error('Error signing in:', error));
  });
});

function logUserLogin(userID) {
  const logRef = ref(db, 'deviceLoginLogs/');
  const newLogRef = push(logRef);

  set(newLogRef, {
    userID: userID,
    timestamp: Date.now(),
  }).then(() => {
    console.log('User login logged successfully');
  }).catch((error) => {
    console.error('Error logging user login:', error);
  });
}
