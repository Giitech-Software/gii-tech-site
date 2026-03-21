import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Topbar from './Topbar';

// Font Awesome Icons
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaUsers,
  FaWpforms,
  FaUserPlus,
  FaTools,
  FaBriefcase,
  FaScroll,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaPenNib,
  FaPlusCircle,
  FaRegNewspaper,
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const { user, role, logout } = useAuth();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarVar = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">GiiTech Admin</h2>
        <p className="text-sm text-teal-200">{role?.toUpperCase()}</p>
      </div>
<nav className="space-y-4">
  <Link to="/dashboard" className="flex items-center gap-2 hover:text-cta"><FaTachometerAlt /> Dashboard</Link>
  <Link to="/admin/users" className="flex items-center gap-2 hover:text-cta"><FaUsers /> Manage Users</Link>
  <Link to="/admin/forms" className="flex items-center gap-2 hover:text-cta"><FaWpforms /> Contact Forms</Link>
  <Link to="/admin/add-user" className="flex items-center gap-2 hover:text-cta"><FaUserPlus /> Add User</Link>

  {/* Services */}
  <Link to="/admin/services" className="flex items-center gap-2 hover:text-cta"><FaTools /> Add Service</Link>
  <Link to="/admin/manage-services" className="flex items-center gap-2 hover:text-cta"><FaCog /> Manage Services</Link>

  {/* Projects & Blog */}
  <Link to="/admin/add-project" className="flex items-center gap-2 hover:text-cta"><FaBriefcase /> Add Project</Link>
  <Link to="/admin/add-post" className="flex items-center gap-2 hover:text-cta"><FaPenNib /> Add Post</Link>
  <Link to="/admin/manage-posts" className="flex items-center gap-2 hover:text-cta"><FaRegNewspaper /> Manage Posts</Link>
        
  {/* FAQ */}
  <Link to="/admin/add-faq" className="flex items-center gap-2 hover:text-cta"><FaPlusCircle /> Add FAQ</Link>
  <Link to="/admin/manage-faqs" className="flex items-center gap-2 hover:text-cta"><FaTools /> Manage FAQs</Link>

  <Link to="/admin/activity-logs" className="flex items-center gap-2 hover:text-cta"><FaScroll /> Activity Logs</Link>
  <Link to="/admin/jobs" className="flex items-center gap-2 hover:text-cta"><FaBriefcase /> Manage Jobs</Link>
  <Link to="/admin/profile" className="flex items-center gap-2 hover:text-cta"><FaUserCircle /> My Profile</Link>
  <Link to="/admin/settings" className="flex items-center gap-2 hover:text-cta"><FaCog /> Site Settings</Link>
</nav>

      <div className="mt-10 text-xs text-gray-300 space-y-2">
        <p>
          Logged in as<br />{user?.email}
        </p>
        <button
          onClick={handleLogout}
          className="mt-2 inline-flex items-center gap-2 text-sm text-red-300 hover:text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-primary text-white pt-[72px] p-2 fixed top-0 left-0 h-full z-40">
        <SidebarContent />
      </div>

      {/* Mobile: Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-2 bg-primary text-white rounded-md"
      >
        <FaBars size={20} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-[64px] bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-[64px] left-0 z-40 h-[calc(100%-64px)] w-64 overflow-y-auto bg-primary text-white shadow-lg"
              variants={sidebarVar}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            >
              <div className="flex justify-end px-4 pt-4">
                <button onClick={() => setOpen(false)} className="text-white">
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="px-6 pt-2 pb-6">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 pt-[72px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 pb-4 w-full lg:pl-[220px] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
