import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, Square, MapPin, Check, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import { getProperties, getSettings, saveEnquiry } from '../services/adminService';
import { optimizeImage } from '../utils/imageUtils';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  
  const [property, setProperty] = useState(null);
  const [settings, setSettings] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Enquiry form state
  const [enquiry, setEnquiry] = useState({ name: '', email: '', phone: '', message: '' });
  const [enquirySent, setEnquirySent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [allProps, settingsData] = await Promise.all([
        getProperties(),
        getSettings()
      ]);
      const found = allProps.find(p => p.id === id);
      if (found) {
        setProperty(found);
        setMainImage(found.images && found.images.length > 0 ? found.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800');
      }
      setSettings(settingsData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const newEnquiry = {
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        message: enquiry.message,
        propertyOfInterest: property.title,
        date: new Date().toISOString(),
        contacted: false
      };
      
      await saveEnquiry(newEnquiry);
      
      setEnquirySent(true);
      setEnquiry({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error("Failed to send enquiry:", error);
      alert("Failed to send enquiry. Please try again or contact via phone.");
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (!property) return <div style={{ textAlign: 'center', padding: '100px' }}>Property not found.</div>;

  const validImages = property.images && property.images.length > 0 ? property.images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'];

  return (
    <div className="property-details-page animate-fade-in">
      <div className="container" style={{paddingTop: '2rem'}}>
        <Link to="/properties" className="back-link">
          <ArrowLeft size={16} /> Back to Properties
        </Link>
      </div>

      <section className="section" style={{paddingTop: '1rem'}}>
        <div className="container">
          <div className="details-header">
            <div>
              <div className="status-badge">{property.status}</div>
              <h1>{property.title}</h1>
              <p className="location"><MapPin size={18} /> {property.location}</p>
            </div>
            <div className="price-tag">{property.price}</div>
          </div>

          <div className="gallery-section">
            <div className="main-image">
              <img src={optimizeImage(mainImage, 1200)} alt={property.title} />
            </div>
            <div className="thumbnail-grid">
              {validImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={optimizeImage(img, 400)} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 mt-5" style={{gap: '3rem'}}>
            <div className="details-content" style={{gridColumn: 'span 2'}}>
              <div className="property-key-features">
                <div className="feature-box">
                  <Building2 size={24} />
                  <div>
                    <span className="value">{property.type}</span>
                    <span className="label">Type</span>
                  </div>
                </div>
                <div className="feature-box">
                  <Square size={24} />
                  <div>
                    <span className="value">{property.carpetArea}</span>
                    <span className="label">Carpet Area</span>
                  </div>
                </div>
              </div>

              <div className="details-block">
                <h3>Property Description</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{property.fullDescription}</p>
              </div>

              <div className="details-block">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <Check size={18} className="text-primary" /> {amenity}
                    </div>
                  ))}
                  {(!property.amenities || property.amenities.length === 0) && (
                    <p>No amenities listed.</p>
                  )}
                </div>
              </div>

              {property.mapsLink && (
                <div className="details-block">
                  <h3>Location Map</h3>
                  <a href={property.mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} /> Open in Google Maps
                  </a>
                </div>
              )}
            </div>

            <div className="sidebar">
              <div className="inquiry-card">
                <h3>Interested in this property?</h3>
                <p>Contact our agent to schedule a viewing or request more details.</p>
                
                <div className="contact-buttons">
                  <a href={`tel:${settings?.contactPhone || '+918806861786'}`} className="btn btn-outline" style={{display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px'}}>
                    <Phone size={18} style={{marginRight: '8px'}}/> Call Agent
                  </a>
                  <a href={`https://wa.me/${settings?.contactWhatsApp ? (settings.contactWhatsApp.replace(/[^0-9]/g, '').length === 10 ? '91' + settings.contactWhatsApp.replace(/[^0-9]/g, '') : settings.contactWhatsApp.replace(/[^0-9]/g, '')) : '918806861786'}?text=${encodeURIComponent('Hi, I am interested in the property: ' + property.title)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '20px'}}>
                    <MessageCircle size={18} style={{marginRight: '8px'}}/> WhatsApp
                  </a>
                </div>

                {enquirySent ? (
                  <div style={{ padding: '20px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '8px', textAlign: 'center' }}>
                    <strong>Thank you!</strong><br/> Your enquiry has been sent. Our team will contact you shortly.
                  </div>
                ) : (
                  <form className="inquiry-form" onSubmit={handleEnquirySubmit}>
                    <div className="form-group">
                      <input type="text" placeholder="Your Name" required value={enquiry.name} onChange={e => setEnquiry({...enquiry, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <input type="email" placeholder="Your Email" required value={enquiry.email} onChange={e => setEnquiry({...enquiry, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <input type="tel" placeholder="Your Phone" required value={enquiry.phone} onChange={e => setEnquiry({...enquiry, phone: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <textarea rows="4" placeholder="I am interested in this property..." required value={enquiry.message} onChange={e => setEnquiry({...enquiry, message: e.target.value})}></textarea>
                    </div>
                    <Button type="submit" variant="dark" style={{width: '100%'}}>Send Request</Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
