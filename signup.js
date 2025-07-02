import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  deleteUser
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase config
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
const db = getFirestore(app);

// Populate Day and Year Selects (no inline scripts due to CSP)
window.addEventListener('DOMContentLoaded', () => {
  const birthDay = document.getElementById('birthDay');
  const birthYear = document.getElementById('birthYear');
  const currentYear = new Date().getFullYear();

  for (let i = 1; i <= 31; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    birthDay.appendChild(opt);
  }

  for (let y = currentYear - 13; y >= currentYear - 100; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    birthYear.appendChild(opt);
  }
});

// Country code handling
document.getElementById('country').addEventListener('change', function () {
  const selected = this.options[this.selectedIndex].value;
  if (selected) {
    document.getElementById('countryCode').textContent = selected.split('|')[1];
  }
});

// Form handler
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const gender = document.getElementById('gender').value;
  const birthDay = document.getElementById('birthDay').value;
  const birthMonth = document.getElementById('birthMonth').value;
  const birthYear = document.getElementById('birthYear').value;
  const country = document.getElementById('country').value.split('|')[0];
  const countryCode = document.getElementById('countryCode').textContent;
  const whatsapp = countryCode + document.getElementById('whatsapp').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  if (!agreeTerms) {
    errorMessage.textContent = "You must agree to the Terms & Conditions";
    errorMessage.style.display = 'block';
    return;
  }
  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match";
    errorMessage.style.display = 'block';
    return;
  }
  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters long";
    errorMessage.style.display = 'block';
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      displayName: name,
      gender,
      birthDate: new Date(birthYear, birthMonth - 1, birthDay),
      country,
      whatsapp,
      termsAgreed: agreeTerms,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });

    successMessage.textContent = "Account created successfully! Redirecting...";
    successMessage.style.display = "block";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    console.error("Signup error:", error);
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";

    if (auth.currentUser) {
      try {
        await deleteUser(auth.currentUser);
      } catch (deleteErr) {
        console.error("Cleanup failed:", deleteErr);
      }
    }
  }
});

// Auth redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});
