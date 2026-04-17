import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Awareness Hub',
            desc: 'Understand what autism is, what the spectrum means, and what early signs look like — before your child is even screened.',
            color: '#f5f3ff',
            border: '#7c3aed'
        },
        {
            title: 'Behavioral Screening',
            desc: 'Answer 10 simple questions about your child\'s behavior. Our ML model returns a risk band with plain-language explanations.',
            color: '#f0fdf4',
            border: '#16a34a'
        },
        {
            title: 'Action Roadmap',
            desc: 'Get personalized next steps, scripted talking points for your doctor, and a guide on what to do if they dismiss your concerns.',
            color: '#fff7ed',
            border: '#ea580c'
        }
    ];

    const stats = [
        { number: '1 in 36', label: 'children are on the autism spectrum' },
        { number: '5–8 yrs', label: 'average age of diagnosis in India' },
        { number: '< 5 min', label: 'to complete the Spectra screening' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'white' }}>

            {/* Navbar */}
            <nav style={{ padding: '1.25rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>S</div>
                    <span style={{ fontSize: '22px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => navigate('/awareness')}
                        style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '15px', cursor: 'pointer', fontWeight: '500' }}>
                        Awareness
                    </button>
                    <button onClick={() => navigate('/login')}
                        style={{ background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: '600' }}>
                        Login
                    </button>
                    <button onClick={() => navigate('/register')}
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', border: 'none', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: '600' }}>
                        Get started
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', padding: '5rem 3rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{ display: 'inline-block', background: '#ddd6fe', color: '#7c3aed', padding: '0.375rem 1rem', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '1.5rem' }}>
                        Early autism awareness for parents
                    </div>
                    <h1 style={{ fontSize: '44px', fontWeight: '800', color: '#1f2937', lineHeight: '1.2', marginBottom: '1.5rem' }}>
                        The first step to helping your child isn't a diagnosis.
                        <span style={{ color: '#7c3aed' }}> It's knowing what you're looking at.</span>
                    </h1>
                    <p style={{ fontSize: '18px', color: '#6b7280', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                        Spectra helps parents of children under 5 understand early signs of autism, screen their child's behavior, and find the right next steps — before it's too late to make a difference.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/register')}
                            style={{ padding: '0.875rem 2rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                            Get started — it's free
                        </button>
                        <button onClick={() => navigate('/awareness')}
                            style={{ padding: '0.875rem 2rem', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                            Learn about autism
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '3rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {stats.map((s, i) => (
                        <div key={i}>
                            <p style={{ fontSize: '36px', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>{s.number}</p>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Problem section */}
            <div style={{ padding: '5rem 3rem', maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{ fontSize: '30px', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>
                    Parents feel something is wrong. The system doesn't listen.
                </h2>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8', marginBottom: '1rem' }}>
                    Most parents sense something is different about their child as early as 12–18 months. But when they bring it up with their pediatrician, they're often told to wait and see. Meanwhile, the most critical window for intervention quietly closes.
                </p>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '1.8' }}>
                    Spectra was built for those parents. It gives you the awareness, the language, and the guidance to advocate for your child — before and after the doctor's appointment.
                </p>
            </div>

            {/* Features */}
            <div style={{ background: '#f9fafb', padding: '5rem 3rem' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', textAlign: 'center', marginBottom: '3rem' }}>
                    Everything you need in one place
                </h2>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {features.map((f, i) => (
                        <div key={i} style={{ background: f.color, border: `2px solid ${f.border}`, borderRadius: '16px', padding: '2rem' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem' }}>{f.title}</h3>
                            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '5rem 3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '30px', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
                    Ready to understand your child better?
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem' }}>
                    Create a free account and take the screening in under 5 minutes.
                </p>
                <button onClick={() => navigate('/register')}
                    style={{ padding: '1rem 2.5rem', background: 'white', color: '#7c3aed', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
                    Get started — it's free
                </button>
            </div>

            {/* Footer */}
            <div style={{ padding: '2rem 3rem', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>S</div>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <p style={{ fontSize: '13px', color: '#9ca3af' }}>Early autism awareness and screening platform. Not a clinical diagnostic tool.</p>
            </div>
        </div>
    );
};

export default Landing;