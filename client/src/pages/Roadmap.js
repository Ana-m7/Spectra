import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Stethoscope, HeartHandshake, Target, MessageSquare, Hand, ShieldAlert } from 'lucide-react';
import SpectraLogo from '../components/SpectraLogo';
import { getBehaviors } from '../services/api';
import { SCREENING_QUESTIONS } from '../constants/screeningQuestions';

const GENERIC_OBSERVE_ITEMS = [
    'Keep a daily log of behaviors you notice. Note the time, duration, and what triggered them.',
    'Observe your child during play. Do they play alone or engage with others?',
    'Note how your child communicates needs, whether through pointing, gesturing, words, or crying.',
    'Watch for repetitive behaviors and note how often they occur and for how long.',
    'Observe how your child reacts to their name being called in different environments.',
];

const Roadmap = () => {
    const navigate = useNavigate();
    const result = JSON.parse(localStorage.getItem('screeningResult'));
    const child = JSON.parse(localStorage.getItem('child'));
    const [observeItems, setObserveItems] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const ageBand = child?.ageBand;
        const ageNote = (ageBand === '12m' || ageBand === '18m')
            ? 'At this age, watch specifically for babbling, pointing, and response to their name, since these are the most critical early markers.'
            : (ageBand === '24m' || ageBand === '36m')
                ? 'At this age, note whether your child uses two word phrases and shows interest in other children during play.'
                : 'At this age, observe whether your child engages in pretend play and can understand simple instructions.';

        const flagged = JSON.parse(localStorage.getItem('screeningFlags') || '[]');

        if (!flagged.length) {
            setObserveItems([...GENERIC_OBSERVE_ITEMS, ageNote]);
            return;
        }

        (async () => {
            const results = await Promise.all(flagged.map(async (qId) => {
                const q = SCREENING_QUESTIONS.find(x => x.id === qId);
                if (!q) return null;
                try {
                    const { data } = await getBehaviors({ search: q.keyword });
                    return data && data.length > 0 ? data[0].whatToObserve : null;
                } catch {
                    return null;
                }
            }));

            const matched = results.filter(Boolean);
            const combined = matched.length > 0
                ? [...matched, ...GENERIC_OBSERVE_ITEMS.slice(0, Math.max(0, 3 - matched.length))]
                : GENERIC_OBSERVE_ITEMS;

            if (!cancelled) setObserveItems([...combined.slice(0, 6), ageNote]);
        })();

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!result) {
        navigate('/screening');
        return null;
    }

    const riskBand = result.riskBand;
    const tier2 = riskBand === 'Medium' || riskBand === 'High';
    const tier3 = riskBand === 'High';

    const riskColors = {
        Low: { color: '#16a34a', bg: '#f0fdf4', border: '#16a34a' },
        Medium: { color: '#d97706', bg: '#fffbeb', border: '#d97706' },
        High: { color: '#dc2626', bg: '#fef2f2', border: '#dc2626' },
    };
    const rc = riskColors[riskBand] || riskColors['Low'];

    // Personalized based on SHAP explanations
    const topFactors = result.explanations?.map(e => e.explanation) || [];

    const getPersonalizedScript = () => {
        const factorLines = topFactors.map(f => `My child shows signs of: ${f.toLowerCase()}.`);
        return [
            'I have been noticing some behaviors in my child that I would like to discuss with you.',
            ...factorLines,
            'I would like a referral for a developmental evaluation or to see a developmental pediatrician.',
            'I have been tracking these behaviors for several weeks and would like to share my observations.'
        ];
    };

    const therapies = [
        {
            name: 'ABA Therapy',
            full: 'Applied Behavior Analysis',
            desc: 'Helps children learn new skills and reduce challenging behaviors through structured reinforcement techniques.',
            color: '#7c3aed', bg: '#f5f3ff', Icon: Target
        },
        {
            name: 'Speech Therapy',
            full: 'Speech-Language Therapy',
            desc: 'Helps children develop communication skills, both verbal and non-verbal, including gestures and picture-based communication.',
            color: '#16a34a', bg: '#f0fdf4', Icon: MessageSquare
        },
        {
            name: 'Occupational Therapy',
            full: 'OT',
            desc: 'Helps children with sensory processing, fine motor skills, and daily living activities like dressing and feeding.',
            color: '#d97706', bg: '#fffbeb', Icon: Hand
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                .dash-btn:hover { background: #7c3aed !important; color: white !important; }
                .outline-btn:hover { background: #7c3aed !important; color: white !important; }
                .primary-btn:hover { background: #5b21b6 !important; }
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

            {/* Hero — tighter */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '2.5rem 3rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', transform: 'translate(30%, -50%)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '0.3rem 1rem', borderRadius: '999px', fontSize: '11px', fontWeight: '600', marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Personalized Guidance
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                        Your Action Roadmap
                    </h2>
                    <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1rem', lineHeight: '1.6' }}>
                        Personalized for {child?.name} based on your screening results
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '0.4rem 1.25rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: rc.color }} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>Risk Level: {riskBand}</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Timeline label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        Your {tier3 ? '3' : tier2 ? '2' : '1'}-Step Roadmap
                    </p>
                    <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                </div>

                {/* TIER 1 */}
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', boxShadow: '0 2px 16px rgba(124,58,237,0.07)', borderLeft: '4px solid #16a34a' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '800', color: '#16a34a', fontSize: '1rem', flexShrink: 0 }}>1</div>
                        <div>
                            <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Eye size={16} color="#16a34a" />
                                Observe
                            </h3>
                            <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Track what you see over the next 4 weeks</p>
                        </div>
                    </div>
                    <div style={{ padding: '1.25rem 1.5rem' }}>
                        {observeItems === null ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                                <div style={{ width: '18px', height: '18px', border: '2.5px solid #f3f4f6', borderTop: '2.5px solid #16a34a', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                <p style={{ fontSize: '13px', color: '#9ca3af' }}>Personalizing your observations...</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '0.75rem 1.5rem' }}>
                                {observeItems.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#f0fdf4', border: '1.5px solid #16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#16a34a', flexShrink: 0 }}>
                                            {i + 1}
                                        </div>
                                        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7' }}>{item}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* TIER 2 */}
                {tier2 && (
                    <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', boxShadow: '0 2px 16px rgba(124,58,237,0.07)', borderLeft: '4px solid #d97706' }}>
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: '#fffbeb', border: '2px solid #d97706', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '800', color: '#d97706', fontSize: '1rem', flexShrink: 0 }}>2</div>
                            <div>
                                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Stethoscope size={16} color="#d97706" />
                                    Consult Your Pediatrician
                                </h3>
                                <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>What to say at your next appointment</p>
                            </div>
                        </div>
                        <div style={{ padding: '1.25rem 1.5rem', maxWidth: '750px' }}>
                            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1rem', lineHeight: '1.7' }}>
                                These talking points are based on your child's specific screening results. Use them at your next appointment:
                            </p>
                            {getPersonalizedScript().map((line, i) => (
                                <div key={i} style={{ background: '#f9f8ff', border: '1px solid #ede9fe', borderRadius: '10px', padding: '0.875rem 1rem', marginBottom: '0.625rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#7c3aed', flexShrink: 0 }} />
                                    <p style={{ fontSize: '14px', color: '#4c1d95', lineHeight: '1.7', fontStyle: i === 0 || i === getPersonalizedScript().length - 1 ? 'normal' : 'italic' }}>{line}</p>
                                </div>
                            ))}

                            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '1.25rem', marginTop: '1.25rem' }}>
                                <p style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <ShieldAlert size={14} color="#dc2626" />
                                    If Your Doctor Dismisses Your Concerns
                                </p>
                                <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.75' }}>
                                    Say: "I understand every child develops differently, but I would still like a referral for a developmental screening. As a parent I know my child best and I would like to rule this out." You have the right to ask for a second opinion or request a referral to a developmental pediatrician directly.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* TIER 3 */}
                {tier3 && (
                    <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.25rem', boxShadow: '0 2px 16px rgba(124,58,237,0.07)', borderLeft: '4px solid #dc2626' }}>
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: '#fef2f2', border: '2px solid #dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: '800', color: '#dc2626', fontSize: '1rem', flexShrink: 0 }}>3</div>
                            <div>
                                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <HeartHandshake size={16} color="#dc2626" />
                                    Seek Specialist Evaluation
                                </h3>
                                <p style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>Therapies that help and what they involve</p>
                            </div>
                        </div>
                        <div style={{ padding: '1.25rem 1.5rem' }}>
                            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1.25rem', lineHeight: '1.7' }}>
                                The following therapies are commonly recommended for children showing early indicators. Discuss with your developmental pediatrician which combination is right for {child?.name}.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.875rem' }}>
                                {therapies.map((t, i) => (
                                    <div key={i} style={{ background: t.bg, border: `1px solid ${t.color}25`, borderRadius: '12px', padding: '1.1rem 1.25rem', borderLeft: `3px solid ${t.color}` }}>
                                        <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '0.95rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                            <t.Icon size={15} color={t.color} />
                                            {t.name}
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '500', color: '#9ca3af' }}>({t.full})</span>
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.7' }}>{t.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '0.875rem', maxWidth: '700px', margin: '0 auto 0.875rem' }}>
                    <button className="outline-btn" onClick={() => navigate('/behaviors')}
                        style={{ padding: '0.875rem', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                        Behavior Library
                    </button>
                    <button className="primary-btn" onClick={() => navigate('/screening')}
                        style={{ padding: '0.875rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 14px rgba(124,58,237,0.25)' }}>
                        Retake Screening
                    </button>
                </div>

                <button onClick={() => navigate('/dashboard')}
                    style={{ display: 'block', width: '100%', maxWidth: '700px', margin: '0 auto', padding: '0.75rem', background: 'white', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Roadmap;