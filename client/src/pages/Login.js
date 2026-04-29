import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await loginUser(form);
            login(data.user, data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    const SpectraLogo = ({ size = 36 }) => (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#loginGrad)"/>
            <path d="M20 8C16 8 13 11 13 15C13 17 14 18.5 15.5 19.5C13.5 20.5 12 22.5 12 25C12 28.5 15 31 19 31H21C25 31 28 28.5 28 25C28 22.5 26.5 20.5 24.5 19.5C26 18.5 27 17 27 15C27 11 24 8 20 8Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="15" r="2" fill="#7c3aed"/>
            <circle cx="23" cy="15" r="2" fill="#ec4899"/>
            <rect x="16" y="22" width="8" height="2" rx="1" fill="#7c3aed"/>
            <defs>
                <linearGradient id="loginGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                .login-input:focus { border: 2px solid #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1) !important; }
                .login-btn:hover { background: #5b21b6 !important; }
            `}</style>

            <div style={{ width: '100%', maxWidth: '460px' }}>

                {/* Card */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 20px 60px rgba(124,58,237,0.12)', border: '1px solid #f3f4f6' }}>

                    {/* Logo and brand */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <SpectraLogo size={56} />
                        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.75rem', fontWeight: '800', color: '#1e1b4b', marginTop: '1rem', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                            Spectra
                        </h1>
                        <p style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '400' }}>
                            Early autism awareness and screening
                        </p>
                    </div>

                    {/* Heading */}
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ color: '#7c3aed', fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                            Welcome back
                        </p>
                        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.6rem', fontWeight: '700', color: '#1e1b4b', letterSpacing: '-0.02em' }}>
                            Sign in to your account
                        </h2>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.875rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '14px', fontWeight: '500' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                Email Address
                            </label>
                            <input
                                className="login-input"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', transition: 'border 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '6px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                Password
                            </label>
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.875rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', transition: 'border 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', color: '#1f2937' }}
                            />
                        </div>

                        <button
                            className="login-btn"
                            type="submit"
                            disabled={loading}
                            style={{ width: '100%', padding: '1rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(124,58,237,0.3)', letterSpacing: '0.01em' }}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>
                            Don't have an account?{' '}
                            <Link to="/register" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>
                                Create one for free
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Below card */}
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#9ca3af', fontSize: '12px', lineHeight: '1.6' }}>
                    Spectra is not a clinical diagnostic tool. Always consult a qualified developmental pediatrician.
                </p>
            </div>
        </div>
    );
};

export default Login;