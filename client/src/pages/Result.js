import { useNavigate } from 'react-router-dom';

const riskConfig = {
    Low: {
        color: '#16a34a',
        bg: '#f0fdf4',
        border: '#16a34a',
        label: 'Low Risk',
        message: 'No significant indicators were detected. Continue monitoring your child\'s development and check back in a few months.',
        gradient: 'linear-gradient(135deg, #16a34a, #22c55e)'
    },
    Medium: {
        color: '#d97706',
        bg: '#fffbeb',
        border: '#d97706',
        label: 'Medium Risk',
        message: 'Some indicators were noted. We recommend discussing these observations with your pediatrician at your next visit.',
        gradient: 'linear-gradient(135deg, #d97706, #f59e0b)'
    },
    High: {
        color: '#dc2626',
        bg: '#fef2f2',
        border: '#dc2626',
        label: 'High Risk',
        message: 'Several indicators were detected. We strongly recommend seeking a developmental evaluation as soon as possible.',
        gradient: 'linear-gradient(135deg, #dc2626, #ef4444)'
    },
};

const Result = () => {
    const navigate = useNavigate();
    const result = JSON.parse(localStorage.getItem('screeningResult'));
    const child = JSON.parse(localStorage.getItem('child'));

    if (!result) {
        navigate('/screening');
        return null;
    }

    const config = riskConfig[result.riskBand] || riskConfig['Low'];

    const SpectraLogo = ({ size = 36 }) => (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#resultGrad)"/>
            <path d="M20 8C16 8 13 11 13 15C13 17 14 18.5 15.5 19.5C13.5 20.5 12 22.5 12 25C12 28.5 15 31 19 31H21C25 31 28 28.5 28 25C28 22.5 26.5 20.5 24.5 19.5C26 18.5 27 17 27 15C27 11 24 8 20 8Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="15" r="2" fill="#7c3aed"/>
            <circle cx="23" cy="15" r="2" fill="#ec4899"/>
            <rect x="16" y="22" width="8" height="2" rx="1" fill="#7c3aed"/>
            <defs>
                <linearGradient id="resultGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                .action-btn-primary:hover { opacity: 0.9 !important; transform: translateY(-2px); }
                .action-btn-outline:hover { background: #7c3aed !important; color: white !important; }
                .dash-btn:hover { background: #f5f3ff !important; color: #7c3aed !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 12px rgba(124,58,237,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <SpectraLogo size={36} />
                    <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: '700', color: '#4c1d95', letterSpacing: '-0.02em' }}>Spectra</span>
                </div>
                <button className="dash-btn" onClick={() => navigate('/dashboard')}
                    style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>
                    Dashboard
                </button>
            </nav>

            {/* Hero banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '3rem', textAlign: 'center', color: 'white' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.5rem' }}>
                    Screening Complete
                </p>
                <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Results for {child?.name}
                </h2>
                <p style={{ fontSize: '15px', opacity: 0.75 }}>
                    Age band: {child?.ageBand} · Based on M-CHAT-R criteria
                </p>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>

                {/* Risk band card */}
                <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(124,58,237,0.1)', marginBottom: '1.5rem', borderTop: `4px solid ${config.color}` }}>

                    {/* Risk level header */}
                    <div style={{ background: config.bg, padding: '2.5rem', textAlign: 'center', borderBottom: `1px solid ${config.border}20` }}>
                        <p style={{ fontSize: '11px', color: config.color, fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                            Risk Assessment
                        </p>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'white', border: `2px solid ${config.border}`, borderRadius: '999px', padding: '0.5rem 1.75rem', marginBottom: '1rem' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: config.gradient }} />
                            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', fontWeight: '800', color: config.color }}>
                                {config.label}
                            </span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto' }}>
                            {config.message}
                        </p>
                    </div>

                    <div style={{ padding: '2rem' }}>

                        {/* Confidence score */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                                    Model Confidence
                                </p>
                                <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.1rem', fontWeight: '700', color: config.color }}>
                                    {Math.round(result.confidence * 100)}%
                                </span>
                            </div>
                            <div style={{ background: '#f3f4f6', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                                <div style={{ background: config.gradient, height: '100%', borderRadius: '999px', width: `${result.confidence * 100}%`, transition: 'width 1s ease' }} />
                            </div>
                        </div>

                        {/* Key factors */}
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                                Key Factors in This Result
                            </p>
                            {result.explanations.map((exp, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.875rem', padding: '1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid #f3f4f6' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: config.bg, border: `1.5px solid ${config.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: '700', color: config.color }}>
                                        {i + 1}
                                    </div>
                                    <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.65', paddingTop: '2px' }}>{exp.explanation}</p>
                                </div>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem' }}>
                            <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                Important Notice
                            </p>
                            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.7' }}>
                                {result.disclaimer} This tool is designed to assist parents in identifying potential early indicators. It is not a substitute for professional medical evaluation. Always consult a qualified developmental pediatrician.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <button className="action-btn-primary" onClick={() => navigate('/roadmap')}
                        style={{ padding: '1rem 1.5rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>
                        View Action Roadmap
                    </button>
                    <button className="action-btn-outline" onClick={() => navigate('/behaviors')}
                        style={{ padding: '1rem 1.5rem', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                        Behavior Library
                    </button>
                </div>

                <button onClick={() => navigate('/dashboard')}
                    style={{ width: '100%', padding: '0.875rem', background: 'white', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Result;