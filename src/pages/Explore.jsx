import React from 'react';
import { ArrowLeft, Utensils, Gem, MapPin, Hotel, Landmark, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Explore = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const categories = [
        { title: t('famous_places'), icon: <MapPin size={32} color="var(--color-secondary)" />, desc: t('famous_places_desc'), path: '/explore/famous' },
        { title: t('hidden_gems'), icon: <Gem size={32} color="var(--color-primary)" />, desc: t('hidden_gems_desc'), path: '/explore/hidden' },
        { title: t('hotels'), icon: <Hotel size={32} color="var(--color-secondary)" />, desc: t('hotels_desc'), path: '/explore/hotels' },
        { title: t('local_food'), icon: <Utensils size={32} color="var(--color-primary)" />, desc: t('local_food_desc'), path: '/explore/food' },
        { title: t('culture'), icon: <Landmark size={32} color="var(--color-secondary)" />, desc: t('culture_desc'), path: '/explore/culture' },
        { title: t('artists'), icon: <Palette size={32} color="var(--color-primary)" />, desc: t('artists_desc'), path: '/explore/artists' },
    ];

    const handleCardClick = (cat) => {
        if (cat.path) {
            navigate(cat.path);
        }
    };

    return (
        <div className="page-container">
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate(-1)} className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}>
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-gradient" style={{ fontSize: '2rem' }}>{t('explore_mysuru')}</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>{t('choose_experience')}</p>
                </div>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem'
            }}>
                {categories.map((cat, index) => (
                    <div key={index} className="glass-panel" onClick={() => handleCardClick(cat)} style={{
                        padding: '2.5rem 2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: 'var(--color-white)', // Theme adaptive
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        border: '1px solid var(--border-light)',
                        minHeight: '200px',
                        boxShadow: 'var(--shadow-sm)',
                        borderRadius: 'var(--border-radius)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                    >
                        <div style={{ padding: '1.2rem', background: 'var(--color-bg-secondary)', borderRadius: '50%' }}>
                            {cat.icon}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)' }}>{cat.title}</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{cat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Explore;
