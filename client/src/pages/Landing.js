import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Awareness Hub',
            desc: 'Understand what autism is, what the spectrum means, and what early signs look like before your child is even screened.',
            color: '#f5f3ff',
            border: '#7c3aed',
            img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80&auto=format&fit=crop'
        },
        {
            title: 'Behavioral Screening',
            desc: 'Answer 10 simple questions about your child\'s behavior. Our Screening test returns a risk band with plain language explanations.',
            color: '#f0fdf4',
            border: '#16a34a',
            img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop'
        },
        {
            title: 'Action Roadmap',
            desc: 'Get personalized next steps, scripted talking points for your doctor, and a guide on what to do if they dismiss your concerns.',
            color: '#fff7ed',
            border: '#ea580c',
            img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80&auto=format&fit=crop'
        }
    ];

    const stats = [
        { number: '1 in 36', label: 'children are on the autism spectrum' },
        { number: '5 to 8 yrs', label: 'average age of diagnosis in India' },
        { number: 'Under 5 min', label: 'to complete the Spectra screening' },
    ];

    const SpectraLogo = ({ size = 36 }) => (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="url(#landingGrad)"/>
            <path d="M20 8C16 8 13 11 13 15C13 17 14 18.5 15.5 19.5C13.5 20.5 12 22.5 12 25C12 28.5 15 31 19 31H21C25 31 28 28.5 28 25C28 22.5 26.5 20.5 24.5 19.5C26 18.5 27 17 27 15C27 11 24 8 20 8Z" fill="white" opacity="0.9"/>
            <circle cx="17" cy="15" r="2" fill="#7c3aed"/>
            <circle cx="23" cy="15" r="2" fill="#ec4899"/>
            <rect x="16" y="22" width="8" height="2" rx="1" fill="#7c3aed"/>
            <defs>
                <linearGradient id="landingGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#7c3aed"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                </linearGradient>
            </defs>
        </svg>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'white', fontFamily: "'Georgia', 'Times New Roman', serif" }}>

            {/* Google Font import */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
                .landing-headline { font-family: 'Playfair Display', Georgia, serif !important; }
                .landing-body { font-family: 'Inter', sans-serif !important; }
                .feature-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 40px rgba(124,58,237,0.15) !important; }
                .nav-btn:hover { background: #f5f3ff !important; }
                .cta-primary:hover { background: #5b21b6 !important; }
                .cta-outline:hover { background: #7c3aed !important; color: white !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{ padding: '1.25rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <SpectraLogo size={38} />
                    <span className="landing-headline" style={{ fontSize: '22px', fontWeight: '700', color: '#4c1d95', letterSpacing: '-0.02em' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button className="nav-btn landing-body" onClick={() => navigate('/awareness')}
                        style={{ background: 'transparent', border: 'none', color: '#6b7280', fontSize: '15px', cursor: 'pointer', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }}>
                        Awareness Hub
                    </button>
                    <button className="nav-btn landing-body" onClick={() => navigate('/login')}
                        style={{ background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s' }}>
                        Login
                    </button>
                    <button className="cta-primary landing-body" onClick={() => navigate('/register')}
                        style={{ background: '#7c3aed', border: 'none', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s' }}>
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #fdf4ff 50%, #ede9fe 100%)', padding: '6rem 4rem 5rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="landing-body" style={{ display: 'inline-block', background: 'white', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.4rem 1.25rem', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '2rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Early Autism Awareness for Parents
                    </div>
                    <h1 className="landing-headline" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: '800', color: '#1e1b4b', lineHeight: '1.15', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        The first step to helping your child is not a diagnosis.
                        <span style={{ color: '#7c3aed' }}> It is knowing what you are looking for.</span>
                    </h1>
                    <p className="landing-body" style={{ fontSize: '1.15rem', color: '#6b7280', lineHeight: '1.8', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Spectra helps parents of children under 5 understand early signs of autism, screen their child's behavior, and find the right next steps before it is too late to make a difference.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="cta-primary landing-body" onClick={() => navigate('/register')}
                            style={{ padding: '1rem 2.25rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>
                            Get Started, It Is Free
                        </button>
                        <button className="cta-outline landing-body" onClick={() => navigate('/awareness')}
                            style={{ padding: '1rem 2.25rem', background: 'white', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                            Learn About Autism
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero image */}
            <div style={{ position: 'relative', overflow: 'hidden', height: '480px' }}>
                <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=1400&q=80&auto=format&fit=crop"
                    alt="Parent with young child"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(124,58,237,0.7) 0%, rgba(124,58,237,0.2) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', left: '4rem', top: '50%', transform: 'translateY(-50%)', color: 'white', maxWidth: '460px' }}>
                    <h2 className="landing-headline" style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.3', marginBottom: '1rem' }}>
                        Built from a real family's experience.
                    </h2>
                    <p className="landing-body" style={{ fontSize: '1rem', opacity: 0.9, lineHeight: '1.7' }}>
                        Spectra was created because families deserve better than silence. Better than being dismissed. Better than searching alone.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', padding: '4rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                            <p className="landing-headline" style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>{s.number}</p>
                            <p className="landing-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Problem section */}
            <div style={{ padding: '6rem 4rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <div className="landing-body" style={{ display: 'inline-block', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.4rem 1.25rem', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '1.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    The Problem
                </div>
                <h2 className="landing-headline" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '700', color: '#1e1b4b', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                    Parents feel something is wrong. The system does not listen.
                </h2>
                <p className="landing-body" style={{ fontSize: '1.05rem', color: '#6b7280', lineHeight: '1.9', marginBottom: '1.25rem' }}>
                    Most parents sense something is different about their child as early as 12 to 18 months. But when they bring it up with their pediatrician, they are often told to wait and see. Meanwhile, the most critical window for intervention quietly closes.
                </p>
                <p className="landing-body" style={{ fontSize: '1.05rem', color: '#6b7280', lineHeight: '1.9' }}>
                    Spectra was built for those parents. It gives you the awareness, the language, and the guidance to advocate for your child before and after the doctor's appointment.
                </p>
            </div>

            {/* Features */}
            <div style={{ background: '#fafafa', padding: '6rem 4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div className="landing-body" style={{ display: 'inline-block', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.4rem 1.25rem', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Platform Features
                    </div>
                    <h2 className="landing-headline" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.75rem' }}>
                        Everything you need in one place
                    </h2>
                    <p className="landing-body" style={{ fontSize: '1rem', color: '#6b7280', maxWidth: '500px', margin: '0 auto' }}>
                        From understanding the basics to taking action. Spectra walks you through every step.
                    </p>
                </div>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {features.map((f, i) => (
                        <div key={i} className="feature-card" style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'default' }}>
                            <img src={f.img} alt={f.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '2rem', borderTop: `4px solid ${f.border}` }}>
                                <h3 className="landing-headline" style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.75rem' }}>{f.title}</h3>
                                <p className="landing-body" style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.75' }}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '6rem 4rem', textAlign: 'center' }}>
                <h2 className="landing-headline" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '800', color: 'white', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    Ready to understand your child better?
                </h2>
                <p className="landing-body" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
                    Create a free account and take the screening in under 5 minutes.
                </p>
                <button className="landing-body" onClick={() => navigate('/register')}
                    style={{ padding: '1.1rem 3rem', background: 'white', color: '#7c3aed', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
                    Get Started, It Is Free
                </button>
            </div>

            {/* Footer */}
            <div style={{ background: '#1e1b4b', padding: '3rem 4rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <SpectraLogo size={34} />
                        <span className="landing-headline" style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>Spectra</span>
                    </div>
                    <p className="landing-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', maxWidth: '400px', textAlign: 'center', lineHeight: '1.6' }}>
                        Early autism awareness and screening platform. Not a clinical diagnostic tool. Always consult a qualified developmental pediatrician.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <button className="landing-body" onClick={() => navigate('/awareness')}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                            Awareness
                        </button>
                        <button className="landing-body" onClick={() => navigate('/login')}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                            Login
                        </button>
                        <button className="landing-body" onClick={() => navigate('/register')}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;