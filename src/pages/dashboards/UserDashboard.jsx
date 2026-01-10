import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Map, Calendar, Heart, Settings, User, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';


const UserDashboard = () => {
    const { t } = useLanguage();

    // Fallback if translations are missing
    const t_safe = (key, defaultText) => t(key) === key ? defaultText : t(key);

    const menuItems = [
        {
            title: 'Explore Mysore',
            desc: t_safe('explore_desc', 'Discover hidden gems and cultural heritage.'),
            icon: <Compass size={32} color="#5D4037" />, // Dark Brown
            path: '/explore',
            bgColor: '#F3E5F5' // Light Purple/Pink tint
        },
        {
            title: 'Plan Trip',
            desc: t_safe('trip_desc', 'Curate your perfect Mysore itinerary.'),
            icon: <Map size={32} color="#004d40" />, // Teal
            path: '/trip-planning',
            bgColor: '#E0F2F1' // Light Teal tint
        },
        {
            title: 'My Favourites',
            desc: 'Your saved places.',
            icon: <Heart size={32} color="#c62828" />, // Red
            path: '/explore/saved-places',
            bgColor: '#FFEBEE' // Light Red tint
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            background: 'linear-gradient(90deg, #D1F2EB 0%, #F9E79F 50%, #F5B7B1 100%)', // Pastel Green -> Yellow -> Red gradient
            padding: '4rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            {/* Settings Button */}
            <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }}>
                <Link to="/settings">
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#FEFDF5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Settings size={24} color="#5D4037" />
                    </div>
                </Link>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Header - Optional, keep it minimal if following strict reference, but 'Hello Traveler' is nice */}
                {/* Reference image doesn't plainly show a big header, but we'll keep it cleaner */}
                <div style={{ marginBottom: '4rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <MapPin size={48} color="#3E2723" />
                        <h1 style={{
                            fontSize: '3.5rem',
                            fontWeight: 'bold',
                            color: '#3E2723',
                            margin: 0,
                            fontFamily: 'var(--font-serif)'
                        }}>
                            Mysuru Unseen
                        </h1>
                    </div>
                    <p style={{ fontSize: '1.2rem', color: '#5D4037', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                        Unveiling the Hidden Heritage of Mysore
                    </p>
                    <h2 style={{ fontSize: '2rem', color: '#3E2723', fontWeight: 'normal' }}>
                        Hello, <span style={{ fontWeight: 'bold' }}>{localStorage.getItem('userName') || 'Traveler'}</span>
                    </h2>
                </div>

                {/* Grid Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)', // Force 3 columns for spacious look on desktop
                    gap: '3rem',
                    padding: '1rem'
                }}>
                    {menuItems.map((item, index) => (
                        <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
                            <div
                                style={{
                                    backgroundColor: '#FEFDF5', // Cream
                                    borderRadius: '20px',
                                    padding: '4rem 2rem', // VERY Spacious padding
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                                    border: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '100%',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
                                }}
                            >
                                {/* Icon Circle */}
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FAF3E0', // Lighter cream for circle
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '2rem'
                                }}>
                                    {item.icon}
                                </div>

                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#2C1810',
                                    marginBottom: '1rem',
                                    fontFamily: 'var(--font-main)'
                                }}>
                                    {item.title}
                                </h3>

                                <p style={{ color: '#5D4037', fontSize: '1rem', opacity: 0.8 }}>
                                    {item.desc}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Media Query for responsiveness */}
            <style>{`
                    @media (max-width: 1024px) {
                        div[style*="grid-template-columns"] {
                            grid-template-columns: repeat(2, 1fr) !important;
                        }
                    }
                    @media (max-width: 768px) {
                        div[style*="grid-template-columns"] {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}</style>
        </div>
    );
};

export default UserDashboard;

