// src/pages/Contact.jsx
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      await addDoc(collection(db, 'contactForms'), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setStatus('✅ Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Seo {...SeoConfig.contact} />
      <div className="min-h-screen bg-background text-text flex flex-col">

        {/* Main */}
        <main className="flex-grow p-10 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-primary text-center mb-6">Contact Us</h2>

          {/* Quick contact details */}
          <div className="text-center text-gray-700 space-y-3 mb-10">
            <p>📧 <a href="mailto:giitechsoftems@gmail.com" className="text-primary hover:underline">giitechsoftems@gmail.com</a></p>
            <p>📞 +233 201 886 211 / +233 537 317 909</p>
            <p><a href="https://www.giitechsoftwaresystems.com" className="text-primary hover:underline">https://www.giitechsoftwaresystems.com</a></p>
            <p>📍 Accra, Ghana</p>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-2 border rounded focus:ring-primary focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full p-2 border rounded focus:ring-primary focus:outline-none"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="w-full h-32 p-3 border rounded resize-none focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white py-3 rounded hover:bg-cta transition w-full"
            >
              Send Message
            </button>
            {status && <p className="text-center mt-2">{status}</p>}
          </form>
        </main>

      
      </div>
    </>
  );
}
