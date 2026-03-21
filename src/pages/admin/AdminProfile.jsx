import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';

export default function AdminProfile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [form, setForm] = useState({
    displayName: '',
    bio: '',
    photo: null,
    photoUrl: '',
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (snap.exists()) {
        const data = snap.data();
        setForm((f) => ({
          ...f,
          displayName: data.displayName || user.displayName || '',
          bio: data.bio || '',
          photoUrl: data.photoUrl || user.photoURL || '',
        }));
      }
    })();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') setForm({ ...form, photo: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      let newPhotoUrl = form.photoUrl;

      if (form.photo) {
        const imgRef = ref(storage, `profileImages/${user.uid}/${Date.now()}-${form.photo.name}`);
        const snap = await uploadBytes(imgRef, form.photo);
        newPhotoUrl = await getDownloadURL(snap.ref);
      }

      await updateProfile(user, {
        displayName: form.displayName,
        photoURL: newPhotoUrl,
      });

      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName: form.displayName,
          bio: form.bio,
          photoUrl: newPhotoUrl,
        },
        { merge: true }
      );

      setMsg('✅ Profile updated!');
      setForm({ ...form, photo: null, photoUrl: newPhotoUrl });
    } catch (err) {
      setMsg('❌ ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <>
        <PageTitle>👤 My Profile</PageTitle>
        {msg && <p className="mb-4 text-gray-700 dark:text-gray-300">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md bg-white dark:bg-gray-900 p-6 rounded shadow">
          {form.photoUrl && (
            <img src={form.photoUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
          )}

          <input
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            placeholder="Display Name"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Short Bio"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded h-24 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-100"
          />

          <button className="bg-primary text-white px-6 py-3 rounded hover:bg-cta transition">
            Save Profile
          </button>
        </form>
      </>
    </AdminLayout>
  );
}
