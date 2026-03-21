import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase/config';


const auth = getAuth(app);

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
