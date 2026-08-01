import React from 'react';
import { Home, Key, Handshake, TrendingUp, Calculator } from 'lucide-react';
import './Services.css';

const Services = () => {
  const servicesList = [
    {
      icon: <Home size={40} />,
      title: 'Buying a Home',
      description: 'Our expert agents will guide you through the entire process of finding and purchasing your dream home, ensuring you make a sound investment.'
    },
    {
      icon: <Key size={40} />,
      title: 'Selling Property',
      description: 'We provide comprehensive marketing strategies, professional staging advice, and expert negotiation to get the best price for your property.'
    },
    {
      icon: <Handshake size={40} />,
      title: 'Rental Services',
      description: 'Whether you are looking for a luxury lease or need assistance managing a premium rental property, our team is here to help.'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Investment Consultation',
      description: 'Identify lucrative real estate opportunities with our data-driven insights and deep understanding of market trends.'
    },
    {
      icon: <Calculator size={40} />,
      title: 'Loan Assistance',
      description: 'We connect you with top-tier financial institutions to secure the best mortgage rates and financing options tailored to your needs.'
    }
  ];

  return (
    <div className="services-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive luxury real estate solutions</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {servicesList.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-black text-primary text-center">
        <div className="container">
          <h2 style={{color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1rem'}}>Need Expert Advice?</h2>
          <p style={{color: 'var(--color-off-white)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem'}}>
            Our team of luxury real estate specialists is ready to assist you with all your property needs.
          </p>
          <a href="/contact" className="btn btn-primary" style={{display: 'inline-block'}}>Book a Consultation</a>
        </div>
      </section>
    </div>
  );
};

export default Services;
