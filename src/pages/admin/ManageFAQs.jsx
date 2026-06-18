import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ManageFAQs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, 'faqs'));
        setFaqs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
        toast.error('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminLayout>
      <PageTitle>📚 Manage FAQs</PageTitle>
      {loading ? (
        <LoadingSpinner label="Loading FAQs" />
      ) : (
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {faq.icon} {faq.question}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{faq.answer}</p>
            <Link
              to={`/admin/edit-faq/${faq.id}`}
              className="text-sm text-blue-600 dark:text-blue-400 underline mt-2 inline-block"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
      )}
    </AdminLayout>
  );
}
