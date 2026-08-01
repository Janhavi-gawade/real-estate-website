import React from 'react';
import './AreasWeServe.css';

const AreasWeServe = () => {
  const areas = [
    {
      name: 'Kondhwa',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'A thriving residential hub offering a mix of premium apartments and commercial spaces.'
    },
    {
      name: 'NIBM',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Upscale locality known for its luxury residential projects and excellent connectivity.'
    },
    {
      name: 'Undri',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Rapidly developing area offering modern living spaces amidst scenic surroundings.'
    },
    {
      name: 'Lullanagar',
      image: 'https://images.unsplash.com/photo-1533106497176-45ae14e17154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'A well-established, posh neighborhood featuring grand bungalows and premium flats.'
    },
    {
      name: 'Wanowrie',
      image: 'https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Known for its vibrant community and seamless blend of commercial and residential estates.'
    },
    {
      name: 'Pisoli & Yevlewadi',
      image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Emerging destinations for smart investments in residential and land properties.'
    }
  ];

  return (
    <div className="areas-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Areas We Serve</h1>
          <p>Discover our exclusive luxury markets</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="areas-grid">
            {areas.map((area, index) => (
              <div key={index} className="area-card">
                <div className="area-image-container">
                  <img src={area.image} alt={area.name} className="area-image" />
                  <div className="area-overlay">
                    <div className="area-content">
                      <h3>{area.name}</h3>
                      <p>{area.description}</p>
                      <button className="btn btn-outline area-btn">View Properties</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreasWeServe;
