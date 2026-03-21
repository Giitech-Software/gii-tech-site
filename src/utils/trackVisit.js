import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config'; // Adjust the path as needed

export const trackSiteVisit = async () => {
  try {
    const visitRef = doc(db, 'siteStats', 'visits');

    const docSnap = await getDoc(visitRef);

    if (docSnap.exists()) {
      // Increment the count by 1
      await updateDoc(visitRef, {
        count: increment(1),
      });
    } else {
      // If the document doesn't exist, create it with count = 1
      await setDoc(visitRef, {
        count: 1,
      });
    }
  } catch (error) {
    console.error('Error tracking site visit:', error);
  }
};
