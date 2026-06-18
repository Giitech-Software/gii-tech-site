import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddProject from './pages/admin/AddProject';
import ManagePosts from './pages/admin/ManagePosts';
import AddPost from './pages/admin/AddPost';
import EditPost from './pages/admin/EditPost';
import AddUser from './pages/admin/AddUser';
import Users from './pages/admin/Users';
import ContactForms from './pages/admin/ContactForms';
import ActivityLogs from './pages/admin/ActivityLogs';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import JobsAdmin from './pages/admin/JobsAdmin';
import AddJob from './pages/admin/AddJob';
import EditJob from './pages/admin/EditJob';
import EditService from './pages/admin/EditService';
import Settings from './pages/admin/Settings';
import AdminProfile from './pages/admin/AdminProfile';
import JobApplications from './pages/admin/JobApplications';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import ClientConfidence from './pages/ClientConfidence';
import FAQs from './pages/FAQs';
import ManageServices from './pages/admin/ManageServices';
import AddService from './pages/admin/AddService';
import ManageEnterpriseFeatures from './pages/admin/ManageEnterpriseFeatures';
import ManageClientTestimonials from './pages/admin/ManageClientTestimonials';

import ManageFAQs from './pages/admin/ManageFAQs';
import AddFAQ from './pages/admin/AddFAQ';
import EditFAQ from './pages/admin/EditFAQ';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import MainLayout from './components/MainLayout';
import ScrollToTop from './components/ScrollToTop';

import ManageProjects from './pages/admin/ManageProjects';
import EditProject from './pages/admin/EditProject';
import AddPartner from './pages/admin/AddPartner';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* Public pages wrapped with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/client-confidence" element={<ClientConfidence />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/admin/add-partner" element={<AddPartner />} />
          </Route>

          {/* Standalone login route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-project"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-post"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-post/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <EditPost />
              </ProtectedRoute>
            }
          />
<Route
  path="/admin/manage-posts"
  element={
    <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
      <ManagePosts />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/services"
  element={
    <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
      <AddService />
    </ProtectedRoute>
  }
/>
          <Route
            path="/admin/edit-service/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <EditService />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-services"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <ManageServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enterprise-features"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <ManageEnterpriseFeatures />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/client-testimonials"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <ManageClientTestimonials />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/forms"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <ContactForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/activity-logs"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <ActivityLogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <JobsAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-job"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-job/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications/:jobId"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <JobApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminLayout>
                  <Blog />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          

          {/* FAQ Management Routes */}
          <Route
            path="/admin/manage-faqs"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminLayout>
                  <ManageFAQs />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-faq"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminLayout>
                  <AddFAQ />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-faq/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                <AdminLayout>
                  <EditFAQ />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          {/* Project Management Routes */}
<Route
  path="/admin/manage-projects"
  element={
    <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
      <ManageProjects />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/edit-project/:id"
  element={
    <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
      <EditProject />
    </ProtectedRoute>
  }
/>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
