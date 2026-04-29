import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await registerUser({ name: form.name, email: form.email, password: form.password });
            login(data.user, data.token);
            navigate('/add-child');
        } catch (err) {
            setError('Registration failed. Email may already exist.');
        }
        setLoading(false);
    };

    const SpectraLogo = ({ size = 36 }) => (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#regGrad)"/>
            <path d="M20 8C16 8 13 11 13 15C13 17 14 18.5 15.5 19.5C13.5 20.5 12 22.5 12 25C12 28.5 15 31 19 31H21C25 31 28 28.5 28 25C28 22.5 26.5 20.5 24.5 19.5C26 18.5 27 17 27 15C27 11 24 8 20 8Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="15" r="2" fill="#7c3aed"/>
            <circle cx="23" cy="15" r="2" fill="#ec4899"/>
            <rect x="16" y="22" width="8" height="2" rx="1" fill="#7c3aed"/>
            <defs>
                <linearGradient id="regGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                .reg-input:focus { border: 2px solid #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1) !important; }
                .reg-btn:hover { background: #5b21b6 !important; }
            `}</style>

            {/* Left panel */}
            <div style={{ flex: 1, background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(50%, -50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(-50%, 50%)' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem' }}>
                        <SpectraLogo size={38} />
                        <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '22px', fontWeight: '700', color: 'white' }}>Spectra</span>
                    </div>

                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: 'white', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Early awareness changes everything.
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                        Join thousands of parents who are learning to recognize early signs of autism and advocate for their child with confidence.
                    </p>

                    {[
                        { num: '1 in 36', label: 'children are on the autism spectrum' },
                        { num: '5 to 8 yrs', label: 'average diagnosis age in India' },
                        { num: '98%', label: 'model accuracy on screening data' },
                    ].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.625rem 1rem', minWidth: '90px', textAlign: 'center' }}>
                                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: '800', color: 'white' }}>{s.num}</span>
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 4rem' }}>
                <div style={{ width: '100%', maxWidth: '420px' }}>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <p style={{ color: '#7c3aed', fontSize: '13px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            Get started for free
                        </p>
                        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', fontWeight: '800', color: '#1e1b4b', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            Create your account
                        </h1>
                        <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
                        </p>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.875rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '14px', fontWeight: '500' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                Full Name
                            </label>
                            <input
                                className="reg-input"
                                type="text"
                                placeholder="Your full name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', transition: 'border 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                Email Address
                            </label>
                            <input
                                className="reg-input"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', transition: 'border 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                                Password
                            </label>
                            <input
                                className="reg-input"
                                type="password"
                                placeholder="Create a strong password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', transition: 'border 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        <button
                            className="reg-btn"
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', padding: '1rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#9ca3af', fontSize: '12px', lineHeight: '1.6' }}>
                        By creating an account you acknowledge that Spectra is not a clinical diagnostic tool. Always consult a qualified developmental pediatrician.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;