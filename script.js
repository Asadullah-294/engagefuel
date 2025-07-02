// Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXBI1pZlmQrpT6lQXVPTMR5TLf3-utpqc",
  authDomain: "engagefuel-ab998.firebaseapp.com",
  projectId: "engagefuel-ab998",
  storageBucket: "engagefuel-ab998.appspot.com",
  messagingSenderId: "154190808873",
  appId: "1:154190808873:web:b87c6bbf4511da173ad938"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth State
onAuthStateChanged(auth, (user) => {
  const body = document.body;
  if (user) {
    body.classList.add('logged-in');
    body.classList.remove('logged-out');

    const displayName = user.displayName || user.email.split('@')[0];
    document.querySelector('.username').textContent = displayName ? displayName.toUpperCase() : 'USER';

    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
        window.location.reload();
      });
    });

  } else {
    body.classList.add('logged-out');
    body.classList.remove('logged-in');
  }
});

// Preloader Hide
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// Navbar Toggle for Mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
