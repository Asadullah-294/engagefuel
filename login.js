import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXBI1pZlmQrpT6lQXVPTMR5TLf3-utpqc",
  authDomain: "engagefuel-ab998.firebaseapp.com",
  projectId: "engagefuel-ab998",
  storageBucket: "engagefuel-ab998.appspot.com",
  messagingSenderId: "154190808873",
  appId: "1:154190808873:web:b87c6bbf4511da173ad938"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      successMessage.textContent = 'Login successful! Redirecting...';
      successMessage.style.display = 'block';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = 'index.html';
  }
});
