import React, { useState } from 'react';
import { Search, Star, Plus, Map } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { artisans } from '../data/artisans';
import { useNavigate } from 'react-router-dom';
import SubmissionModal from '../components/SubmissionModal';

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: t('all_crafts') },
    { id: 'sandalwood', label: t('sandalwood_carving') },
    { id: 'silk', label: t('silk_weaving') },
    { id: 'painting', label: t('mysore_painting') },
    { id: 'pottery', label: t('traditional_pottery') },
    { id: 'incense', label: t('incense_making') },
    { id: 'sculpture', label: t('stone_sculpture') }
  ];

  const filteredArtisans = activeCategory === 'all'
    ? artisans
    : artisans.filter(a => a.craft === activeCategory);

  return (
    <div style={{ background: 'var(--gradient-hero)', minHeight: 'calc(100vh - 80px)', position: 'relative' }}>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsSubmissionModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: '#FEFDF5',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title="Submit a new entry"
      >
        <Plus size={32} color="#FEFDF5" />
      </button>

      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem 3rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '3.5rem',
          color: 'var(--color-primary)',
          marginBottom: '1rem',
          fontWeight: 700,
          lineHeight: 1.2
        }}>
          {t('hero_title')}
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--color-text-muted)',
          marginBottom: '2.5rem',
          maxWidth: '700px',
          margin: '0 auto 2.5rem'
        }}>
          {t('hero_subtitle')}
        </p>

        {/* Search Bar */}
        <div className="search-bar" style={{ margin: '0 auto 3rem' }}>
          <Search size={20} />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            defaultValue="silk"
          />
        </div>

        {/* Quick Access Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          <button className="btn-outline" onClick={() => navigate('/explore/hidden-gems')} style={{ borderColor: 'var(--color-secondary)' }}>
            Hidden Gems
          </button>
          <a href="https://www.google.com/maps/place/Mysuru,+Karnataka" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', color: 'var(--color-text-main)' }}>
            <Map size={18} /> Google Maps
          </a>
        </div>

        {/* Category Chips */}
        <div className="category-chips">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`chip ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Artisan Cards Grid */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredArtisans.map(artisan => (
            <div
              key={artisan.id}
              className="artisan-card"
              onClick={() => navigate(`/artisan/${artisan.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={artisan.image} alt={artisan.name} />
              <div className="artisan-card-content">
                <div className="artisan-card-badge">{artisan.craftLabel}</div>
                <h3 className="artisan-card-title">{artisan.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  {artisan.specialty}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="artisan-card-rating">
                    <Star size={16} fill="#D4A574" style={{ color: '#D4A574' }} />
                    <span>{artisan.rating}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{artisan.location}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
