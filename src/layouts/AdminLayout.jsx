import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  MessageSquare, 
  LayoutTemplate, 
  MessageCircleHeart, 
  Image as ImageIcon, 
  Contact,
  LogOut
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/properties', icon: Building2, label: 'Properties' },
    { path: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
    { path: '/admin/content', icon: LayoutTemplate, label: 'Homepage Content' },
    { path: '/admin/testimonials', icon: MessageCircleHeart, label: 'Testimonials' },
    { path: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
    { path: '/admin/contact', icon: Contact, label: 'Contact Info' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/admin/login" className="admin-nav-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
          <Link to="/" className="admin-nav-item view-site" target="_blank">
            <span>View Live Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{navItems.find(item => item.path === location.pathname)?.label || 'Admin'}</h1>
        </header>
        <div className="admin-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
