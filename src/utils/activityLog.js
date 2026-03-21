import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Write a simple activity log to Firestore.
 * @param {object} user    firebase auth user (from useAuth)
 * @param {string} action  short code e.g. add_post, edit_post
 * @param {string} details human‑readable description
 */
export async function logActivity(user, action, details) {
  if (!user) return;
  try {
    await addDoc(collection(db, 'activityLogs'), {
      uid: user.uid,
      email: user.email,
      action,
      details,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error('⚠️  Failed to log activity:', err);
  }
}
