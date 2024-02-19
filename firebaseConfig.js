import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCJHIzgoLOxjYPjRXXHDvafF8wJoHhoQ3M",
    authDomain: "estiam-native-app.firebaseapp.com",
    projectId: "estiam-native-app",
    storageBucket: "estiam-native-app.appspot.com",
    messagingSenderId: "24914975239",
    appId: "1:24914975239:web:0c555bab651e223e2f68a2",
    measurementId: "G-Q048GTMKRC"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // if already initialized, use that one
}

export const db = app.firestore();
export const auth = firebase.auth();


// Additional rule where only authenticated users can read the product data and only admins can write
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {

//     // Match any document in the 'products' collection
//     match /products/{productId} {
//       // Anyone can read the products list
//       allow read: if true;
//       // Only authenticated users can write to the products list
//       // Replace with your own logic to allow only admins to write
//       allow write: if request.auth != null && request.auth.uid == 'ADMIN_USER_ID';
//     }
    
//     // ... other collection rules ...

//   }
// }