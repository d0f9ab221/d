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

// Google Client ID
const googleClientId = "1059355688483-ee9g0rurtbo4k1o5kafkunrot9nkge97.apps.googleusercontent.com";

// DOM Elements
const loginForm = document.getElementById('loginForm');
const googleSignInButton = document.getElementById('googleSignIn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Initialize Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  'client_id': googleClientId
});

// Email/Password Sign In
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  try {
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    
    // Success - redirect to dashboard
    console.log('User signed in:', userCredential.user);
    window.location.href = '/dashboard.html'; // Redirect to dashboard
    
  } catch (error) {
    console.error('Sign in error:', error);
    
    // Display error message
    const errorMessage = error.message || 'An error occurred during sign in';
    alert(errorMessage);
    
    // Reset button state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});

// Google Sign In
googleSignInButton.addEventListener('click', async () => {
  try {
    // Show loading state
    const originalText = googleSignInButton.textContent;
    googleSignInButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    googleSignInButton.disabled = true;
    
    const result = await auth.signInWithPopup(provider);
    
    // Success - redirect to dashboard
    console.log('Google user signed in:', result.user);
    window.location.href = '/dashboard.html'; // Redirect to dashboard
    
  } catch (error) {
    console.error('Google sign in error:', error);
    
    // Display error message
    const errorMessage = error.message || 'An error occurred during Google sign in';
    alert(errorMessage);
    
    // Reset button state
    googleSignInButton.innerHTML = '<i class="fab fa-google"></i><span>Sign in with Google</span>';
    googleSignInButton.disabled = false;
  }
});

// Auth state persistence
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    console.log('Auth persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

// Check if user is already signed in on page load
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('User already signed in:', user);
    // User is signed in - redirect to dashboard
    window.location.href = '/dashboard.html';
  } else {
    console.log('User not signed in');
  }
});