import React, { useState, useEffect } from 'react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../services/adminService';
import { Trash2, CheckCircle, Mail, Phone, Clock } from 'lucide-react';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    const data = await getEnquiries();
    setEnquiries(data.reverse()); // Newest first
    setLoading(false);
  };

  const handleToggleContacted = async (id, currentStatus) => {
    await updateEnquiryStatus(id, !currentStatus);
    fetchEnquiries();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      await deleteEnquiry(id);
      fetchEnquiries();
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Enquiries</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {enquiries.map(enq => (
          <div key={enq.id} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px', 
            padding: '20px', 
            backgroundColor: enq.contacted ? '#f8fafc' : '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.125rem', color: '#0f172a' }}>{enq.name}</h4>
                <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {enq.phone}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {enq.email}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className={`admin-btn ${enq.contacted ? 'secondary' : ''}`} 
                  style={{ padding: '6px 12px', fontSize: '0.875rem' }}
                  onClick={() => handleToggleContacted(enq.id, enq.contacted)}
                >
                  <CheckCircle size={16} /> {enq.contacted ? 'Contacted' : 'Mark as Contacted'}
                </button>
                <button className="admin-btn danger" style={{ padding: '6px' }} onClick={() => handleDelete(enq.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div style={{ padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', color: '#475569' }}>
                Interested In: <span style={{ color: '#0f172a' }}>{enq.propertyOfInterest}</span>
              </strong>
              <p style={{ margin: 0, color: '#334155' }}>"{enq.message}"</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '0.75rem' }}>
              <Clock size={12} /> {new Date(enq.date).toLocaleString()}
            </div>
          </div>
        ))}
        {enquiries.length === 0 && (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '32px' }}>No enquiries found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;
