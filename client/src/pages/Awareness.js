import { useNavigate } from 'react-router-dom';

const sections = [
    {
        emoji: '🧠',
        title: 'What is autism?',
        color: '#f5f3ff',
        border: '#7c3aed',
        content: [
            'Autism Spectrum Disorder (ASD) is a neurodevelopmental condition that affects how a person communicates, interacts socially, and experiences the world around them.',
            'It is called a "spectrum" because every child with autism is different. Some may be nonverbal, some highly verbal. Some need significant support, others live fully independently.',
            'Autism is not an illness. It is not caused by bad parenting, vaccines, or screen time. It is a different way of experiencing the world.',
            'Early support — ideally before age 5 — makes a significant difference in a child\'s development and quality of life.'
        ]
    },
    {
        emoji: '📅',
        title: 'Early signs by age',
        color: '#f0fdf4',
        border: '#16a34a',
        content: [
            '12 months: Does not respond to their name. Does not babble or gesture (point, wave). No back-and-forth sounds with caregiver.',
            '18 months: Does not say single words. Does not point to show interest. Does not imitate others. Loses skills they previously had.',
            '24 months: Does not use two-word phrases. Shows little interest in other children. Lines up toys instead of playing with them. Unusual reactions to sounds or textures.',
            '36–48 months: Limited pretend play. Difficulty understanding others\' feelings. Repetitive movements like spinning or hand-flapping. Very rigid routines.'
        ]
    },
    {
        emoji: '❌',
        title: 'Myths vs facts',
        color: '#fff7ed',
        border: '#ea580c',
        content: [
            'MYTH: "He\'ll grow out of it." FACT: Autism does not go away, but early intervention helps children develop skills and reach their potential.',
            'MYTH: "She\'s just shy." FACT: Autism involves more than shyness — it affects communication, sensory processing, and social understanding.',
            'MYTH: "It\'s because of too much screen time." FACT: Screen time does not cause autism. ASD has genetic and neurological roots.',
            'MYTH: "Only boys get autism." FACT: Autism affects all genders. Girls are often diagnosed later because they may mask symptoms differently.'
        ]
    },
    {
        emoji: '🌈',
        title: 'Understanding the spectrum',
        color: '#fdf4ff',
        border: '#a21caf',
        content: [
            'No two children with autism are the same. The spectrum is wide and varied — from children who are nonverbal to those who are highly articulate.',
            'Some children have exceptional skills in music, memory, or mathematics. Others need significant support with daily activities.',
            'A diagnosis is not a ceiling. It is a starting point for understanding your child and getting them the right support.',
            'Your child is not "less." They experience the world differently — and with the right support, they can thrive.'
        ]
    }
];

const Awareness = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#f5f3ff' }}>
            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(109,40,217,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🧩</div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <button onClick={() => navigate('/dashboard')}
                    style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                    Back to dashboard
                </button>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '3rem 2rem', textAlign: 'center', color: 'white' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '0.5rem' }}>Awareness Hub 📖</h2>
                <p style={{ fontSize: '16px', opacity: '0.9', maxWidth: '500px', margin: '0 auto' }}>
                    Understanding autism is the first step. Read on to learn what it is, what to look for, and how to help.
                </p>
            </div>

            {/* Sections */}
            <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1.5rem' }}>
                {sections.map((section, i) => (
                    <div key={i} style={{ background: section.color, border: `2px solid ${section.border}`, borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '1.25rem' }}>
                            {section.emoji} {section.title}
                        </h3>
                        {section.content.map((point, j) => (
                            <div key={j} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: section.border, marginTop: '6px', flexShrink: 0 }} />
                                <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.6' }}>{point}</p>
                            </div>
                        ))}
                    </div>
                ))}

                {/* CTA */}
                <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '16px', padding: '2rem', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '0.5rem' }}>Ready to screen your child?</h3>
                    <p style={{ fontSize: '14px', opacity: '0.9', marginBottom: '1.5rem' }}>Take our age-appropriate behavioral screening — it takes less than 5 minutes.</p>
                    <button onClick={() => navigate('/screening')}
                        style={{ padding: '0.875rem 2rem', background: 'white', color: '#7c3aed', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                        Start screening →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Awareness;