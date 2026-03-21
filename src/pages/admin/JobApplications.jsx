import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';

export default function JobApplications() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      const q = query(
        collection(db, 'applications'),
        where('jobId', '==', jobId)
      );
      const snap = await getDocs(q);
      setApplications(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchApplications();
  }, [jobId]);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this application?')) {
      await deleteDoc(doc(db, 'applications', id));
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  const handleReply = (app) => {
    setSelectedApp(app);
    setSubject('');
    setMessage('');
    setIsReplying(true);
  };

  const sendReply = async () => {
    if (!subject || !message) return alert('Subject and message required.');

    try {
      const appRef = doc(db, 'applications', selectedApp.id);
      await updateDoc(appRef, {
        reply: {
          subject,
          message,
          repliedAt: new Date(),
        },
      });
      alert('Reply saved successfully.');
      setIsReplying(false);
    } catch (error) {
      console.error('Reply failed:', error.message);
      alert('Failed to send reply.');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>📄 Job Applications</PageTitle>
        <button
          onClick={() => navigate('/admin/jobs')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          ← Back to Jobs
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No applications submitted yet for this job.
        </p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {app.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">📧 {app.email}</p>
              {app.message && (
                <p className="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-line">
                  {app.message}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Submitted:{' '}
                {app.submittedAt?.toDate
                  ? app.submittedAt.toDate().toLocaleString()
                  : 'N/A'}
              </p>

              {app.reply && (
                <div className="mt-4 p-3 border border-green-500 rounded bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <p className="font-medium">💬 Replied</p>
                  <p className="text-sm">Subject: {app.reply.subject}</p>
                  <p className="text-sm whitespace-pre-wrap">{app.reply.message}</p>
                </div>
              )}

              <div className="flex gap-4 mt-4 flex-wrap">
                <button
                  onClick={() => handleReply(app)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  💌 Reply Application
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️ Delete Application
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      {isReplying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              ✉️ Reply to {selectedApp?.name}
            </h2>
            <label className="block mb-2 text-gray-800 dark:text-gray-200">
              Subject:
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </label>
            <label className="block mb-4 text-gray-800 dark:text-gray-200">
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="w-full mt-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsReplying(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-cta"
              >
                ✅ Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
