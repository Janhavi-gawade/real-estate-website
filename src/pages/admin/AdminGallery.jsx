import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('re_gallery');
    if (data) {
      setImages(JSON.parse(data));
    } else {
      const initial = [
        { id: '1', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' },
        { id: '2', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' }
      ];
      setImages(initial);
      localStorage.setItem('re_gallery', JSON.stringify(initial));
    }
  }, []);

  const saveToStorage = (data) => {
    setImages(data);
    localStorage.setItem('re_gallery', JSON.stringify(data));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newUrl) return;
    saveToStorage([...images, { id: Date.now().toString(), url: newUrl }]);
    setNewUrl('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this image?')) {
      saveToStorage(images.filter(img => img.id !== id));
    }
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    if (direction === 'up' && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    } else if (direction === 'down' && index < newImages.length - 1) {
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
    }
    saveToStorage(newImages);
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Gallery Management</h3>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <input 
          type="url" 
          value={newUrl} 
          onChange={e => setNewUrl(e.target.value)} 
          placeholder="Paste image URL here..." 
          style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          required
        />
        <button type="submit" className="admin-btn"><Plus size={18} /> Add Image</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {images.map((img, index) => (
          <div key={img.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <img src={img.url} alt="Gallery" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px', background: 'rgba(255,255,255,0.9)', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <button className="admin-btn secondary" style={{ padding: '6px' }} onClick={() => moveImage(index, 'up')} disabled={index === 0}>
                <ArrowUp size={16} />
              </button>
              <button className="admin-btn secondary" style={{ padding: '6px' }} onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1}>
                <ArrowDown size={16} />
              </button>
              <button className="admin-btn danger" style={{ padding: '6px' }} onClick={() => handleDelete(img.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
