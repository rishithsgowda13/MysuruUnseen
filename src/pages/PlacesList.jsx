import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, MapPin, Heart, Clock, History, Star, Navigation, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { famousPlaces, hiddenGems, hotels, localFood, culture, artists as placeholderArtists } from '../data/placesData';
import { artisans } from '../data/artisans';
import { useLanguage } from '../context/LanguageContext';

const PlacesList = () => {
    const navigate = useNavigate();
    const { type } = useParams();
    const { t } = useLanguage();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [userPlaces, setUserPlaces] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    // Load approved user submissions from localStorage
    useEffect(() => {
        const approved = JSON.parse(localStorage.getItem('approved_places') || '[]');

        // Filter approved places by type
        const relevant = approved.filter(p => {
            let pType = p.type;
            if (p.type === 'famousPlaces') pType = 'famous';
            if (p.type === 'hiddenGems') pType = 'hidden';

            // Check if current type matches
            return pType === type ||
                (type === 'famous-places' && p.type === 'famousPlaces') ||
                (type === 'hidden-gems' && p.type === 'hiddenGems');
        });

        // Merge with static data based on type
        let staticPlaces = [];
        if (type === 'famous' || type === 'famous-places') staticPlaces = famousPlaces;
        else if (type === 'hidden' || type === 'hidden-gems') staticPlaces = hiddenGems;
        else if (type === 'hotels') staticPlaces = hotels;
        else if (type === 'food') staticPlaces = localFood;
        else if (type === 'culture') staticPlaces = culture;
        else if (type === 'artists') {
            // Map detailed artisans to place structure
            staticPlaces = artisans.map(a => ({
                id: `artisan-${a.id}`, // Unique ID
                title: a.name,
                desc: `${a.craftLabel} - ${a.specialty}`,
                fullDesc: a.description,
                location: a.location,
                rating: a.rating,
                image: a.image,
                peakHours: `Workshop: ${a.price}`,
                reviews: a.reviews.map(r => ({ user: r.user, rating: r.rating, comment: r.text })),
            }));
        } else if (type === 'saved-places') {
            // Aggregate all categories for favorites
            const allStatic = [
                ...famousPlaces,
                ...hiddenGems,
                ...hotels,
                ...localFood,
                ...culture,
                ...artisans.map(a => ({
                    id: `artisan-${a.id}`,
                    title: a.name,
                    desc: `${a.craftLabel} - ${a.specialty}`,
                    fullDesc: a.description,
                    location: a.location,
                    rating: a.rating,
                    image: a.image,
                    peakHours: `Workshop: ${a.price}`,
                    reviews: a.reviews.map(r => ({ user: r.user, rating: r.rating, comment: r.text })),
                }))
            ];
            // Filter by favorites
            // Note: 'favorites' state might not be up to date in this closure if not in dependency, 
            // but we can read from localStorage directly for the initial load or use the state if added to dep.
            // We will rely on localStorage here to avoid dependency issues for now, or assume filteredPlaces handles it.
            const saved = JSON.parse(localStorage.getItem('mysuru_favorites') || '[]');
            staticPlaces = allStatic.filter(p => saved.includes(p.id));
        }

        const allPlaces = [...(staticPlaces || []), ...relevant];
        // If saved-places, filter relevant (user approved) too
        if (type === 'saved-places') {
            const saved = JSON.parse(localStorage.getItem('mysuru_favorites') || '[]');
            const relevantSaved = relevant.filter(p => saved.includes(p.id));
            // staticPlaces is already filtered
            setUserPlaces([...staticPlaces, ...relevantSaved]);
            setFilteredPlaces([...staticPlaces, ...relevantSaved]);
        } else {
            setUserPlaces(allPlaces); // Store combined list
            setFilteredPlaces(allPlaces); // Initial filter state
        }
    }, [type]); // If we want auto-update on filtering, we might need to add favorites to dependency or separate effect

    useEffect(() => {
        // Filter logic
        if (!searchTerm.trim()) {
            setFilteredPlaces(userPlaces);
        } else {
            const lowerTerm = searchTerm.toLowerCase();
            const filtered = userPlaces.filter(p =>
                p.title.toLowerCase().includes(lowerTerm) ||
                p.location.toLowerCase().includes(lowerTerm) ||
                p.desc.toLowerCase().includes(lowerTerm)
            );
            setFilteredPlaces(filtered);
        }
    }, [searchTerm, userPlaces]);

    // Use filteredPlaces for rendering instead of 'places'
    const places = filteredPlaces;

    // Dynamic Title Logic
    let title = t('explore_mysuru');
    let subtitle = t('choose_experience');
    if (type === 'famous' || type === 'famous-places') { title = t('famous_places'); subtitle = t('touristy_must'); }
    else if (type === 'hidden' || type === 'hidden-gems') { title = t('hidden_gems'); subtitle = t('offbeat_local'); }
    else if (type === 'hotels') { title = t('hotels'); subtitle = t('hotels_desc'); }
    else if (type === 'food') { title = t('local_food'); subtitle = t('local_food_desc'); }
    else if (type === 'culture') { title = t('culture'); subtitle = t('culture_desc'); }
    else if (type === 'artists') { title = t('artists'); subtitle = t('artists_desc'); }
    else if (type === 'saved-places') { title = 'My Favourites'; subtitle = 'Your saved places.'; }

    // Favorites System (Persisted)
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('mysuru_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        let newFavs;
        if (favorites.includes(id)) {
            newFavs = favorites.filter(favId => favId !== id);
        } else {
            newFavs = [...favorites, id];
        }
        setFavorites(newFavs);
        localStorage.setItem('mysuru_favorites', JSON.stringify(newFavs));
    };

    // Reviews System (Local State for Demo)
    const [userReviews, setUserReviews] = useState({}); // { placeId: [ { user, rating, comment } ] }
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', user: 'You' });

    const handleAddReview = (placeId) => {
        if (!newReview.comment.trim()) return;

        const placeReviews = userReviews[placeId] || [];
        const updatedReviews = {
            ...userReviews,
            [placeId]: [...placeReviews, { ...newReview, date: new Date().toLocaleDateString() }]
        };

        setUserReviews(updatedReviews);
        setNewReview({ rating: 5, comment: '', user: 'You' });
    };

    // Directions Logic
    const openDirections = (place) => {
        const query = encodeURIComponent(`${place.title}, ${place.location}`);
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
    };

    const handleBooking = () => {
        alert("Booking feature coming soon! Connecting you to local guides...");
    };

    return (
        <div className="page-container" style={{ position: 'relative', minHeight: '100vh', padding: '2rem' }}>
            {/* Header */}
            <header style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate(-1)} className="btn-outline" style={{ padding: '8px', borderRadius: '50%' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>{title}</h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ position: 'relative', maxWidth: '500px' }}>
                    <input
                        type="text"
                        placeholder={`Search ${title}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-light)',
                            outline: 'none',
                            fontSize: '1rem',
                            backgroundColor: 'white'
                        }}
                    />
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                </div>
            </header>

            {/* Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem',
                paddingBottom: '2rem'
            }}>
                {places.map((place) => (
                    <div
                        key={place.id}
                        className="glass-panel"
                        onClick={() => setSelectedPlace(place)}
                        style={{
                            overflow: 'hidden',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '400px',
                            background: 'var(--color-bg-secondary)',
                            transition: 'all 0.3s ease',
                            border: '1px solid var(--border-light)',
                            borderRadius: '20px',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                    >
                        {/* Favorite Button (Card) */}
                        <button
                            onClick={(e) => toggleFavorite(place.id, e)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                zIndex: 10,
                                background: 'rgba(255,255,255,0.9)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '8px',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                color: favorites.includes(place.id) ? '#ff4757' : '#cbd5e1'
                            }}
                        >
                            <Heart size={20} fill={favorites.includes(place.id) ? '#ff4757' : 'none'} />
                        </button>

                        <div style={{ height: '60%', width: '100%', overflow: 'hidden' }}>
                            <img
                                src={place.image}
                                alt={place.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--color-text-main)', fontFamily: 'var(--font-heading)' }}>{place.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{place.desc}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                                <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                                    <MapPin size={14} /> {place.location.split(',')[0]}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#f59e0b', fontWeight: 'bold' }}>
                                    <Star size={14} fill="#f59e0b" /> {place.rating || 'New'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Modal */}
            {selectedPlace && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
                }} onClick={() => setSelectedPlace(null)}>

                    <div className="glass-panel" style={{
                        width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto',
                        background: 'var(--color-bg-light)', borderRadius: '24px', position: 'relative', padding: '0',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }} onClick={(e) => e.stopPropagation()}>

                        {/* Modal Header Image */}
                        <div style={{ position: 'relative', height: '350px' }}>
                            <img src={selectedPlace.image} alt={selectedPlace.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button onClick={() => setSelectedPlace(null)} style={{
                                position: 'absolute', top: '20px', right: '20px',
                                background: 'white', border: 'none', color: 'black', borderRadius: '50%', padding: '10px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <X size={24} />
                            </button>
                            <button onClick={(e) => toggleFavorite(selectedPlace.id, e)} style={{
                                position: 'absolute', top: '20px', right: '70px',
                                background: 'white', border: 'none', color: favorites.includes(selectedPlace.id) ? '#ff4757' : 'black', borderRadius: '50%', padding: '10px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <Heart size={24} fill={favorites.includes(selectedPlace.id) ? '#ff4757' : 'none'} />
                            </button>
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '2rem', paddingTop: '4rem'
                            }}>
                                <h1 style={{ color: 'white', fontSize: '3rem', fontFamily: 'var(--font-heading)', margin: 0 }}>{selectedPlace.title}</h1>
                                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', marginTop: '0.5rem' }}> <MapPin size={18} style={{ display: 'inline', marginRight: '5px' }} /> {selectedPlace.location}</p>
                            </div>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                <button className="btn-primary" onClick={handleBooking} style={{ flex: 1, height: '50px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Calendar size={20} /> Book Visit / Slots
                                </button>
                                <button className="btn-outline" onClick={() => openDirections(selectedPlace)} style={{ flex: 1, height: '50px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                                    <Navigation size={20} /> Get Directions
                                </button>
                            </div>

                            {/* Info Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', marginBottom: '1rem' }}>About</h3>
                                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                                        {selectedPlace.fullDesc}
                                    </p>

                                    {selectedPlace.history && (
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-text-main)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <History size={20} color="var(--color-primary)" /> Historical Significance
                                            </h3>
                                            <div style={{ background: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                                                <p style={{ color: 'var(--color-text-main)', lineHeight: '1.6', marginBottom: '1rem' }}>{selectedPlace.history}</p>
                                                {selectedPlace.wikiUrl && (
                                                    <a href={selectedPlace.wikiUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                                                        Read detailed history on Wikipedia <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar Info */}
                                <div>
                                    <div style={{ background: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                                            <Clock size={18} /> Peak Hours
                                        </h4>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>{selectedPlace.peakHours || '10:00 AM - 6:00 PM'}</p>
                                    </div>

                                    <div style={{ background: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: '16px' }}>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                                            <Star size={18} fill="#f59e0b" color="#f59e0b" /> Rating
                                        </h4>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>{selectedPlace.rating || 'New'}</span>
                                            <span style={{ color: 'var(--color-text-muted)' }}>/ 5.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>Reviews</h3>

                                {/* Add Review */}
                                <div style={{ background: 'var(--color-bg-secondary)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                                    <h4 style={{ marginBottom: '1rem' }}>Add your review</h4>
                                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    size={24}
                                                    style={{ cursor: 'pointer' }}
                                                    fill={star <= newReview.rating ? "#f59e0b" : "none"}
                                                    color={star <= newReview.rating ? "#f59e0b" : "#cbd5e1"}
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                />
                                            ))}
                                        </div>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            placeholder="Share your experience..."
                                            style={{
                                                width: '100%', padding: '1rem', borderRadius: '8px',
                                                border: '1px solid var(--border-light)', background: 'white', minHeight: '80px',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                        <button className="btn-primary" onClick={() => handleAddReview(selectedPlace.id)} style={{ alignSelf: 'flex-end' }}>
                                            Post Review
                                        </button>
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Default Reviews from Data */}
                                    {selectedPlace.reviews && selectedPlace.reviews.map((rev, index) => (
                                        <div key={`default-${index}`} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{rev.user}</span>
                                                <span style={{ display: 'flex', gap: '2px' }}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < rev.rating ? "#f59e0b" : "none"} color="#f59e0b" />
                                                    ))}
                                                </span>
                                            </div>
                                            <p style={{ color: 'var(--color-text-muted)' }}>{rev.comment}</p>
                                        </div>
                                    ))}

                                    {/* User Added Reviews */}
                                    {userReviews[selectedPlace.id] && userReviews[selectedPlace.id].map((rev, index) => (
                                        <div key={`user-${index}`} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{rev.user}</span>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rev.date}</span>
                                                </div>
                                                <span style={{ display: 'flex', gap: '2px' }}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < rev.rating ? "#f59e0b" : "none"} color="#f59e0b" />
                                                    ))}
                                                </span>
                                            </div>
                                            <p style={{ color: 'var(--color-text-muted)' }}>{rev.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlacesList;
