import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Square, MapPin } from 'lucide-react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card animate-fade-in">
      <div className="property-image-container">
        <div className="property-badge">{property.status}</div>
        <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'} alt={property.title} className="property-image" />
        <div className="property-price">{property.price}</div>
      </div>
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          <MapPin size={16} /> {property.location}
        </p>
        <div className="property-features">
          <div className="feature">
            <Building2 size={18} />
            <span>{property.type}</span>
          </div>
          <div className="feature">
            <Square size={18} />
            <span>{property.carpetArea}</span>
          </div>
        </div>
        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
