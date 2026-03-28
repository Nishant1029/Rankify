import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

/**
 * CRITICAL CONSTRAINT: Test the connection to Firestore on boot.
 * If this fails with "the client is offline", the config is likely wrong.
 */
async function testConnection() {
  try {
    // Attempt to fetch a non-existent document directly from server
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firestore connection test successful.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("CRITICAL: Firestore connection failed. Please check your Firebase configuration.");
    }
    // We don't throw here to avoid crashing the whole app on boot if it's just a temporary network issue,
    // but we log it for diagnostics.
  }
}

testConnection();
