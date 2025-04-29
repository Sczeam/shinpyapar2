import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = process.env.SERVICE_ACCOUNT_KEY 
  ? JSON.parse(process.env.SERVICE_ACCOUNT_KEY) 
  : null;

if (!serviceAccount) {
  throw new Error("SERVICE_ACCOUNT_KEY not set in environment variables");
}

// Initialize Firebase Admin if it hasn't been initialized yet
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

// Initialize Firebase Admin
initializeFirebaseAdmin();

// Get Firestore instance
export const db = getFirestore();

// Export initialized app
export { initializeFirebaseAdmin };