import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Calendar, Star, Share2 } from 'lucide-react';
import { artisans } from '../data/artisans';

const ArtisanProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const artisan = artisans.find(a => a.id === parseInt(id));

    if (!artisan) {
        return <div className="p-8 text-center">Artisan not found</div>;
    }

    return (
        <div className="page-container" style={{ padding: '0 0 80px 0' }}>
            {/* Hero Section */}
            <div style={{ position: 'relative', height: '40vh', minHeight: '300px' }}>
                <img
                    src={artisan.image}
                    alt={artisan.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '10px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                >
                    <ArrowLeft size={24} color="#3D2817" />
                </button>
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '10px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                >
                    <Heart
                        size={24}
                        fill={isFavorite ? "#800000" : "none"}
                        color={isFavorite ? "#800000" : "#3D2817"}
                    />
                </button>
            </div>

            <div style={{ padding: '24px', background: 'var(--color-bg-light)', marginTop: '-30px', borderRadius: '30px 30px 0 0', position: 'relative', zIndex: 10 }}>
                {/* Header Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                        <div style={{
                            background: 'var(--color-bg-secondary)',
                            color: 'var(--color-primary)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            display: 'inline-block',
                            marginBottom: '8px',
                            fontWeight: 600
                        }}>
                            {artisan.craftLabel}
                        </div>
                        <h1 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '2rem',
                            color: 'var(--color-text-main)',
                            margin: 0,
                            lineHeight: 1.2
                        }}>
                            {artisan.name}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#FFFBE6', padding: '4px 8px', borderRadius: '8px', border: '1px solid #E8DCC8' }}>
                            <Star size={16} fill="#D4A574" color="#D4A574" />
                            <span style={{ fontWeight: 'bold', color: '#3D2817' }}>{artisan.rating}</span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#6B5B4F', marginTop: '4px' }}>
                            {artisan.reviews.length} reviews
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <a
                        href={artisan.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline"
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            textDecoration: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        <MapPin size={18} />
                        View on Map
                    </a>
                    <button className="btn-outline" style={{ padding: '10px' }}>
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '12px' }}>About the Artisan</h3>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                        {artisan.description}
                    </p>
                </div>

                {/* Reviews */}
                <div style={{ marginBottom: '100px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '16px' }}>
                        Reviews ({artisan.reviews.length})
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {artisan.reviews.map((review, index) => (
                            <div key={index} style={{
                                background: 'var(--color-white)',
                                padding: '16px',
                                borderRadius: '16px',
                                border: '1px solid var(--border-light)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>{review.user}</span>
                                    <div style={{ display: 'flex' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                fill={i < review.rating ? "#D4A574" : "none"}
                                                color={i < review.rating ? "#D4A574" : "#E8DCC8"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                                    "{review.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Sticky Footer */}
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'var(--color-white)',
                    padding: '16px 24px',
                    boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    zIndex: 100
                }}>
                    <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Starting from</span>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                            {artisan.price}
                        </div>
                    </div>
                    <button className="btn-primary" style={{ padding: '12px 32px', borderRadius: '100px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Calendar size={18} />
                        Book a Slot
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtisanProfile;
