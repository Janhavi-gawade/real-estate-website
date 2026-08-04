import React, { useState, useEffect } from 'react';
import { getProperties, saveProperty, deleteProperty, API_URL } from '../../services/adminService';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  const emptyForm = {
    title: '', type: '2BHK', price: '', location: '', carpetArea: '',
    status: 'Available', shortDescription: '', fullDescription: '',
    amenities: [], landmarks: '', mapsLink: '', images: [''], featured: false
  };

  const availableAmenities = ['Gym', 'Pool', 'Parking', 'Security', 'Clubhouse', 'Power Backup', 'Garden'];
  const propertyTypes = ['1BHK', '2BHK', '3BHK', 'Villa', 'Plot', 'Commercial'];
  const statuses = ['Available', 'Sold', 'Under Construction'];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const data = await getProperties();
    setProperties(data);
    setLoading(false);
  };

  const handleAddNew = () => {
    setFormData(emptyForm);
    setIsEditing(true);
  };

  const handleEdit = (property) => {
    setFormData({ ...property });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(id);
      fetchProperties();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await saveProperty(formData);
    setIsEditing(false);
    fetchProperties();
  };

  const handleAmenityChange = (amenity) => {
    const newAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    setFormData({ ...formData, amenities: newAmenities });
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    
    const formDataObj = new FormData();
    formDataObj.append('image', file);
    
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formDataObj,
      });
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Upload failed: ${response.status} - ${errText}`);
      }
      const data = await response.json();
      
      const newImages = [...formData.images];
      newImages[index] = data.url;
      setFormData({ ...formData, images: newImages });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  if (loading) return <div>Loading properties...</div>;

  if (isEditing) {
    return (
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">{formData.id ? 'Edit Property' : 'Add New Property'}</h3>
          <button className="admin-btn secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Property Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Property Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Price</label>
              <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. ₹1.5 Cr" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Location</label>
              <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Carpet Area</label>
              <input required type="text" value={formData.carpetArea} onChange={e => setFormData({...formData, carpetArea: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="e.g. 1200 sq.ft" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Status</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Short Description</label>
            <input required type="text" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Description</label>
            <textarea required rows="4" value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Amenities</label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {availableAmenities.map(amenity => (
                <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => handleAmenityChange(amenity)} />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nearby Landmarks</label>
              <input type="text" value={formData.landmarks} onChange={e => setFormData({...formData, landmarks: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Google Maps Link</label>
              <input type="url" value={formData.mapsLink} onChange={e => setFormData({...formData, mapsLink: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Property Images (Upload or URL)</label>
            {formData.images.map((url, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                
                {/* File Input */}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => handleFileUpload(index, e.target.files[0])} 
                  style={{ width: '220px', padding: '6px', fontSize: '0.9rem' }} 
                />
                
                {/* Text input fallback for external URLs */}
                <input 
                  type="url" 
                  value={url} 
                  onChange={e => handleImageChange(index, e.target.value)} 
                  style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                  placeholder="Or paste image URL here..." 
                />

                {formData.images.length > 1 && (
                  <button type="button" onClick={() => removeImageField(index)} className="admin-btn danger" style={{ padding: '10px' }}><Trash2 size={16}/></button>
                )}
                {url && (
                  <img src={url} alt="Preview" style={{ height: '40px', width: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                )}
              </div>
            ))}
            <button type="button" onClick={addImageField} className="admin-btn secondary" style={{ marginTop: '8px', fontSize: '0.875rem' }}><Plus size={16}/> Add Another Image</button>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} style={{ width: '18px', height: '18px' }} />
              Mark as Featured Property
            </label>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <button type="submit" className="admin-btn">Save Property</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Properties</h3>
        <button className="admin-btn" onClick={handleAddNew}><Plus size={18} /> Add Property</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px 16px' }}>Image</th>
              <th style={{ padding: '12px 16px' }}>Title & Location</th>
              <th style={{ padding: '12px 16px' }}>Price</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Featured</th>
              <th style={{ padding: '12px 16px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px' }}>
                  <img src={property.images && property.images.length > 0 && property.images[0] ? property.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'} alt={property.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '500', color: '#0f172a' }}>{property.title}</div>
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{property.location}</div>
                </td>
                <td style={{ padding: '16px', fontWeight: '500' }}>{property.price}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    backgroundColor: property.status === 'Available' ? '#dcfce7' : property.status === 'Sold' ? '#f1f5f9' : '#fef9c3',
                    color: property.status === 'Available' ? '#166534' : property.status === 'Sold' ? '#475569' : '#854d0e'
                  }}>
                    {property.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  {property.featured ? <CheckCircle size={20} color="#3b82f6" /> : <XCircle size={20} color="#cbd5e1" />}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="admin-btn secondary" style={{ padding: '6px' }} onClick={() => handleEdit(property)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="admin-btn danger" style={{ padding: '6px' }} onClick={() => handleDelete(property.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>No properties found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProperties;
