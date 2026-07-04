import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SpectraLogo from '../components/SpectraLogo';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const child = JSON.parse(localStorage.getItem('child'));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cards = [
        {
            title: 'Awareness Hub',
            desc: 'Learn what autism is, understand early signs by age, and cut through common myths with India specific facts.',
            border: '#7c3aed',
            path: '/awareness',
            img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80&auto=format&fit=crop',
            tag: 'Public'
        },
        {
            title: 'Behavioral Screening',
            desc: 'Take the age appropriate screening for your child based on M-CHAT-R criteria. Takes under 5 minutes.',
            border: '#16a34a',
            path: '/screening',
            img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop',
            tag: 'Start Now'
        },
        {
            title: 'Behavior Library',
            desc: 'Search behaviors your child shows. Understand what they mean, when they are a concern, and what to observe next.',
            border: '#ea580c',
            path: '/behaviors',
            img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80&auto=format&fit=crop',
            tag: 'Search'
        },
        {
            title: 'Action Roadmap',
            desc: 'Get personalized next steps, scripted talking points for your doctor, and guidance on what to do if dismissed.',
            border: '#a21caf',
            path: '/roadmap',
            img: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&q=80&auto=format&fit=crop',
            tag: 'Personalized'
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f9f8ff', fontFamily: 'Inter, sans-serif' }}>

            <style>{`
                .dash-card:hover .dash-card-img { transform: scale(1.04) !important; }
                .dash-card:hover { box-shadow: 0 20px 50px rgba(124,58,237,0.18) !important; transform: translateY(-4px) !important; }
                .dash-card:hover .card-arrow { transform: translateX(4px); }
                .logout-btn:hover { background: #7c3aed !important; color: white !important; }
            `}</style>

            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 12px rgba(124,58,237,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <SpectraLogo size={36} />
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#4c1d95', fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '-0.02em' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>
                        Welcome back, <strong style={{ color: '#4c1d95' }}>{user?.name}</strong>
                    </span>
                    <button className="logout-btn" onClick={handleLogout}
                        style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Hero banner */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '3.5rem 3rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            Dashboard
                        </p>
                        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '800', color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            Hello, {user?.name}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>Here's what's next for your family</p>
                    </div>
                    {!child && (
                        <button onClick={() => navigate('/add-child')}
                            style={{ padding: '0.875rem 2rem', background: 'white', color: '#7c3aed', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
                            Add Your Child
                        </button>
                    )}
                </div>
            </div>

            {/* Cards grid */}
            <div style={{ maxWidth: '1100px', margin: '3rem auto', padding: '0 2rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.5rem' }}>
                    Where would you like to go?
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '2rem' }}>
                    Select a module to get started
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem' }}>
                    {cards.map((card, i) => (
                        <div key={i} className="dash-card"
                            onClick={() => navigate(card.path)}
                            style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(124,58,237,0.08)', cursor: 'pointer', transition: 'transform 0.25s, box-shadow 0.25s', borderTop: `4px solid ${card.border}` }}>
                            <div style={{ overflow: 'hidden', height: '200px' }}>
                                <img
                                    className="dash-card-img"
                                    src={card.img}
                                    alt={card.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                />
                            </div>
                            <div style={{ padding: '1.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.2rem', fontWeight: '700', color: '#1e1b4b' }}>
                                        {card.title}
                                    </h3>
                                    <span style={{ background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '0.75rem' }}>
                                        {card.tag}
                                    </span>
                                </div>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.7' }}>
                                    {card.desc}
                                </p>
                                <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: card.border, fontWeight: '600', fontSize: '14px' }}>
                                    Go to {card.title}
                                    <ArrowRight className="card-arrow" size={16} strokeWidth={2.5} style={{ transition: 'transform 0.2s' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #e5e7eb', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <SpectraLogo size={28} />
                    <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '16px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>Not a clinical diagnostic tool. Always consult a qualified developmental pediatrician.</p>
            </div>
        </div>
    );
};

export default Dashboard;