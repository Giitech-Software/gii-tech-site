import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import AdminLayout from '../../components/AdminLayout';
import PageTitle from '../../components/PageTitle';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, 'activityLogs'), orderBy('timestamp', 'desc'));
        const snap = await getDocs(q);
        setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminLayout>
      <>
        <PageTitle>📜 Activity Logs</PageTitle>

        {loading ? (
          <LoadingSpinner label="Loading activity logs" />
        ) : (
        <div className="space-y-3">
          {logs.map((l) => (
            <div
              key={l.id}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 rounded flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{l.action}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{l.details}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{l.email}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {l.timestamp?.toDate().toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        )}
      </>
    </AdminLayout>
  );
}
