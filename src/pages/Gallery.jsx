import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [filter, setFilter] = useState('all');

  const galleryImages = [
    { id: 1, category: 'property', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Modern Villa Exterior' },
    { id: 2, category: 'interior', src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Luxury Living Room' },
    { id: 3, category: 'property', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Lakefront Estate' },
    { id: 4, category: 'office', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Corporate Office' },
    { id: 5, category: 'interior', src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Designer Kitchen' },
    { id: 6, category: 'sold', src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Sold: Malibu Mansion' },
    { id: 7, category: 'property', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Historic Townhouse' },
    { id: 8, category: 'sold', src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Sold: Penthouse Suite' },
    { id: 9, category: 'office', src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Luxe Estates HQ' }
  ];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="gallery-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Visual Gallery</h1>
          <p>A glimpse into our world of luxury</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filters-container">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Photos</button>
            <button className={`filter-btn ${filter === 'property' ? 'active' : ''}`} onClick={() => setFilter('property')}>Properties</button>
            <button className={`filter-btn ${filter === 'interior' ? 'active' : ''}`} onClick={() => setFilter('interior')}>Interiors</button>
            <button className={`filter-btn ${filter === 'office' ? 'active' : ''}`} onClick={() => setFilter('office')}>Our Office</button>
            <button className={`filter-btn ${filter === 'sold' ? 'active' : ''}`} onClick={() => setFilter('sold')}>Recently Sold</button>
          </div>

          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.src} alt={image.title} />
                <div className="gallery-overlay">
                  <h4>{image.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
