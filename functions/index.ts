import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

export const createUserProfile = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const email = user.email;
  const displayName = user.displayName || 'New User';

  const userRef = db.collection('users').doc(uid);

  const userData = {
    email: email,
    displayName: displayName,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp()
  };

  try {
    await userRef.set(userData, { merge: true });
    console.log(`User profile created/updated for: ${uid}`);
    return null;
  } catch (error) {
    console.error(`Error creating user profile for ${uid}:`, error);
    return null;
  }
});