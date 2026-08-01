import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Star } from 'lucide-react';

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('re_testimonials');
    if (data) {
      setTestimonials(JSON.parse(data));
    } else {
      const initial = [
        { id: '1', name: 'Ravi Kumar', review: 'Excellent service. Helped me find the perfect home.', rating: 5 }
      ];
      setTestimonials(initial);
      localStorage.setItem('re_testimonials', JSON.stringify(initial));
    }
  }, []);

  const saveToStorage = (data) => {
    setTestimonials(data);
    localStorage.setItem('re_testimonials', JSON.stringify(data));
  };

  const handleAddNew = () => {
    setFormData({ name: '', review: '', rating: 5 });
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this testimonial?')) {
      saveToStorage(testimonials.filter(t => t.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (formData.id) {
      saveToStorage(testimonials.map(t => t.id === formData.id ? formData : t));
    } else {
      saveToStorage([...testimonials, { ...formData, id: Date.now().toString() }]);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title">{formData.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <button className="admin-btn secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Customer Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Review</label>
            <textarea required rows="4" value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating (1-5)</label>
            <input required type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <button type="submit" className="admin-btn">Save Testimonial</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Testimonials</h3>
        <button className="admin-btn" onClick={handleAddNew}><Plus size={18} /> Add New</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {testimonials.map(t => (
          <div key={t.id} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <strong style={{ fontSize: '1.1rem' }}>{t.name}</strong>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="admin-btn secondary" style={{ padding: '4px' }} onClick={() => handleEdit(t)}><Edit2 size={14} /></button>
                <button className="admin-btn danger" style={{ padding: '4px' }} onClick={() => handleDelete(t.id)}><Trash2 size={14} /></button>
              </div>
            </div>
            <div style={{ color: '#eab308', display: 'flex', gap: '2px', marginBottom: '12px' }}>
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p style={{ margin: 0, color: '#475569', fontStyle: 'italic' }}>"{t.review}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
