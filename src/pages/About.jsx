import React, { useState, useEffect } from 'react';
import { getSettings } from '../services/adminService';
import './About.css';

const About = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <div className="about-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Discover the story behind Ideal Property</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 align-items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Estate" 
                className="about-image"
              />
            </div>
            <div className="about-content">
              <h2>Our Story</h2>
              <p>
                At Ideal Property, we are deeply experienced in property dealing and consultancy. With over 20+ years of excellence, we believe that buying or selling a property should be a seamless experience based on absolute trust.
              </p>
              <p>
                We provide a comprehensive range of services in the buying, selling, and leasing of residential and commercial properties—including land, flats, shops, and offices across Pune.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-black text-white">
        <div className="container text-center">
          <h2 className="section-title text-primary">Mission & Vision</h2>
          <div className="grid grid-cols-2 mt-5">
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>To provide unparalleled service, absolute discretion, and expert guidance to clients navigating the luxury real estate market.</p>
            </div>
            <div className="mission-card">
              <h3>Our Vision</h3>
              <p>To remain the most trusted and respected luxury real estate brokerage globally, setting the standard for excellence in the industry.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Meet Our Founder</h2>
          <div className="grid grid-cols-2 align-items-center">
            <div className="founder-content">
              <h3>{settings?.founderName || 'Firoz Sayyad'}</h3>
              <h4 className="title">CEO & Founder</h4>
              <p>
                With over 20+ years of deep experience in property dealing and consultancy, {settings?.founderName?.split(' ')[0] || 'Firoz'} has facilitated some of the most significant property transactions in the Pune region. His extensive network and intimate knowledge of the market make him an invaluable asset to his clients.
              </p>
              <p>
                "At Ideal Property, trust is our unique selling proposition. We don't just sell properties; we build lasting relationships by finding the perfect synergy between our clients and their future homes or businesses."
              </p>
            </div>
            <div>
              <img 
                src={settings?.founderPhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={`${settings?.founderName || 'Firoz Sayyad'} - CEO`} 
                className="founder-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
