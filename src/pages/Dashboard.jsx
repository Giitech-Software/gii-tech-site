import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import PageTitle from '../components/PageTitle';

export default function Dashboard() {
  const { user, role } = useAuth();

  const [stats, setStats] = useState({
    users: '…',
    posts: '…',
    contacts: '…',
    applications: '…',
    visits: '…',
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userSnap, postSnap, contactSnap, jobSnap, visitSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'posts')),
          getDocs(collection(db, 'contactForms')),
          getDocs(collection(db, 'jobs')),
          getDoc(doc(db, 'siteStats', 'visits')),
        ]);

        let totalApplications = 0;

        // Loop through all jobs and count applications per job
        for (const jobDoc of jobSnap.docs) {
          const appsSnap = await getDocs(collection(db, 'jobs', jobDoc.id, 'applications'));
          totalApplications += appsSnap.size;
        }

        setStats({
          users: userSnap.size,
          posts: postSnap.size,
          contacts: contactSnap.size,
          applications: totalApplications,
          visits: visitSnap.exists() ? visitSnap.data().count : 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error.message);
        setStats((prev) => ({
          ...prev,
          applications: 'Error',
          visits: 'Error',
        }));
      }
    };

    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary dark:text-accent">
            <PageTitle>⚡ Welcome, {user?.email}</PageTitle>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            You are logged in as{' '}
            <strong className="text-primary dark:text-accent">
              {role?.toUpperCase()}
            </strong>.
          </p>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard label="👥 Total Users" value={stats.users} />
          <StatCard label="📰 Blog Posts" value={stats.posts} />
          <StatCard label="📬 Contact Forms" value={stats.contacts} />
          <StatCard label="📝 Applications" value={stats.applications} />
          <StatCard label="📈 Site Visitors" value={stats.visits} />
        </div>
      </div>
    </AdminLayout>
  );
}

/* ─────────── Reusable card component ─────────── */
function StatCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-primary dark:text-accent">{label}</h3>
      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{value}</p>
    </div>
  );
}
