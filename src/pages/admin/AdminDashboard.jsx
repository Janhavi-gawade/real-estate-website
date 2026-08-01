import React, { useEffect, useState } from 'react';
import { getProperties, getEnquiries } from '../../services/adminService';
import { Building2, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    featured: 0,
    enquiries: 0,
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [properties, enquiries] = await Promise.all([
          getProperties(),
          getEnquiries()
        ]);

        setStats({
          total: properties.length,
          active: properties.filter(p => p.status === 'Available').length,
          featured: properties.filter(p => p.featured).length,
          enquiries: enquiries.length,
          recentEnquiries: enquiries.slice(0, 5).reverse() // Latest 5
        });
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Stat Cards */}
        <div className="admin-card" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#eff6ff', color: '#3b82f6', borderRadius: '12px' }}>
            <Building2 size={24} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Total Properties</p>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', color: '#0f172a' }}>{stats.total}</h3>
          </div>
        </div>
        
        <div className="admin-card" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#f0fdf4', color: '#22c55e', borderRadius: '12px' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Active Properties</p>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', color: '#0f172a' }}>{stats.active}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '12px' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Total Enquiries</p>
            <h3 style={{ margin: '4px 0 0 0', fontSize: '1.5rem', color: '#0f172a' }}>{stats.enquiries}</h3>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Enquiries</h3>
            <Link to="/admin/enquiries" className="admin-btn secondary" style={{ textDecoration: 'none' }}>View All</Link>
          </div>
          
          {stats.recentEnquiries.length === 0 ? (
            <p style={{ color: '#64748b' }}>No recent enquiries.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '12px 0' }}>Name</th>
                    <th style={{ padding: '12px 0' }}>Property</th>
                    <th style={{ padding: '12px 0' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentEnquiries.map(enq => (
                    <tr key={enq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 0', fontWeight: '500', color: '#0f172a' }}>{enq.name}</td>
                      <td style={{ padding: '16px 0', color: '#475569' }}>{enq.propertyOfInterest}</td>
                      <td style={{ padding: '16px 0', color: '#64748b', fontSize: '0.875rem' }}>
                        {new Date(enq.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
