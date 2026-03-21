import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../firebase/config';

const AuthContext = createContext();

const auth = getAuth(app);
const db = getFirestore(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log('✅ Logged in:', currentUser.email);

        const userDocRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const fetchedRole = docSnap.data().role;
          console.log('✅ Role from Firestore:', fetchedRole);
          setRole(fetchedRole);
        } else {
          console.warn('⚠️ User document not found in Firestore!');
          setRole(null);
        }
      } else {
        console.log('🔒 User signed out.');
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Add login function
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Updated logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setRole(null);
      document.body.style.overflow = 'auto'; // ✅ Re-enable scroll on logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
