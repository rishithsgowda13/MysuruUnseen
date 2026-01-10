import React from 'react';
import { Settings, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Maintenance = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'var(--color-bg-light)',
            color: 'var(--color-text-main)',
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--color-bg-secondary)',
                padding: '2rem',
                borderRadius: '50%',
                marginBottom: '2rem'
            }}>
                <Settings size={64} className="spin-slow" color="var(--color-primary)" />
            </div>

            <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                Under Maintenance
            </h1>

            <p style={{
                fontSize: '1.2rem',
                color: 'var(--color-text-muted)',
                maxWidth: '600px',
                marginBottom: '2rem'
            }}>
                We're currently making some improvements to our platform to serve you better.
                Please check back soon!
            </p>

            <div style={{
                padding: '1rem',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                maxWidth: '400px'
            }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    System Upgrade in Progress
                </p>
            </div>

            <div style={{ marginTop: '4rem', opacity: 0.5 }}>
                <Link to="/login" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
                    Admin Access
                </Link>
            </div>

            <style>{`
        .spin-slow {
          animation: spin 4s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default Maintenance;
