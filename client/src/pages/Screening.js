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

    if (!child) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <p>Please add your child first.</p>
                    <button onClick={() => navigate('/add-child')}
                        style={{ marginTop: '1rem', padding: '0.75rem 2rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
                        Add Child
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f5f3ff' }}>
            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(109,40,217,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>S</div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Screening for <strong style={{ color: '#4c1d95' }}>{child.name}</strong></span>
            </nav>

            {/* Progress bar */}
            <div style={{ background: '#e5e7eb', height: '6px' }}>
                <div style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)', height: '100%', width: `${progress}%`, transition: 'width 0.3s ease' }} />
            </div>

            {/* Question */}
            <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1.5rem' }}>
                <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 10px 40px rgba(109,40,217,0.1)' }}>

                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '1rem', fontWeight: '500' }}>
                        QUESTION {current + 1} OF {questions.length}
                    </p>

                    <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#1f2937', lineHeight: '1.5', marginBottom: '2.5rem' }}>
                        {questions[current].text}
                    </h2>

                    {error && (
                        <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => handleAnswer('yes')}
                            disabled={loading}
                            style={{ flex: 1, padding: '1rem', background: '#f0fdf4', border: '2px solid #16a34a', color: '#16a34a', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.target.style.background = '#16a34a'; e.target.style.color = 'white'; }}
                            onMouseOut={e => { e.target.style.background = '#f0fdf4'; e.target.style.color = '#16a34a'; }}>
                            Yes
                        </button>
                        <button
                            onClick={() => handleAnswer('no')}
                            disabled={loading}
                            style={{ flex: 1, padding: '1rem', background: '#fef2f2', border: '2px solid #dc2626', color: '#dc2626', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={e => { e.target.style.background = '#dc2626'; e.target.style.color = 'white'; }}
                            onMouseOut={e => { e.target.style.background = '#fef2f2'; e.target.style.color = '#dc2626'; }}>
                            No
                        </button>
                    </div>

                    {loading && (
                        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#7c3aed', fontWeight: '500' }}>
                            Analyzing responses...
                        </p>
                    )}
                </div>

                {/* Back button */}
                {current > 0 && (
                    <button onClick={() => setCurrent(current - 1)}
                        style={{ marginTop: '1rem', background: 'transparent', border: 'none', color: '#7c3aed', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                        Back to previous question
                    </button>
                )}
            </div>
        </div>
    );
};

export default Screening;