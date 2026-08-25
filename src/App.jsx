import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Services from './pages/Services';
import AreasWeServe from './pages/AreasWeServe';
import Testimonials from './pages/Testimonials';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProperties from './pages/admin/AdminProperties';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminContent from './pages/admin/AdminContent';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminGallery from './pages/admin/AdminGallery';
import AdminContact from './pages/admin/AdminContact';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/areas-we-serve" element={<AreasWeServe />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login Route (No Sidebar) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes with Sidebar (Protected) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="properties" element={<AdminProperties />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="contact" element={<AdminContact />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
