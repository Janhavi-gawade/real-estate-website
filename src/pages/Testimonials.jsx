import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah & James T.',
      location: 'NIBM, Pune',
      rating: 5,
      text: 'Ideal Property found us our dream home in NIBM. Their professionalism, market knowledge, and attention to detail were simply outstanding. The entire process was seamless from start to finish.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 2,
      name: 'Michael R.',
      location: 'Manhattan, NY',
      rating: 5,
      text: 'The best real estate firm we\'ve ever worked with. They handled the sale of our penthouse with absolute discretion and achieved a record price within just two weeks of listing.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 3,
      name: 'Elena V.',
      location: 'Kondhwa, Pune',
      rating: 5,
      text: 'Relocating internationally is stressful, but the team at Ideal Property made finding our new home a joy. Their personalized service is truly unmatched in the luxury sector.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 4,
      name: 'David & Amanda L.',
      location: 'Lullanagar, Pune',
      rating: 5,
      text: 'We were looking for a very specific property in Lullanagar. Ideal Property used their extensive network to find us an off-market gem that perfectly fit our requirements.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <div className="testimonials-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Client Testimonials</h1>
          <p>Read what our distinguished clients have to say</p>
        </div>
      </div>

      <section className="section bg-black text-white">
        <div className="container">
          <div className="testimonials-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <img src={review.image} alt={review.name} className="reviewer-img" />
                  <div>
                    <h4>{review.name}</h4>
                    <p className="reviewer-location">{review.location}</p>
                  </div>
                </div>
                <div className="stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--color-primary)" color="var(--color-primary)" />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
