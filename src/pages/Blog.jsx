import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Luxury Real Estate Trends for 2024',
      excerpt: 'Discover the latest architectural and interior design trends shaping the ultra-luxury housing market this year.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'Oct 15, 2023',
      author: 'Alexander Sterling',
      category: 'Market Trends'
    },
    {
      id: 2,
      title: 'Investing in Waterfront Properties: What You Need to Know',
      excerpt: 'A comprehensive guide to understanding the unique value and considerations when purchasing coastal real estate.',
      image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'Sep 28, 2023',
      author: 'Sarah Jenkins',
      category: 'Investment Guides'
    },
    {
      id: 3,
      title: 'The Rise of Smart Home Technology in Luxury Estates',
      excerpt: 'How integrated automation systems are becoming standard expectations for high-end home buyers.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: 'Sep 10, 2023',
      author: 'Michael Chen',
      category: 'Real Estate Tips'
    }
  ];

  return (
    <div className="blog-page animate-fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Real Estate Insights</h1>
          <p>Expert analysis, market trends, and investment advice</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <span className="blog-category">{post.category}</span>
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span><Calendar size={14} /> {post.date}</span>
                    <span><User size={14} /> {post.author}</span>
                  </div>
                  <h3><a href={`/blog/${post.id}`}>{post.title}</a></h3>
                  <p>{post.excerpt}</p>
                  <a href={`/blog/${post.id}`} className="read-more">
                    Read Article <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
