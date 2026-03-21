import React, { useState, useEffect } from 'react';
import { loginUser } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Link added here
import Seo from '../components/Seo';
import SeoConfig from '../config/SeoConfig';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [canRetry, setCanRetry] = useState(false); // ✅ Retry state

  // ✅ Detect when internet comes back
  useEffect(() => {
    const handleOnline = () => {
      if (error.includes('No internet connection')) {
        setCanRetry(true);
      }
    };
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setCanRetry(false);
    setLoading(true);

    try {
      const user = await loginUser(form.email, form.password);
      console.log('Logged in as:', user.email);
      navigate('/dashboard'); // ✅ Redirect on successful login
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/network-request-failed' || !navigator.onLine) {
        setError('No internet connection. Please check your network and try again.');
        // Retry will appear once connection is back
      } else {
        setError('Invalid credentials or user not found.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo {...SeoConfig.login} />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-primary">
            GiiTech Admin Login
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {error && (
            <div className="text-center space-y-2">
              <p className="text-red-500 text-sm">{error}</p>
              {canRetry && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-cta text-white px-4 py-2 rounded-md hover:bg-primary transition"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary text-white py-3 rounded-md hover:bg-cta transition flex items-center justify-center ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>

          {/* ✅ Back to Homepage */}
          <Link
            to="/"
            className="block mt-4 text-center text-sm text-primary hover:underline"
          >
            ← Back to Homepage
          </Link>
        </form>
      </div>
    </>
  );
}
