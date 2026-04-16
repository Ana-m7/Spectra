import { useNavigate } from 'react-router-dom';

const Roadmap = () => {
    const navigate = useNavigate();
    const result = JSON.parse(localStorage.getItem('screeningResult'));
    const child = JSON.parse(localStorage.getItem('child'));

    if (!result) {
        navigate('/screening');
        return null;
    }

    const riskBand = result.riskBand;

    const tier1 = [
        'Keep a daily log of behaviors you notice — note time, duration, and triggers',
        'Observe how your child reacts to their name being called in different environments',
        'Note how your child communicates needs — pointing, gesturing, words, or crying',
        'Watch for repetitive behaviors and note how often they occur and for how long',
        'Observe your child during play — do they play alone or engage with others?'
    ];

    const tier2Script = [
        '"I have been noticing some behaviors in my child that I would like to discuss with you."',
        '"My child does not respond to their name consistently and has limited eye contact."',
        '"I would like a referral for a developmental evaluation or to see a developmental pediatrician."',
        '"I have been tracking these behaviors for several weeks and would like to share my observations."'
    ];

    const tier2 = riskBand === 'Medium' || riskBand === 'High';
    const tier3 = riskBand === 'High';

    const therapies = [
        { name: 'ABA Therapy', full: 'Applied Behavior Analysis', desc: 'Helps children learn new skills and reduce challenging behaviors through structured reinforcement techniques.' },
        { name: 'Speech Therapy', full: 'Speech-Language Therapy', desc: 'Helps children develop communication skills — both verbal and non-verbal including gestures and picture-based communication.' },
        { name: 'Occupational Therapy', full: 'OT', desc: 'Helps children with sensory processing, fine motor skills, and daily living activities like dressing and feeding.' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f5f3ff' }}>
            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(109,40,217,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>S</div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <button onClick={() => navigate('/dashboard')}
                    style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                    Dashboard
                </button>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '2.5rem 2rem', textAlign: 'center', color: 'white' }}>
                <h2 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '0.5rem' }}>Your Action Roadmap</h2>
                <p style={{ fontSize: '15px', opacity: '0.9' }}>
                    Personalized for {child?.name} · Risk level: {riskBand}
                </p>
            </div>

            <div style={{ maxWidth: '750px', margin: '2rem auto', padding: '0 1.5rem' }}>

                {/* Tier 1 — Always shown */}
                <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(109,40,217,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div style={{ width: '36px', height: '36px', background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#16a34a', flexShrink: 0 }}>1</div>
                        <div>
                            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>Observe</h3>
                            <p style={{ fontSize: '13px', color: '#6b7280' }}>Start here — track what you see over the next 4 weeks</p>
                        </div>
                    </div>
                    {tier1.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', marginTop: '6px', flexShrink: 0 }} />
                            <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>{item}</p>
                        </div>
                    ))}
                </div>

                {/* Tier 2 — Medium and High */}
                {tier2 && (
                    <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(109,40,217,0.07)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: '36px', height: '36px', background: '#fffbeb', border: '2px solid #d97706', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#d97706', flexShrink: 0 }}>2</div>
                            <div>
                                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>Consult your pediatrician</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>What to say at your next appointment</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#374151', marginBottom: '1rem', lineHeight: '1.6' }}>
                            Use these exact phrases when speaking to your doctor:
                        </p>
                        {tier2Script.map((line, i) => (
                            <div key={i} style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '0.875rem 1rem', marginBottom: '0.75rem' }}>
                                <p style={{ fontSize: '14px', color: '#4c1d95', lineHeight: '1.6', fontStyle: 'italic' }}>{line}</p>
                            </div>
                        ))}

                        {/* If dismissed */}
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', marginTop: '1rem' }}>
                            <p style={{ fontSize: '13px', fontWeight: '700', color: '#dc2626', marginBottom: '0.5rem' }}>If your doctor dismisses your concerns:</p>
                            <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                                Say: "I understand every child develops differently, but I would still like a referral for a developmental screening. As a parent I know my child best and I would like to rule this out." You have the right to ask for a second opinion or request a referral to a developmental pediatrician directly.
                            </p>
                        </div>
                    </div>
                )}

                {/* Tier 3 — High only */}
                {tier3 && (
                    <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(109,40,217,0.07)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ width: '36px', height: '36px', background: '#fef2f2', border: '2px solid #dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#dc2626', flexShrink: 0 }}>3</div>
                            <div>
                                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1f2937' }}>Seek specialist evaluation</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>Therapies that help and what they involve</p>
                            </div>
                        </div>
                        {therapies.map((t, i) => (
                            <div key={i} style={{ background: '#f9fafb', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
                                <p style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>{t.name} <span style={{ fontSize: '13px', fontWeight: '400', color: '#6b7280' }}>({t.full})</span></p>
                                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => navigate('/behaviors')}
                        style={{ padding: '1rem', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                        Behavior library
                    </button>
                    <button onClick={() => navigate('/screening')}
                        style={{ padding: '1rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                        Retake screening
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;