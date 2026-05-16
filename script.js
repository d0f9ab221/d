// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhuSxkjcsZ3TtNGYCOXOOl7-WWG_EsgPo",
  authDomain: "ililbb-70fb0.firebaseapp.com",
  databaseURL: "https://ililbb-70fb0-default-rtdb.firebaseio.com",
  projectId: "ililbb-70fb0",
  storageBucket: "ililbb-0.firebasestorage.app",
  messagingSenderId: "1059355688483",
  appId: "1:1059355688483:web:a71b5f3bc4fb31ee86fb96",
  measurementId: "G-GVEB9G3V95"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const emailForm = document.getElementById('emailForm');
const googleBtn = document.getElementById('googleSignIn');
const toastContainer = document.getElementById('toast-container');

// Helper: Show Toast Notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Handle Email/Password Sign In
emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  
  // Simple validation
  if (!email || !password) {
    showToast('Please enter both email and password', 'error');
    return;
  }
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Sign-in successful
      const user = userCredential.user;
      showToast(`Welcome back, ${user.email}!`);
      // Redirect or update UI could happen here
      console.log('Email sign-in successful:', user);
    })
    .catch((error) => {
      // Handle errors
      showToast(error.message || 'Sign-in failed', 'error');
    });
});

// Handle Google Sign In
googleBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Optional: customize provider
  // provider.addScope('https://www.googleapis.com/auth/userinfo.email');
  
  auth.signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.UserCredential} */
      const credential = result.credential;
      const user = result.user;
      
      // This gives you a Google Access Token
      // const token = credential.accessToken;
      
      console.log('Google sign-in successful:', user);
      showToast(`Signed in as ${user.displayName}`);
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Google sign-in error:', error);
      showToast(errorMessage || 'Google sign-in failed', 'error');
    });
});

// Initialize state listener (optional, for UI updates)
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     console.log('User is signed in:', user);
//   } else {
//     console.log('User is signed out');
//   }
// });