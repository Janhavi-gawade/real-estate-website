import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../../services/adminService';
import { Save } from 'lucide-react';

const AdminContact = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      setSettings(data);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await saveSettings(settings);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <div>Loading contact settings...</div>;

  return (
    <div className="admin-card" style={{ maxWidth: '800px' }}>
      <div className="admin-card-header">
        <h3 className="admin-card-title">Contact Information</h3>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number</label>
            <input 
              type="text" 
              value={settings.contactPhone} 
              onChange={e => setSettings({...settings, contactPhone: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>WhatsApp Number</label>
            <input 
              type="text" 
              value={settings.contactWhatsApp} 
              onChange={e => setSettings({...settings, contactWhatsApp: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
          <input 
            type="email" 
            value={settings.contactEmail} 
            onChange={e => setSettings({...settings, contactEmail: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            required 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Office Address</label>
          <textarea 
            rows="3" 
            value={settings.officeAddress} 
            onChange={e => setSettings({...settings, officeAddress: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} 
            required 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Google Maps Embed Link</label>
          <input 
            type="url" 
            value={settings.mapsEmbedLink} 
            onChange={e => setSettings({...settings, mapsEmbedLink: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            placeholder="https://www.google.com/maps/embed?..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Facebook Link</label>
            <input 
              type="url" 
              value={settings.facebookLink} 
              onChange={e => setSettings({...settings, facebookLink: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Instagram Link</label>
            <input 
              type="url" 
              value={settings.instagramLink} 
              onChange={e => setSettings({...settings, instagramLink: e.target.value})} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button type="submit" className="admin-btn" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'Save Contact Info'}
          </button>
          {success && <span style={{ color: '#16a34a', fontWeight: '500' }}>Settings saved successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminContact;
