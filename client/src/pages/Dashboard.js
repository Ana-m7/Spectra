import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const child = JSON.parse(localStorage.getItem('child'));

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cards = [
        { emoji: '📖', title: 'Awareness Hub', desc: 'Learn what autism is, signs by age, myths vs facts', color: '#f5f3ff', border: '#7c3aed', path: '/awareness' },
        { emoji: '🔍', title: 'Screening', desc: 'Take the age-gated behavioral screening for your child', color: '#f0fdf4', border: '#16a34a', path: '/screening' },
        { emoji: '📚', title: 'Behavior Library', desc: 'Search and understand specific behaviors', color: '#fff7ed', border: '#ea580c', path: '/behaviors' },
        { emoji: '🗺️', title: 'Action Roadmap', desc: 'Get personalized next steps and resources', color: '#fdf4ff', border: '#a21caf', path: '/roadmap' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f5f3ff' }}>
            {/* Navbar */}
            <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(109,40,217,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🧩</div>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#4c1d95' }}>Spectra</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>Welcome, <strong style={{ color: '#4c1d95' }}>{user?.name}</strong></span>
                    <button onClick={handleLogout}
                        style={{ padding: '0.5rem 1.25rem', background: 'transparent', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
                        Logout
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <p style={{ fontSize: '16px', opacity: '0.9' }}>
               {child ? `Viewing for ${child.name} · Age band: ${child.ageBand}` : 'Add your child to get started'}
           </p>

            {/* Cards */}
            <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {cards.map((card, i) => (
                    <div key={i} onClick={() => navigate(card.path)}
                        style={{ background: card.color, border: `2px solid ${card.border}`, borderRadius: '16px', padding: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s', }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ fontSize: '32px', marginBottom: '0.75rem' }}>{card.emoji}</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>{card.title}</h3>
                        <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{card.desc}</p>
                    </div>
                ))}
            </div>
            {!child && (
             <div style={{ textAlign: 'center', marginTop: '1rem' }}>
             <button onClick={() => navigate('/add-child')}
            style={{ padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            + Add your child
        </button>
    </div>
)}
        </div>
    );
};

export default Dashboard;