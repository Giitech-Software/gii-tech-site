import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="text-center mt-10 text-primary">Loading user info…</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !role && !timeoutReached)
    return <div className="text-center mt-10 text-primary">Checking permissions…</div>;

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.warn('⛔ Blocked access — role =', role);
    return <Navigate to="/" replace />;
  }

  return children;
}
