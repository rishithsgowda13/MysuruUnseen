# Mysuru Unseen - Artisan Marketplace Theme Transformation
## Consolidated Source Code for Easy Transfer

This file contains the complete source code for all the files modified or created during the artisan marketplace theme transformation.

---

### 1. src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --font-main: 'Outfit', sans-serif;
  --font-serif: 'Crimson Pro', serif;

  /* Artisan Marketplace Theme - Warm Earthy Colors */
  --color-bg-light: #F5EBE0;
  --color-bg-secondary: #E8DCC8;
  --color-primary: #6B2C38;
  --color-primary-hover: #8B3A47;
  --color-secondary: #A65D4E;
  --color-accent: #D4A574;
  
  --color-text-main: #3D2817;
  --color-text-muted: #6B5B4F;
  --color-white: #FFFFFF;

  /* Gradients */
  --gradient-main: linear-gradient(135deg, #F5EBE0 0%, #E8DCC8 100%);
  --gradient-hero: linear-gradient(180deg, #F5EBE0 0%, #E8DCC8 100%);
  
  /* Shadows & Borders */
  --shadow-sm: 0 2px 8px rgba(61, 40, 23, 0.08);
  --shadow-md: 0 4px 16px rgba(61, 40, 23, 0.12);
  --shadow-lg: 0 8px 24px rgba(61, 40, 23, 0.15);
  --border-light: 1px solid rgba(107, 44, 56, 0.15);
  --border-radius: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-main);
  background-color: var(--color-bg-light);
  color: var(--color-text-main);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  position: relative;
}

/* Subtle grain texture for warmth */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  z-index: 9999;
  opacity: 0.15;
  mix-blend-mode: multiply;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navigation Header */
.navbar {
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
}

.navbar-nav a {
  color: var(--color-text-main);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.navbar-nav a:hover {
  color: var(--color-primary);
}

.navbar-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Utilities */
.card {
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 10px 26px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* Search Bar */
.search-bar {
  width: 100%;
  max-width: 600px;
  position: relative;
}

.search-bar input {
  width: 100%;
  padding: 14px 20px 14px 48px;
  border: var(--border-light);
  border-radius: 50px;
  background: var(--color-white);
  color: var(--color-text-main);
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.search-bar input:focus {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.search-bar svg {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}

/* Category Chips */
.category-chips {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.chip {
  padding: 10px 20px;
  border-radius: 50px;
  background: var(--color-bg-secondary);
  color: var(--color-text-main);
  border: 2px solid transparent;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.chip:hover {
  border-color: var(--color-primary);
  background: var(--color-white);
}

.chip.active {
  background: var(--color-primary);
  color: var(--color-white);
}

.page-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  animation: fadeIn 0.8s ease-out;
}

.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h1,
h2,
h3 {
  font-weight: 700;
  letter-spacing: -0.02em;
}

a {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s;
}

input {
  background: var(--color-white);
  border: var(--border-light);
  color: var(--color-text-main);
  padding: 12px;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  font-family: var(--font-main);
}

input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(107, 44, 56, 0.1);
}

/* Artisan Card Styling */
.artisan-card {
  background: var(--color-white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.artisan-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.artisan-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.artisan-card-content {
  padding: 1.25rem;
}

.artisan-card-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.artisan-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-main);
  margin-bottom: 0.25rem;
}

.artisan-card-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}
```

---

### 2. src/components/Navbar.jsx
```javascript
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <MapPin size={24} />
        <span>Mysuru Unseen</span>
      </Link>
      
      <ul className="navbar-nav">
        <li><Link to="/explore">{t('explore')}</Link></li>
        <li><Link to="/map">{t('map')}</Link></li>
        <li><Link to="/hidden-gems">{t('hidden_gems')}</Link></li>
        <li><Link to="/user-dashboard">{t('dashboard')}</Link></li>
      </ul>

      <div className="navbar-actions">
        <Link to="/login" className="btn-outline">{t('login')}</Link>
        <Link to="/signup" className="btn-primary">{t('join_now')}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

### 3. src/pages/Home.jsx
```javascript
import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('all_crafts') },
    { id: 'sandalwood', label: t('sandalwood_carving') },
    { id: 'silk', label: t('silk_weaving') },
    { id: 'painting', label: t('mysore_painting') },
    { id: 'pottery', label: t('traditional_pottery') },
    { id: 'incense', label: t('incense_making') },
    { id: 'sculpture', label: t('stone_sculpture') }
  ];

  // Sample artisan data
  const artisans = [
    {
      id: 1,
      name: 'Radha Devi',
      craft: 'SILK WEAVING',
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200/E8DCC8/6B2C38?text=Radha+Devi'
    }
  ];

  return (
    <div style={{ background: 'var(--gradient-hero)', minHeight: 'calc(100vh - 80px)' }}>
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
          {artisans.map(artisan => (
            <div key={artisan.id} className="artisan-card">
              <img src={artisan.image} alt={artisan.name} />
              <div className="artisan-card-content">
                <div className="artisan-card-badge">{artisan.craft}</div>
                <h3 className="artisan-card-title">{artisan.name}</h3>
                <div className="artisan-card-rating">
                  <Star size={16} fill="currentColor" />
                  <span>{artisan.rating}</span>
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
```

---

### 4. src/components/Layout.jsx
```javascript
import React, { useLayoutEffect } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    useLayoutEffect(() => {
        document.body.classList.remove('light-mode');
    }, []);

    return (
        <>
            <Navbar />
            <div className="layout-content" style={{ position: 'relative' }}>
                {children}
            </div>
        </>
    );
};

export default Layout;
```

---

### 5. src/context/LanguageContext.jsx (Updated with latest artisan keys)
*(Note: Use this version to avoid duplicate key warnings and enjoy full translations)*
```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Common
        save: "Save",
        cancel: "Cancel",
        loading: "Loading...",
        back: "Back",
        logout: "Log Out",

        // Home
        hero_title: "Explore the Crafts of Mysuru",
        hero_subtitle: "Find master artisans, book workshops, and bring home more than just a souvenir.",
        start_journey: "Start Your Journey",
        search_placeholder: "Search crafts...",
        
        // Navigation
        explore: "Explore",
        map: "Map",
        login: "Login",
        join_now: "Join Now",
        dashboard: "Dashboard",
        hidden_gems: "Hidden Gems",
        
        // Categories
        all_crafts: "All Crafts",
        sandalwood_carving: "🌿 Sandalwood Carving",
        silk_weaving: "🧵 Silk Weaving",
        mysore_painting: "🎨 Mysore Painting",
        traditional_pottery: "🏺 Traditional Pottery",
        incense_making: "🔥 Incense Making",
        stone_sculpture: "🗿 Stone Sculpture",

        // ... [Rest of the English translations follow standard names] ...
    }
};
// [Hi and Kn sections similarly updated]
```
*(Full source available in the respectively named files)*
