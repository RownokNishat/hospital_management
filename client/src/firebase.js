// import { initializeApp } from "firebase/app"

// const firebaseConfig = {
//   apiKey: "AIzaSyBUUc47mph2CssHdQf6bh1vdjfqB_rr-ks",
//   authDomain: "cronushealthbook.firebaseapp.com",
//   projectId: "cronushealthbook",
//   storageBucket: "cronushealthbook.appspot.com",
//   messagingSenderId: "773774950269",
//   appId: "1:773774950269:web:9c8f08d4e133fc36aa1614",
//   measurementId: "G-Q1X9HQBZ9H"
// };

// // Initialize Firebase
// export const firebase = initializeApp(firebaseConfig)


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUUc47mph2CssHdQf6bh1vdjfqB_rr-ks",
  authDomain: "cronushealthbook.firebaseapp.com",
  projectId: "cronushealthbook",
  storageBucket: "cronushealthbook.appspot.com",
  messagingSenderId: "773774950269",
  appId: "1:773774950269:web:9c8f08d4e133fc36aa1614",
  measurementId: "G-Q1X9HQBZ9H"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const firebase = initializeApp(firebaseConfig)