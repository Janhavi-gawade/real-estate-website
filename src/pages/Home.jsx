import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, Key, Shield, Star, ChevronRight } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import Button from '../components/Button';
import { getProperties, getSettings } from '../services/adminService';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('');

  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [settings, setSettings] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [propsData, settingsData] = await Promise.all([
        getProperties(),
        getSettings()
      ]);
      setFeaturedProperties(propsData.filter(p => p.featured).slice(0, 3));
      setSettings(settingsData);
      
      const testData = localStorage.getItem('re_testimonials');
      if (testData) {
        setTestimonials(JSON.parse(testData));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.append('location', searchLocation);
    if (searchType) params.append('type', searchType);
    navigate(`/properties?${params.toString()}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${settings?.heroBanner})` }}>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="animate-fade-in">{settings?.heroHeading}</h1>
          <p className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            {settings?.heroSubheading}
          </p>
          
          <div className="search-bar animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="search-input-group">
              <MapPin size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by location..." 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div className="search-input-group">
              <Building size={20} className="search-icon" />
              <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="">Property Type</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <Button variant="primary" onClick={handleSearch}>
              <Search size={18} style={{marginRight: '8px'}}/> Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Featured Properties</h2>
          <div className="grid grid-cols-3">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          {featuredProperties.length === 0 && (
            <p className="text-center">No featured properties available.</p>
          )}
          <div className="text-center mt-5">
            <Link to="/properties">
              <Button variant="outline">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-us">
        <div className="container">
          <div className="grid grid-cols-2 align-items-center">
            <div className="why-content">
              <h2>Why Choose <span>Ideal Property</span></h2>
              <p>We provide unparalleled service with deep local knowledge to deliver exceptional results for our clients.</p>
              
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon"><Star size={24} /></div>
                  <div>
                    <h4>Premium Selection</h4>
                    <p>Access to off-market and exclusive luxury properties.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><Key size={24} /></div>
                  <div>
                    <h4>Expert Guidance</h4>
                    <p>Decades of experience in the high-end real estate market.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><Shield size={24} /></div>
                  <div>
                    <h4>Secure Transactions</h4>
                    <p>Complete transparency and legal support throughout the process.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-image-wrapper">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Luxury Interior" className="why-image" />
              <div className="experience-badge">
                <span className="years">20+</span>
                <span className="text">Years of<br/>Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials bg-black">
        <div className="container">
          <h2 className="section-title text-primary">Client Testimonials</h2>
          <div className="testimonial-grid">
            {testimonials.slice(0, 2).map(t => (
              <div className="testimonial-card" key={t.id}>
                <div className="stars">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" />)}
                </div>
                <p className="quote">"{t.review}"</p>
                <h5 className="author">- {t.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta">
        <div className="container text-center">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Contact our luxury real estate specialists today for a private consultation.</p>
          <div className="cta-buttons">
            <Link to="/contact">
              <Button variant="primary">{settings?.ctaText || 'Contact Us'}</Button>
            </Link>
            <Link to="/properties">
              <Button variant="outline">Browse Properties</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
