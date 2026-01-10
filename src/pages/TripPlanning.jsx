import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, User, Heart, Briefcase, Calendar, Map, CheckCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const TripPlanning = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [groupType, setGroupType] = useState('');
    const [days, setDays] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleGroupSelect = (type) => {
        setGroupType(type);
        setStep(2);
    };

    const handleDaysSubmit = (e) => {
        e.preventDefault();
        if (days > 0) {
            setLoading(true);
            setStep(3);
            // Simulate AI processing delay
            setTimeout(() => {
                generateSuggestions();
                setLoading(false);
            }, 1500);
        } else {
            alert('Please enter a valid number of days');
        }
    };

    // Mock "ChatGPT" Logic
    const generateSuggestions = () => {
        let plans = [];

        // Logic based on User Request:
        // Friends -> Adventurous/Activities
        // Couple -> Romantic/Different/Leisure
        // Family -> Cultural Heritage
        // Solo -> Exploration/Mix

        if (groupType === 'Friends') {
            plans = [
                { title: 'Adventure Rush', desc: 'Chamundi Hill Trek & Sunrise View', tag: 'Adventure' },
                { title: 'Late Night Vibes', desc: 'Explore local cafes & night street food at Devaraja Market', tag: 'Nightlife' },
                { title: 'Water Sports', desc: 'Jet Skiing & Boating at KRS Backwaters', tag: 'Activity' },
                { title: 'Road Trip', desc: 'Drive to Gopalaswamy Betta (Cloud-touching peak)', tag: 'Nature' }
            ];
        } else if (groupType === 'Couple') {
            plans = [
                { title: 'Romantic Evening', desc: 'Private boat ride at Karanji Lake', tag: 'Romance' },
                { title: 'Royal Dinner', desc: 'Fine dining with Palace View at Lalitha Mahal', tag: 'Luxury' },
                { title: 'Sunset Walk', desc: 'Peaceful stroll at Kukkarahalli Lake', tag: 'Leisure' },
                { title: 'Garden Light Show', desc: 'Brindavan Gardens Musical Fountain', tag: 'Evening' }
            ];
        } else if (groupType === 'Family') {
            plans = [
                { title: 'Royal Heritage Tour', desc: 'Mysore Palace & Jaganmohan Art Gallery', tag: 'Culture' },
                { title: 'Wildlife Encounter', desc: 'Mysuru Zoo (Sri Chamarajendra Zoological Gardens)', tag: 'Nature' },
                { title: 'Divinity & Peace', desc: 'Chamundeshwari Temple & Nandi Statue', tag: 'Spiritual' },
                { title: 'History Lesson', desc: 'Rail Museum & Folklore Museum', tag: 'Educational' }
            ];
        } else { // Solo
            plans = [
                { title: 'Architectural Marvels', desc: 'Photography walk around Heritage Buildings', tag: 'Photography' },
                { title: 'Yoga & Wellness', desc: 'Drop-in Yoga session at Gokulam', tag: 'Wellness' },
                { title: 'Local Interaction', desc: 'Heritage walk in Old Mysore areas', tag: 'Culture' },
                { title: 'Quiet Reflection', desc: 'Meditation at St. Philomena’s Cathedral', tag: 'Peace' }
            ];
        }

        // Adjust list size based on days (Mock logic: just showing all for now, but implies variety)
        setSuggestions(plans);
    };

    return (
        <div className="page-container">
            <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate(-1)} className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}>
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-gradient" style={{ fontSize: '2rem' }}>{t('trip_planner')}</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {step === 1 ? t('who_travelling') : step === 2 ? t('how_long_stay') : t('ai_curated')}
                    </p>
                </div>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Step 1: Group Type Selection */}
                {step === 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <SelectionCard icon={<Users size={40} />} title={t('family')} onClick={() => handleGroupSelect('Family')} />
                        <SelectionCard icon={<Briefcase size={40} />} title={t('friends')} onClick={() => handleGroupSelect('Friends')} />
                        <SelectionCard icon={<Heart size={40} />} title={t('couple')} onClick={() => handleGroupSelect('Couple')} />
                        <SelectionCard icon={<User size={40} />} title={t('solo')} onClick={() => handleGroupSelect('Solo')} />
                    </div>
                )}

                {/* Step 2: Number of Days */}
                {step === 2 && (
                    <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
                        <Calendar size={48} color="var(--color-primary)" style={{ marginBottom: '1.5rem' }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{t('enter_duration')}</h3>
                        <form onSubmit={handleDaysSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <input
                                type="number"
                                placeholder={t('number_of_days')}
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                min="1"
                                required
                                style={{ textAlign: 'center', fontSize: '1.2rem' }}
                            />
                            <button type="submit" className="btn-primary">{t('generate_plan')}</button>
                        </form>
                    </div>
                )}

                {/* Step 3: Suggestions */}
                {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <Sparkles size={48} color="var(--color-primary)" className="spin-animation" />
                                <h3 style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>{t('curating_trip').replace('{type}', groupType)}</h3>
                            </div>
                        ) : (
                            <>
                                <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--color-primary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <CheckCircle size={28} color="var(--color-primary)" />
                                        <h3 style={{ fontSize: '1.5rem' }}>{t('top_recommendations').replace('{days}', days)}</h3>
                                    </div>

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {suggestions.map((plan, i) => (
                                            <div key={i} className="glass-panel" style={{
                                                padding: '1.5rem',
                                                background: 'rgba(255,255,255,0.03)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: 'var(--gradient-glow)',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 'bold',
                                                    boxShadow: '0 0 10px rgba(112,0,255,0.5)'
                                                }}>
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--color-text-main)' }}>{plan.title}</h4>
                                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{plan.desc}</p>
                                                    <span style={{
                                                        fontSize: '0.8rem',
                                                        padding: '4px 8px',
                                                        borderRadius: '4px',
                                                        background: 'rgba(112, 0, 255, 0.2)',
                                                        color: '#e0e0e0',
                                                        marginTop: '0.5rem',
                                                        display: 'inline-block',
                                                        border: '1px solid rgba(112, 0, 255, 0.3)'
                                                    }}>
                                                        {plan.tag}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Make Your Own Plan - BIG Button */}
                                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                    <button className="btn-primary" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        width: '100%',
                                        padding: '1.5rem',
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold'
                                    }}>
                                        <Map size={32} />
                                        {t('make_own_plan')}
                                    </button>
                                    <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>{t('customize_journey')}</p>
                                </div>
                            </>
                        )}

                    </div>
                )}

            </div>
            <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spin-animation { animation: spin 2s linear infinite; }
      `}</style>
        </div>
    );
};

const SelectionCard = ({ icon, title, onClick }) => (
    <div
        onClick={onClick}
        className="glass-panel selection-card"
        style={{
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border-glass)';
        }}
    >
        <div style={{ color: 'var(--color-primary)' }}>{icon}</div>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)' }}>{title}</h3>
    </div>
);

export default TripPlanning;
