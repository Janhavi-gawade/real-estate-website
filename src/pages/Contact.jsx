import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our luxury real estate specialists</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2">
            <div className="contact-info">
              <h2 className="mb-4">Let's start a conversation</h2>
              <p className="text-gray mb-4">
                Whether you are looking to buy, sell, or simply explore the luxury real estate market, our team is at your disposal.
              </p>
              
              <div className="info-list">
                <div className="info-item">
                  <MapPin className="info-icon" size={24} />
                  <div>
                    <h4>Office Address</h4>
                    <p>Office No5, 1st floor, Dharmavat Corner Building, Opp. Gagan Avenue, Kondhwa, Pune-411048</p>
                    <a href="https://maps.app.goo.gl/vLx5b7E1ae6VT5jF7" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontSize: '0.875rem', fontWeight: '500', display: 'inline-block', marginTop: '4px' }}>
                      Get Directions &rarr;
                    </a>
                  </div>
                </div>
                <div className="info-item">
                  <Phone className="info-icon" size={24} />
                  <div>
                    <h4>Phone Number</h4>
                    <p>+91 8806861786 / +91 8668289899</p>
                  </div>
                </div>
                <div className="info-item">
                  <Mail className="info-icon" size={24} />
                  <div>
                    <h4>Email Address</h4>
                    <p>ideal99property@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <Clock className="info-icon" size={24} />
                  <div>
                    <h4>Working Hours</h4>
                    <p>All days in week, 10:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <a href="https://wa.me/918806861786" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{display: 'inline-flex', alignItems: 'center'}}>
                  <MessageCircle size={20} style={{marginRight: '10px'}}/> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="contact-form-container">
              <form className="contact-form">
                <h3>Send Us a Message</h3>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject">
                    <option value="buy">Buying Property</option>
                    <option value="sell">Selling Property</option>
                    <option value="rent">Renting Property</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="5" placeholder="How can we help you?" required></textarea>
                </div>
                <Button variant="primary" style={{width: '100%'}}>Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full width map */}
      <div className="map-full">
        <iframe 
          src="https://www.google.com/maps?q=Dharmavat+Corner,+Opp.+Gagan+Avenue,+Kondhwa,+Pune-411048&output=embed" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
