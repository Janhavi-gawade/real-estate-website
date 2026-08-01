import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../../services/adminService';
import { Save } from 'lucide-react';

const AdminContent = () => {
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

  if (loading) return <div>Loading content settings...</div>;

  return (
    <div className="admin-card" style={{ maxWidth: '800px' }}>
      <div className="admin-card-header">
        <h3 className="admin-card-title">Homepage Content</h3>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Hero Banner Image URL</label>
          <input 
            type="url" 
            value={settings.heroBanner} 
            onChange={e => setSettings({...settings, heroBanner: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            required 
          />
          {settings.heroBanner && (
            <img src={settings.heroBanner} alt="Hero Banner Preview" style={{ marginTop: '12px', height: '200px', width: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Hero Heading</label>
          <input 
            type="text" 
            value={settings.heroHeading} 
            onChange={e => setSettings({...settings, heroHeading: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            required 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Hero Subheading</label>
          <textarea 
            rows="3" 
            value={settings.heroSubheading} 
            onChange={e => setSettings({...settings, heroSubheading: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', resize: 'vertical' }} 
            required 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Call-to-Action Button Text</label>
          <input 
            type="text" 
            value={settings.ctaText} 
            onChange={e => setSettings({...settings, ctaText: e.target.value})} 
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
            required 
          />
        </div>

        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ marginBottom: '16px', color: '#0f172a' }}>About Us Page</h4>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Founder Name</label>
              <input 
                type="text" 
                value={settings.founderName || ''} 
                onChange={e => setSettings({...settings, founderName: e.target.value})} 
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Founder Photo URL</label>
              <input 
                type="url" 
                value={settings.founderPhoto || ''} 
                onChange={e => setSettings({...settings, founderPhoto: e.target.value})} 
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} 
                placeholder="https://..."
              />
              {settings.founderPhoto && (
                <img src={settings.founderPhoto} alt="Founder Preview" style={{ marginTop: '12px', height: '100px', width: '100px', objectFit: 'cover', borderRadius: '50%' }} />
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button type="submit" className="admin-btn" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'Save Content'}
          </button>
          {success && <span style={{ color: '#16a34a', fontWeight: '500' }}>Settings saved successfully!</span>}
        </div>
      </form>
    </div>
  );
};

export default AdminContent;
