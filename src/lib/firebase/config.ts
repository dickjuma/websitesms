export interface FirebaseApp {}
export interface Firestore {}
export interface Auth {}

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

function firebaseUnavailable(): never {
  throw new Error("Firebase support is not enabled in this build.");
}

function getFirebaseApp(): FirebaseApp {
  return firebaseUnavailable();
}

function getFirebaseDb(): Firestore {
  return firebaseUnavailable();
}

function getFirebaseAuth(): Auth {
  return firebaseUnavailable();
}

export { getFirebaseApp, getFirebaseDb, getFirebaseAuth };
export default getFirebaseDb;
