import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { logActivity } from '../../utils/activityLog';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';

export default function AddPost() {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setUploading(true);

    try {
      let imageUrl = '';
      if (form.image) {
        const imgRef = ref(storage, `blogImages/${Date.now()}-${form.image.name}`);
        const snap = await uploadBytes(imgRef, form.image);
        imageUrl = await getDownloadURL(snap.ref);
      }

      await addDoc(collection(db, 'posts'), {
        title: form.title,
        content: form.content,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      await logActivity(user, 'add_post', `Added post: "${form.title}"`);

      setMsg('✅ Post published!');
      setForm({ title: '', content: '', image: null });
    } catch (err) {
      setMsg('❌ ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout>
      <PageTitle>📝 Publish New Post</PageTitle>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Post Title"
          required
          className="w-full p-3 border rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content (Markdown supported)"
          required
          className="w-full p-3 border rounded h-40 bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary file:text-white hover:file:bg-cta transition"
        />

        <button
          disabled={uploading}
          className="bg-primary text-white px-6 py-3 rounded hover:bg-cta transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading…' : 'Publish'}
        </button>

        {msg && <p className="text-sm text-gray-700 dark:text-gray-300">{msg}</p>}
      </form>
    </AdminLayout>
  );
}
