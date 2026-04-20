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
    // Only lock body scroll on small screens when mobile menu is open
    if (window.innerWidth < 1024) {
      document.body.style.overflow = open ? 'hidden' : 'auto';
    }
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
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white">GiiTech Admin</h2>
        <p className="text-sm text-warm-amber font-medium tracking-wide">{role?.toUpperCase()}</p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        <Link to="/dashboard" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaTachometerAlt /> Dashboard</Link>
        <Link to="/admin/users" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaUsers /> Manage Users</Link>
        <Link to="/admin/forms" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaWpforms /> Contact Forms</Link>
        <Link to="/admin/add-user" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaUserPlus /> Add User</Link>

        <div className="pt-4 pb-2 text-[10px] uppercase text-gray-400 font-bold tracking-widest">Services & Projects</div>
        <Link to="/admin/services" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaTools /> Add Service</Link>
        <Link to="/admin/manage-services" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaCog /> Manage Services</Link>
        
        {/* Project Links Grouped Together */}
        <Link to="/admin/add-project" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaBriefcase /> Add Project</Link>
        <Link to="/admin/manage-projects" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaCog /> Manage Projects</Link>
        
        <Link to="/admin/add-post" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaPenNib /> Add Post</Link>
        <Link to="/admin/manage-posts" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaRegNewspaper /> Manage Posts</Link>

        <div className="pt-4 pb-2 text-[10px] uppercase text-gray-400 font-bold tracking-widest">Support & Settings</div>
        <Link to="/admin/add-faq" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaPlusCircle /> Add FAQ</Link>
        <Link to="/admin/manage-faqs" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaTools /> Manage FAQs</Link>
        <Link to="/admin/activity-logs" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaScroll /> Activity Logs</Link>
        <Link to="/admin/jobs" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaBriefcase /> Manage Jobs</Link>
        <Link to="/admin/profile" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaUserCircle /> My Profile</Link>
        <Link to="/admin/settings" className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-colors"><FaCog /> Site Settings</Link>
      </nav>
  

      <div className="mt-auto pt-6 border-t border-white/10 text-xs text-gray-300 space-y-4">
        <p className="opacity-70 truncate">
          Logged in as: <br /><span className="text-white font-medium">{user?.email}</span>
        </p>
        <button
          onClick={handleLogout}
          className="w-full inline-flex items-center justify-center gap-2 text-sm bg-warm-terracotta hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-primary text-white fixed top-0 left-0 h-screen z-40 shadow-2xl">
        <div className="h-full pt-[80px] px-6 pb-6">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile: Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-2 bg-primary text-white rounded-md shadow-lg hover:bg-cta transition-colors"
      >
        <FaBars size={20} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 z-[120] h-screen w-72 bg-primary text-white shadow-2xl overflow-hidden"
              variants={sidebarVar}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="h-full flex flex-col p-6">
                <div className="flex justify-end mb-4">
                  <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white">
                    <FaTimes size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <SidebarContent />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 pt-[88px] pb-10 px-4 sm:px-6 md:px-8 lg:pl-[280px] transition-all duration-300">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}