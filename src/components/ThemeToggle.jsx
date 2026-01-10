import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ThemeToggle = () => {
    const { t } = useLanguage();
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        // Dispatch storage event to notify Layout and other components
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <div style={{
            display: 'flex',
            gap: '1rem',
            background: 'var(--color-bg-secondary)',
            padding: '5px',
            borderRadius: '50px',
            width: 'fit-content'
        }}>
            <button
                onClick={() => toggleTheme('light')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    border: 'none',
                    background: theme === 'light' ? 'var(--color-primary)' : 'transparent',
                    color: theme === 'light' ? '#fff' : 'var(--color-text-muted)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                <Sun size={18} /> {t('light_mode')}
            </button>
            <button
                onClick={() => toggleTheme('dark')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    border: 'none',
                    background: theme === 'dark' ? 'var(--color-primary)' : 'transparent',
                    color: theme === 'dark' ? '#fff' : 'var(--color-text-muted)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
            >
                <Moon size={18} /> {t('dark_mode')}
            </button>
        </div>
    );
};

export default ThemeToggle;
