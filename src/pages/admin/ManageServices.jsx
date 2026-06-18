import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logActivity } from '../../utils/activityLog';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, 'services'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id, imageUrl, title) => {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'services', id));

      // Delete image from Firebase Storage
      if (imageUrl) {
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      }

      // Update local state
      setServices(prev => prev.filter(service => service.id !== id));

      // Log activity
      await logActivity(currentUser?.email, `Deleted service: ${title}`);

      setMsg(`✅ "${title}" deleted successfully.`);
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error('Error deleting service:', error);
      setMsg('❌ Failed to delete service.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <AdminLayout>
      <PageTitle>🛠️ Manage Services</PageTitle>

      {msg && (
        <div className="mb-4 px-4 py-2 rounded bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border border-green-300 dark:border-green-600">
          {msg}
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Loading services" />
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded"
          >
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 line-clamp-3">
              {service.description}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <Link
                to={`/admin/edit-service/${service.id}`}
                className="text-sm text-blue-600 dark:text-blue-400 underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(service.id, service.imageUrl, service.title)}
                className="text-sm text-red-600 dark:text-red-400 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </AdminLayout>
  );
}
