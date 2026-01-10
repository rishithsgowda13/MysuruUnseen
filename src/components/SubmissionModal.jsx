import React, { useState } from 'react';
import { X, Upload, MapPin, Type, Image as ImageIcon, Link as LinkIcon, Info } from 'lucide-react';

const SubmissionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        type: 'famousPlaces',
        title: '',
        desc: '',
        location: '',
        peakHours: ''
    });

    const options = [
        { value: 'famousPlaces', label: 'Famous Place' },
        { value: 'hiddenGems', label: 'Hidden Gem' },
        { value: 'hotels', label: 'Hotel/Stay' },
        { value: 'food', label: 'Local Food' },
        { value: 'culture', label: 'Culture & Heritage' },
        { value: 'artists', label: 'Artist/Artisan' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation: Check if required fields are empty
        if (!formData.title.trim() || !formData.location.trim() || !formData.desc.trim()) {
            alert("Please fill in all required fields (Title, Location, Description).");
            return;
        }

        const newPlace = {
            id: Date.now(),
            ...formData,
            status: 'pending',
            submittedBy: 'User', // In real app, user ID
            submittedAt: new Date().toISOString()
        };

        const currentPending = JSON.parse(localStorage.getItem('pending_places') || '[]');
        localStorage.setItem('pending_places', JSON.stringify([...currentPending, newPlace]));

        alert("Submission Successful! Sent for review.");
        onClose();
        setFormData({
            type: 'famousPlaces',
            title: '',
            desc: '',
            location: '',
            peakHours: ''
        });
    };

    // Styles
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
    };

    const modalContentStyle = {
        backgroundColor: '#FEFDF5', // var(--color-bg-light)
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '650px',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
    };

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#FEFDF5',
        borderBottom: '1px solid #e5e5e5',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const formStyle = {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    };

    const inputGroupStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    };

    const labelStyle = {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#3D2817', // var(--color-text-main)
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s',
        backgroundColor: '#fff'
    };

    const buttonStyle = {
        padding: '0.75rem 2rem',
        backgroundColor: '#800000', // var(--color-primary)
        color: '#fff',
        border: 'none',
        borderRadius: '50px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle} className="hide-scrollbar">
                <div style={headerStyle}>
                    <h2 style={{ fontSize: '1.5rem', color: '#800000' }}>Submit New Entry</h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#800000' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={formStyle}>
                    {/* Type Selection */}
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Submission Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            {options.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>
                                <Type size={16} /> Title/Name
                            </label>
                            <input
                                required
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Mysore Palace"
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>
                                <MapPin size={16} /> Location (Short)
                            </label>
                            <input
                                required
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Sayyaji Rao Road"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>
                            <Info size={16} /> Short Description
                        </label>
                        <textarea
                            required
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief summary..."
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Peak Hours / Best Time</label>
                        <input
                            name="peakHours"
                            value={formData.peakHours}
                            onChange={handleChange}
                            placeholder="e.g. 10 AM - 5 PM"
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{ ...buttonStyle, backgroundColor: 'transparent', color: '#666', border: '1px solid #ccc' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={buttonStyle}
                        >
                            <Upload size={18} /> Submit for Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmissionModal;
