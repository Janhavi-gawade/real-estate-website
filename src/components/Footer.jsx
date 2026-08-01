import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, MessageSquare, Share2, Camera } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <img src="/logo.jpg" alt="Ideal Property" style={{ height: '90px', width: 'auto', maxWidth: '300px', objectFit: 'contain', marginBottom: '1.5rem', background: '#fff', padding: '10px', borderRadius: '4px' }} />
          <p className="footer-description">
            Deeply experienced in property dealing and consultancy with 20+ years of trust. Providing services in buying, selling, and leasing residential and commercial properties in Pune.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><Globe size={20} /></a>
            <a href="#" aria-label="Twitter"><MessageSquare size={20} /></a>
            <a href="#" aria-label="Instagram"><Camera size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Share2 size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Office No5, 1st floor, Dharmavat Corner Building, Opp. Gagan Avenue, Kondhwa, Pune-411048</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+91 8806861786<br/>+91 8668289899</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>ideal99property@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Location</h3>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.819777174621!2d-118.4042211244304!3d34.074151716584286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1689255012345!5m2!1sen!2sus" 
              width="100%" 
              height="150" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ideal Property. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
