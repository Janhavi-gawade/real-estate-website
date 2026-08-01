import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../services/adminService';
import './Properties.css';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('location') || '';
  const typeParam = searchParams.get('type') || '';

  const [filter, setFilter] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
      const data = await getProperties();
      setProperties(data);
      setLoading(false);
    };
    fetchProps();
  }, []);

  useEffect(() => {
    if (typeParam) {
      setFilter(typeParam);
    }
  }, [typeParam]);

  let filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.type === filter || (filter === 'buy' && p.status === 'For Sale') || (filter === 'rent' && p.status === 'For Rent'));

  if (locationParam) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(locationParam.toLowerCase())
    );
  }

  return (
    <div className="properties-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Exclusive Properties</h1>
          <p>Browse our curated collection of luxury real estate</p>
        </div>
      </div>

      <section className="section bg-light">
        <div className="container">
          {/* Filters */}
          <div className="filters-container">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === '1BHK' ? 'active' : ''}`}
              onClick={() => setFilter('1BHK')}
            >
              1BHK
            </button>
            <button 
              className={`filter-btn ${filter === '2BHK' ? 'active' : ''}`}
              onClick={() => setFilter('2BHK')}
            >
              2BHK
            </button>
            <button 
              className={`filter-btn ${filter === '3BHK' ? 'active' : ''}`}
              onClick={() => setFilter('3BHK')}
            >
              3BHK
            </button>
            <button 
              className={`filter-btn ${filter === 'Villa' ? 'active' : ''}`}
              onClick={() => setFilter('Villa')}
            >
              Villas
            </button>
            <button 
              className={`filter-btn ${filter === 'Commercial' ? 'active' : ''}`}
              onClick={() => setFilter('Commercial')}
            >
              Commercial
            </button>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center mt-5">Loading properties...</div>
          ) : (
            <>
              <div className="grid grid-cols-3">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              {filteredProperties.length === 0 && (
                <div className="text-center mt-5">
                  <p>No properties found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
