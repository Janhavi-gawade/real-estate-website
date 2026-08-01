export const initialProperties = [
  {
    id: '1',
    title: 'Luxury 3BHK Villa with Pool',
    type: 'Villa',
    price: '₹2.5 Cr',
    location: 'Bandra West, Mumbai',
    carpetArea: '2500 sq.ft',
    status: 'Available',
    shortDescription: 'Beautiful 3 bedroom villa with private pool and garden.',
    fullDescription: 'This stunning property features a spacious layout, modern amenities, a private swimming pool, and a beautifully landscaped garden. Perfect for a family looking for luxury living in a prime location.',
    amenities: ['Pool', 'Garden', 'Gym', 'Parking', 'Security'],
    landmarks: 'Near Bandra Kurla Complex',
    mapsLink: 'https://maps.google.com/?q=Bandra+West',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
    featured: true
  },
  {
    id: '2',
    title: 'Modern 2BHK Apartment',
    type: '2BHK',
    price: '₹1.2 Cr',
    location: 'Andheri East, Mumbai',
    carpetArea: '950 sq.ft',
    status: 'Available',
    shortDescription: 'Spacious 2BHK in a premium residential complex.',
    fullDescription: 'A well-lit and ventilated 2BHK apartment with modern fittings. The complex offers a clubhouse, gym, and 24/7 security.',
    amenities: ['Gym', 'Clubhouse', 'Parking', 'Security'],
    landmarks: 'Near Metro Station',
    mapsLink: 'https://maps.google.com/?q=Andheri+East',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
    featured: false
  }
];

export const initialEnquiries = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul@example.com',
    propertyOfInterest: 'Luxury 3BHK Villa with Pool',
    message: 'I am interested in this property. Can we schedule a visit?',
    date: new Date().toISOString(),
    contacted: false
  }
];

export const initialSettings = {
  heroBanner: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
  heroHeading: 'Find Your Dream Home',
  heroSubheading: 'We help you find the perfect property that fits your lifestyle and budget.',
  ctaText: 'Explore Properties',
  contactPhone: '+91 9876543210',
  contactWhatsApp: '+91 9876543210',
  officeAddress: '123 Real Estate Plaza, Mumbai, Maharashtra',
  contactEmail: 'info@realestate.com',
  mapsEmbedLink: 'https://www.google.com/maps/embed?pb=...',
  facebookLink: 'https://facebook.com',
  instagramLink: 'https://instagram.com',
  founderName: 'Firoz Sayyad',
  founderPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800'
};

