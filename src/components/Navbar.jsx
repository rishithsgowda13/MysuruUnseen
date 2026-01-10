import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { t } = useLanguage();
    const isLoggedIn = !!localStorage.getItem('role');

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                <MapPin size={24} />
                <span>Mysuru Unseen</span>
            </Link>

            <ul className="navbar-nav">
                <li><Link to="/explore">{t('explore')}</Link></li>
                <li>
                    <a href="https://www.google.com/maps/place/Mysuru,+Karnataka" target="_blank" rel="noopener noreferrer">
                        {t('map')}
                    </a>
                </li>
                <li><Link to="/explore/hidden-gems">{t('hidden_gems')}</Link></li>
                <li><Link to="/user-dashboard">{t('dashboard')}</Link></li>
            </ul>

            {!isLoggedIn && (
                <div className="navbar-actions">
                    <Link to="/login" className="btn-outline">{t('login')}</Link>
                    <Link to="/signup" className="btn-primary">{t('join_now')}</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
