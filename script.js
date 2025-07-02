// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXBI1pZlmQrpT6lQXVPTMR5TLf3-utpqc",
    authDomain: "engagefuel-ab998.firebaseapp.com",
    projectId: "engagefuel-ab998",
    storageBucket: "engagefuel-ab998.appspot.com",
    messagingSenderId: "154190808873",
    appId: "1:154190808873:web:b87c6bbf4511da173ad938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavLinks = document.getElementById('mobileNavLinks');
const mobileMenuOverlay = document.createElement('div');
mobileMenuOverlay.className = 'mobile-menu-overlay';
document.body.appendChild(mobileMenuOverlay);

// Mobile Navigation Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNavLinks.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
});

// Close mobile menu when clicking overlay
mobileMenuOverlay.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileNavLinks.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Course Enrollment Buttons
document.querySelectorAll('.enroll-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const courseCard = button.closest('.course-card');
        
        if (courseCard) {
            const courseTitle = courseCard.querySelector('.course-header').textContent.trim();
            
            switch(courseTitle) {
                case 'Python Basics':
                    window.location.href = 'python-course.html';
                    break;
                case 'C++ Programming':
                    window.location.href = 'cpp-course.html';
                    break;
                case 'OOPs Concepts':
                    window.location.href = 'oops-course.html';
                    break;
                case 'HTML5':
                    window.location.href = 'html-course.html';
                    break;
                case 'CSS3':
                    window.location.href = 'css-course.html';
                    break;
                default:
                    // Default action for other courses
                    window.location.href = 'courses.html';
            }
        }
    });
});

// Auth State Listener
onAuthStateChanged(auth, (user) => {
    const body = document.body;
    const authButtons = document.getElementById('authButtons');
    const userProfile = document.getElementById('userProfile');

    if (user) {
        // User is signed in
        body.classList.add('logged-in');
        body.classList.remove('logged-out');

        const displayName = user.displayName || user.email.split('@')[0];
        document.querySelector('.username').textContent = displayName ? displayName.toUpperCase() : 'USER';

        // Logout functionality
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            signOut(auth).then(() => {
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Logout error:', error);
            });
        });

    } else {
        // User is signed out
        body.classList.add('logged-out');
        body.classList.remove('logged-in');
    }
});

// CTA Button Functionality
document.querySelector('.cta-button')?.addEventListener('click', () => {
    window.location.href = 'signup.html';
});