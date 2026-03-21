import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { logActivity } from '../../utils/activityLog';
import PageTitle from '../../components/PageTitle';
import AdminLayout from '../../components/AdminLayout';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

export default function AddUser() {
  const [form, setForm] = useState({ email: '', password: '', role: 'admin' });
  const [status, setStatus] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const fetchUsers = async () => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const userList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const auth = getAuth();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const userId = userCred.user.uid;

      await setDoc(doc(db, 'users', userId), {
        email: form.email,
        role: form.role,
        createdAt: new Date(),
      });

      await logActivity(user, 'add_user', `Added user: ${form.email} (${form.role})`);
      setStatus('✅ User added successfully!');
      setForm({ email: '', password: '', role: 'admin' });
      fetchUsers();
    } catch (err) {
      console.error('❌ Error:', err.message);
      setStatus('❌ Failed to add user: ' + err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-3xl mx-auto">
        <PageTitle>➕ Add New User</PageTitle>

        {status && (
          <p className="mb-4 text-sm text-center text-green-700 dark:text-green-400">{status}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded shadow mb-10"
        >
          <input
            type="email"
            name="email"
            placeholder="User Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded hover:bg-cta transition"
          >
            Add User
          </button>
        </form>

        <h2 className="text-xl font-bold text-primary mb-4">👥 Existing Users</h2>
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="border p-3 rounded shadow-sm flex justify-between items-center bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{u.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Role: {u.role}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(u.createdAt?.seconds * 1000).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
