import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';

export default function AddProject() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setUploading(true);

    if (!form.image) {
      setMsg('❌ Please choose an image file');
      setUploading(false);
      return;
    }

    try {
      const imageRef = ref(storage, `projects/${Date.now()}-${form.image.name}`);
      const snapshot = await uploadBytes(imageRef, form.image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, 'projects'), {
        title: form.title,
        description: form.description,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      setMsg('✅ Project added!');
      setForm({ title: '', description: '', image: null });
    } catch (err) {
      setMsg('❌ Failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <>
        <PageTitle>➕ Add New Project</PageTitle>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
            className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full p-3 border rounded h-28 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />

          <label className="block">
            <span className="block text-gray-700 dark:text-gray-200 mb-1">Choose Image</span>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-200 dark:file:bg-gray-700 file:text-gray-800 dark:file:text-gray-100 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
            />
          </label>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded hover:bg-cta transition disabled:opacity-60"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Save Project'}
          </button>

          {msg && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{msg}</p>}
        </form>
      </>
    </AdminLayout>
  );
}