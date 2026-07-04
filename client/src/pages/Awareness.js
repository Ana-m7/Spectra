import { useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, CircleCheck, Sparkles, XCircle, CheckCircle } from 'lucide-react';
import SpectraLogo from '../components/SpectraLogo';

const sections = [
    {
        title: 'What is Autism?',
        border: '#7c3aed',
        tag: 'Foundation',
        tagBg: '#f5f3ff',
        tagColor: '#7c3aed',
        Icon: BookOpen,
        img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80&auto=format&fit=crop',
        content: [
            'Autism Spectrum Disorder (ASD) is a neurodevelopmental condition that affects how a person communicates, interacts socially, and experiences the world around them.',
            'It is called a spectrum because every child with autism is different. Some may be nonverbal, some highly verbal. Some need significant support, others live fully independently.',
            'Autism is not an illness. It is not caused by bad parenting, vaccines, or screen time. It is a different way of experiencing the world.',
            'Early support, ideally before age 5, makes a significant difference in a child\'s development and quality of life.'
        ]
    },
    {
        title: 'Early Signs by Age',
        border: '#16a34a',
        tag: 'Development',
        tagBg: '#f0fdf4',
        tagColor: '#16a34a',
        Icon: TrendingUp,
        img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80&auto=format&fit=crop',
        content: [
            '12 months: Does not respond when their name is called. Little to no babbling or consonant sounds. Does not gesture, including pointing, waving, or reaching to be picked up. Limited back-and-forth smiling or vocal exchange with caregiver.',
            '18 months: Has not said a single meaningful word. Does not point to show interest in things. Does not imitate simple actions like clapping or waving. Does not bring or show objects just to share enjoyment. May lose words or gestures they previously used.',
            '24 months: Does not combine two words into a phrase. Shows little interest in other children or parallel play. Lines up toys or objects instead of using them functionally. Unusual or extreme reactions to specific sounds, textures, or lights.',
            '36 months: Limited pretend or imaginative play. Difficulty noticing or responding when someone else is hurt or upset. Repetitive movements such as spinning, hand flapping, or toe walking. Becomes very distressed by small changes in routine or environment.',
            '48 months and older: Struggles with back-and-forth conversation, even in short sentences. Narrow, intense interests that dominate play and are hard to redirect from. Difficulty joining cooperative or group games with peers. Unusual tone, rhythm, or flatness in speech.'
        ]
    },
    {
        title: 'Myths vs Facts',
        border: '#ea580c',
        tag: 'Awareness',
        tagBg: '#fff7ed',
        tagColor: '#ea580c',
        Icon: CircleCheck,
        isMythFact: true,
        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop',
        content: [
            { myth: 'He will grow out of it.', fact: 'Autism does not go away, but early intervention helps children develop skills and reach their potential.' },
            { myth: 'She is just shy.', fact: 'Autism involves more than shyness. It affects communication, sensory processing, and social understanding.' },
            { myth: 'It is because of too much screen time.', fact: 'Screen time does not cause autism. ASD has genetic and neurological roots.' },
            { myth: 'Only boys get autism.', fact: 'Autism affects all genders. Girls are often diagnosed later because they may mask symptoms differently.' }
        ]
    },
    {
        title: 'Understanding the Spectrum',
        border: '#a21caf',
        tag: 'Perspective',
        tagBg: '#fdf4ff',
        tagColor: '#a21caf',
        Icon: Sparkles,
        img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80&auto=format&fit=crop',
        content: [
            'No two children with autism are the same. The spectrum is wide and varied, from children who are nonverbal to those who are highly articulate.',
            'Some children have exceptional skills in music, memory, or mathematics. Others need significant support with daily activities.',
            'A diagnosis is not a ceiling. It is a starting point for understanding your child and getting them the right support.',
            'Your child is not less. They experience the world differently, and with the right support, they can thrive.'
        ]
    }
];

const Awareness = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                .back-btn:hover { background: #7c3aed !important; color: white !important; }
                .cta-btn:hover { background: #f5f3ff !important; }
                .cta-outline-btn:hover { background: rgba(255,255,255,0.15) !important; border-color: white !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 12px rgba(124,58,237,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <SpectraLogo size={36} />
                    <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '20px', fontWeight: '700', color: '#4c1d95', letterSpacing: '-0.02em' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button className="back-btn" onClick={() => navigate('/dashboard')}
                        style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>
                        Dashboard
                    </button>
                    <button onClick={() => navigate('/screening')}
                        style={{ padding: '0.5rem 1.25rem', background: '#7c3aed', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                        Start Screening
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '5rem 3rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', transform: 'translate(30%, -50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', height: '300px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%', transform: 'translate(-30%, 50%)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '0.4rem 1.25rem', borderRadius: '999px', fontSize: '12px', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Awareness Hub
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                        Understanding autism is the first step.
                    </h2>
                    <p style={{ fontSize: '1.05rem', opacity: 0.85, maxWidth: '520px', margin: '0 auto', lineHeight: '1.8' }}>
                        Learn what autism is, recognize early signs by age, cut through common myths, and understand what the spectrum really means.
                    </p>
                </div>
            </div>

            {/* Sections */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>
                {sections.map((section, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 4px 30px rgba(124,58,237,0.08)', borderTop: `4px solid ${section.border}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', alignItems: 'stretch' }}>

                            {/* Image — alternates sides */}
                            {i % 2 === 0 && (
                                <div style={{ overflow: 'hidden' }}>
                                    <img src={section.img} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                </div>
                            )}

                            {/* Content */}
                            <div style={{ padding: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                                    <span style={{ background: section.tagBg, color: section.tagColor, border: `1px solid ${section.border}20`, padding: '0.3rem 0.875rem', borderRadius: '999px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <section.Icon size={13} />
                                        {section.tag}
                                    </span>
                                </div>
                                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.4rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
                                    {section.title}
                                </h3>
                                {section.isMythFact ? (
                                    section.content.map((point, j) => (
                                        <div key={j} style={{ marginBottom: '1.25rem' }}>
                                            <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center', marginBottom: '0.375rem' }}>
                                                <XCircle size={16} color="#9ca3af" style={{ flexShrink: 0 }} />
                                                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: '1.6', textDecoration: 'line-through', textDecorationColor: '#d1d5db' }}>{point.myth}</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                                                <CheckCircle size={16} color={section.border} style={{ flexShrink: 0 }} />
                                                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.75', fontWeight: '500' }}>{point.fact}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    section.content.map((point, j) => (
                                        <div key={j} style={{ display: 'flex', gap: '0.875rem', marginBottom: '1rem', alignItems: 'center' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: section.border, flexShrink: 0 }} />
                                            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.75' }}>{point}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Image — alternates sides */}
                            {i % 2 !== 0 && (
                                <div style={{ overflow: 'hidden' }}>
                                    <img src={section.img} alt={section.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* CTA Banner */}
                <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', borderRadius: '24px', padding: '3.5rem', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(30%, -50%)' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.75rem' }}>
                            Next Step
                        </p>
                        <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '700', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                            Ready to screen your child?
                        </h3>
                        <p style={{ fontSize: '15px', opacity: 0.8, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
                            Take our age appropriate behavioral screening. It takes less than 5 minutes and gives you a clear, plain language result.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="cta-btn" onClick={() => navigate('/screening')}
                                style={{ padding: '0.875rem 2rem', background: 'white', color: '#7c3aed', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s', fontFamily: 'Inter, sans-serif' }}>
                                Start Screening
                            </button>
                            <button className="cta-outline-btn" onClick={() => navigate('/behaviors')}
                                style={{ padding: '0.875rem 2rem', background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                                Explore Behavior Library
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Awareness;