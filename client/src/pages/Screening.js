import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitScreening } from '../services/api';

const questions = [
    { id: 'A1', text: 'Does your child respond when you call their name?', reverse: true },
    { id: 'A2', text: 'Does your child make eye contact with you?', reverse: true },
    { id: 'A3', text: 'Does your child point to show you things they find interesting?', reverse: true },
    { id: 'A4', text: 'Does your child respond to your smile by smiling back?', reverse: true },
    { id: 'A5', text: 'Does your child imitate actions you do, like clapping or waving?', reverse: true },
    { id: 'A6', text: 'Does your child notice when someone around them is hurt or upset?', reverse: true },
    { id: 'A7', text: 'Does your child respond normally to sounds around them?', reverse: true },
    { id: 'A8', text: 'Does your child show repetitive movements like spinning, rocking, or hand flapping?', reverse: false },
    { id: 'A9', text: 'Does your child use facial expressions to communicate feelings?', reverse: true },
    { id: 'A10', text: 'Does your child engage in back and forth interaction with you?', reverse: true },
];

const Screening = () => {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const child = JSON.parse(localStorage.getItem('child'));

    const handleAnswer = async (value) => {
        const question = questions[current];
        const encoded = question.reverse ? (value === 'yes' ? 0 : 1) : (value === 'yes' ? 1 : 0);
        const newAnswers = { ...answers, [question.id]: encoded };
        setAnswers(newAnswers);

        if (current < questions.length - 1) {
            setCurrent(current + 1);
        } else {
            setLoading(true);
            setError('');
            try {
                const responses = {
                    ...newAnswers,
                    Age_Mons: child?.ageBand === '12m' ? 12 : child?.ageBand === '18m' ? 18 : child?.ageBand === '24m' ? 24 : child?.ageBand === '36m' ? 36 : 48,
                    Sex: 1,
                    Ethnicity: 5,
                    Jaundice: 0,
                    Family_mem_with_ASD: 0
                };
                const { data } = await submitScreening({
                    childId: child._id,
                    responses
                });
                localStorage.setItem('screeningResult', JSON.stringify(data));
                navigate('/result');
            } catch (err) {
                setError('Something went wrong. Please try again.');
            }
            setLoading(false);
        }
    };

    const progress = ((current) / questions.length) * 100;

    const SpectraLogo = ({ size = 36 }) => (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#screenGrad)"/>
            <path d="M20 8C16 8 13 11 13 15C13 17 14 18.5 15.5 19.5C13.5 20.5 12 22.5 12 25C12 28.5 15 31 19 31H21C25 31 28 28.5 28 25C28 22.5 26.5 20.5 24.5 19.5C26 18.5 27 17 27 15C27 11 24 8 20 8Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="15" r="2" fill="#7c3aed"/>
            <circle cx="23" cy="15" r="2" fill="#ec4899"/>
            <rect x="16" y="22" width="8" height="2" rx="1" fill="#7c3aed"/>
            <defs>
                <linearGradient id="screenGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );

    if (!child) {
        return (
            <div style={{ minHeight: '100vh', background: '#f9f8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', textAlign: 'center', boxShadow: '0 10px 40px rgba(124,58,237,0.1)', maxWidth: '400px' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.75rem' }}>No child profile found</h2>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '1.5rem', lineHeight: '1.6' }}>Please add your child's profile before taking the screening.</p>
                    <button onClick={() => navigate('/add-child')}
                        style={{ padding: '0.875rem 2rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>
                        Add Child Profile
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                .yes-btn:hover { background: #16a34a !important; color: white !important; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22,163,74,0.3) !important; }
                .no-btn:hover { background: #dc2626 !important; color: white !important; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(220,38,38,0.3) !important; }
                .back-link:hover { color: #4c1d95 !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 12px rgba(124,58,237,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <SpectraLogo size={36} />
                    <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: '700', color: '#4c1d95', letterSpacing: '-0.02em' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                        Screening for <strong style={{ color: '#4c1d95' }}>{child.name}</strong>
                    </span>
                    <span style={{ background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '12px', fontWeight: '600' }}>
                        {child.ageBand}
                    </span>
                </div>
            </nav>

            {/* Progress bar */}
            <div style={{ background: '#e5e7eb', height: '4px' }}>
                <div style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)', height: '100%', width: `${progress}%`, transition: 'width 0.4s ease' }} />
            </div>

            {/* Main content */}
            <div style={{ maxWidth: '680px', margin: '0 auto', padding: '4rem 2rem' }}>

                {/* Progress indicator */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '13px', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Question {current + 1} of {questions.length}
                    </p>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {questions.map((_, i) => (
                            <div key={i} style={{ width: '28px', height: '4px', borderRadius: '999px', background: i < current ? '#7c3aed' : i === current ? '#ec4899' : '#e5e7eb', transition: 'background 0.3s' }} />
                        ))}
                    </div>
                </div>

                {/* Question card */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '3rem', boxShadow: '0 10px 40px rgba(124,58,237,0.1)', borderTop: '4px solid #7c3aed', marginBottom: '1.5rem' }}>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            Behavioral Screening
                        </p>
                        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: '700', color: '#1e1b4b', lineHeight: '1.4', letterSpacing: '-0.01em' }}>
                            {questions[current].text}
                        </h2>
                    </div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.875rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '14px', fontWeight: '500' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button
                            className="yes-btn"
                            onClick={() => handleAnswer('yes')}
                            disabled={loading}
                            style={{ padding: '1.25rem', background: '#f0fdf4', border: '2px solid #16a34a', color: '#16a34a', borderRadius: '14px', fontSize: '17px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>
                            Yes
                        </button>
                        <button
                            className="no-btn"
                            onClick={() => handleAnswer('no')}
                            disabled={loading}
                            style={{ padding: '1.25rem', background: '#fef2f2', border: '2px solid #dc2626', color: '#dc2626', borderRadius: '14px', fontSize: '17px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>
                            No
                        </button>
                    </div>

                    {loading && (
                        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: '#f5f3ff', borderRadius: '12px' }}>
                            <p style={{ color: '#7c3aed', fontWeight: '600', fontSize: '15px' }}>
                                Analyzing your responses...
                            </p>
                            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '0.25rem' }}>
                                This takes just a moment
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {current > 0 ? (
                        <button className="back-link" onClick={() => setCurrent(current - 1)}
                            style={{ background: 'transparent', border: 'none', color: '#7c3aed', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Back to previous question
                        </button>
                    ) : <div />}
                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                        {questions.length - current - 1} questions remaining
                    </p>
                </div>

                {/* Disclaimer */}
                <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'white', borderRadius: '12px', border: '1px solid #f3f4f6' }}>
                    <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.6', textAlign: 'center' }}>
                        This screening is based on M-CHAT-R criteria and is not a clinical diagnostic tool. Results should always be discussed with a qualified developmental pediatrician.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Screening;