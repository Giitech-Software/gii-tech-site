// src/pages/JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', cover: '', cv: null });
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  // Fetch job details
  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, 'jobs', id));
      if (snap.exists()) setJob(snap.data());
    })();
  }, [id]);

  // Handle form input change
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setForm({ ...form, cv: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit application
  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setUploading(true);
    try {
      let cvUrl = '';
      if (form.cv) {
        const fileRef = ref(storage, `applications/${id}/${Date.now()}-${form.cv.name}`);
        const snap = await uploadBytes(fileRef, form.cv);
        cvUrl = await getDownloadURL(snap.ref);
      }

      const applicationData = {
        name: form.name,
        email: form.email,
        coverLetter: form.cover,
        cvUrl,
        submittedAt: serverTimestamp(),
        jobId: id, // ✅ Needed for admin stats
      };

      // Save to both job-specific and global collection
      await Promise.all([
        addDoc(collection(db, 'jobs', id, 'applications'), applicationData),
        addDoc(collection(db, 'applications'), applicationData),
      ]);

      setMsg('✅ Application submitted!');
      setForm({ name: '', email: '', cover: '', cv: null });
    } catch (err) {
      console.error(err);
      setMsg('❌ ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!job) return <p className="p-10">Loading…</p>;

  const excerpt = job.description?.slice(0, 150) || 'Job opportunity at GiiTech Software Systems.';

  return (
    <>
      <Seo {...SeoConfig.dynamic.jobPost({ title: job.title, excerpt, id })} />

      
        <main className="flex-grow p-10 max-w-3xl mx-auto space-y-8">
          <Link to="/jobs" className="text-cta hover:underline">&larr; Back to Jobs</Link>

          <h2 className="text-4xl font-bold text-primary">{job.title}</h2>
          <p className="text-gray-600">{job.location} · {job.type}</p>

          <section className="prose">
            <h3>Description</h3>
            <p>{job.description}</p>
            <h3>Requirements</h3>
            <p>{job.requirements}</p>
          </section>

          <hr />

          <h3 className="text-2xl font-semibold text-primary">Apply Now</h3>
          {msg && <p className="mb-2">{msg}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border rounded"
            />
            <textarea
              name="cover"
              value={form.cover}
              onChange={handleChange}
              placeholder="Cover Letter (optional)"
              className="w-full p-3 border rounded h-28"
            />
            <input
              type="file"
              name="cv"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
            <button
              disabled={uploading}
              className="bg-primary text-white px-6 py-3 rounded hover:bg-cta transition"
            >
              {uploading ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        </main>

      
    </>
  );
}
