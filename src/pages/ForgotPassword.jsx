import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Lock, Mail, Phone, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [passwords, setPasswords] = useState({ new: '', confirm: '' });

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (identifier) {
            alert(`OTP sent to ${identifier}`);
            setStep(2);
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (otp === '1234') { // Mock OTP
            setStep(3);
        } else {
            alert('Invalid OTP (Try 1234)');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("Passwords do not match!");
            return;
        }
        alert("Password reset successfully! Please login.");
        navigate('/login');
    };

    return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}>
                <button onClick={() => navigate('/login')} className="btn-outline" style={{ padding: '8px', borderRadius: '50%', marginBottom: '1rem', border: 'none' }}>
                    <ArrowLeft size={20} />
                </button>

                <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                    {step === 1 ? t('forgot_password') : step === 2 ? t('verify_otp') : t('reset_password')}
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                    {step === 1 ? t('enter_email_phone_otp') :
                        step === 2 ? t('enter_code_sent').replace('{identifier}', identifier) :
                            t('create_new_password')}
                </p>

                {step === 1 && (
                    <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label style={{ color: 'var(--color-text-main)' }}>{t('email_or_phone')}</label>
                            <div style={{ position: 'relative' }}>
                                <UserIcon style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-text-muted)' }} size={20} />
                                <input
                                    type="text"
                                    placeholder="john@example.com / +91..."
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                    style={{ paddingLeft: '40px', width: '100%' }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary">{t('send_otp')}</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label style={{ color: 'var(--color-text-main)' }}>{t('enter_otp')}</label>
                            <input
                                type="text"
                                placeholder="XXXX"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength="4"
                                required
                                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem' }}
                            />
                        </div>
                        <button type="submit" className="btn-primary">{t('verify_code')}</button>
                        <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--color-secondary)', cursor: 'pointer' }}>
                            {t('resend_otp')}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label style={{ color: 'var(--color-text-main)' }}>{t('new_password')}</label>
                            <input
                                type="password"
                                placeholder={t('new_password')}
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            <label style={{ color: 'var(--color-text-main)' }}>{t('confirm_password')}</label>
                            <input
                                type="password"
                                placeholder={t('confirm_password')}
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">{t('reset_password_btn')}</button>
                    </form>
                )}
            </div>
        </div>
    );
};

// Helper Icon for simplified usage inside input
const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export default ForgotPassword;
