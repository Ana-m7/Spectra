import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { NotebookPen, TrendingUp } from 'lucide-react';
import SpectraLogo from '../components/SpectraLogo';
import { addJournalEntry, getJournalHistory } from '../services/api';

const SEVERITY_COLORS = { 1: '#16a34a', 2: '#65a30d', 3: '#d97706', 4: '#ea580c', 5: '#dc2626' };

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const Journal = () => {
    const navigate = useNavigate();
    const child = JSON.parse(localStorage.getItem('child'));

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ weekOf: '', severityRating: 3, notes: '', behaviorsObserved: '' });

    const fetchHistory = async () => {
        if (!child) return;
        setLoading(true);
        try {
            const { data } = await getJournalHistory(child._id);
            setEntries(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchHistory(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.weekOf) {
            setError('Please select a week.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            await addJournalEntry({
                childId: child._id,
                weekOf: form.weekOf,
                severityRating: form.severityRating,
                notes: form.notes,
                behaviorsObserved: form.behaviorsObserved.split(',').map(s => s.trim()).filter(Boolean)
            });
            setForm({ weekOf: '', severityRating: 3, notes: '', behaviorsObserved: '' });
            await fetchHistory();
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
        setSubmitting(false);
    };

    if (!child) {
        return (
            <div style={{ minHeight: '100vh', background: '#f9f8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', textAlign: 'center', boxShadow: '0 10px 40px rgba(124,58,237,0.1)', maxWidth: '400px' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.5rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '0.75rem' }}>No child profile found</h2>
                    <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '1.5rem', lineHeight: '1.6' }}>Please add your child's profile before using the Progress Journal.</p>
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
                .journal-input:focus { border: 2px solid #7c3aed !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.1) !important; }
                .journal-submit:hover { background: #5b21b6 !important; }
                .dash-btn:hover { background: #7c3aed !important; color: white !important; }
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

            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed)', padding: '3rem', textAlign: 'center', color: 'white' }}>
                <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.5rem' }}>
                    Progress Journal
                </p>
                <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    Track {child?.name}'s progress over time
                </h2>
                <p style={{ fontSize: '15px', opacity: 0.75 }}>
                    Log weekly observations and watch the trend as you go
                </p>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '1.5rem', alignItems: 'start', marginBottom: '1.5rem' }}>

                {/* Log entry form */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(124,58,237,0.07)', borderTop: '4px solid #0891b2' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.15rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <NotebookPen size={19} color="#0891b2" />
                        Log this week's entry
                    </h3>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Week of</label>
                            <input
                                className="journal-input"
                                type="date"
                                value={form.weekOf}
                                onChange={(e) => setForm({ ...form, weekOf: e.target.value })}
                                required
                                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Severity this week</label>
                            <div style={{ display: 'flex', gap: '0.625rem' }}>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setForm({ ...form, severityRating: n })}
                                        style={{
                                            width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontWeight: '700', fontSize: '15px',
                                            border: `2px solid ${SEVERITY_COLORS[n]}`,
                                            background: form.severityRating === n ? SEVERITY_COLORS[n] : 'white',
                                            color: form.severityRating === n ? 'white' : SEVERITY_COLORS[n],
                                            transition: 'all 0.15s'
                                        }}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Behaviors observed (comma-separated)</label>
                            <input
                                className="journal-input"
                                type="text"
                                placeholder="e.g. hand flapping, limited eye contact"
                                value={form.behaviorsObserved}
                                onChange={(e) => setForm({ ...form, behaviorsObserved: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Notes</label>
                            <textarea
                                className="journal-input"
                                rows={3}
                                placeholder="Anything else you noticed this week..."
                                value={form.notes}
                                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', resize: 'vertical' }}
                            />
                        </div>

                        <button
                            className="journal-submit"
                            type="submit"
                            disabled={submitting}
                            style={{ width: '100%', padding: '0.875rem', background: '#0891b2', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
                            {submitting ? 'Saving...' : 'Save Entry'}
                        </button>
                    </form>
                </div>

                {/* Trend chart */}
                <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(124,58,237,0.07)', borderTop: '4px solid #7c3aed' }}>
                    <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.15rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={19} color="#7c3aed" />
                        Trend over time
                    </h3>
                    {entries.length === 0 ? (
                        <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '2rem 0' }}>
                            Log your first entry to start seeing a trend here.
                        </p>
                    ) : (
                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={entries}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="weekOf" tickFormatter={formatDate} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <YAxis domain={[1, 5]} allowDecimals={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip labelFormatter={formatDate} />
                                <Line type="monotone" dataKey="severityRating" stroke="#7c3aed" strokeWidth={3} dot={{ fill: '#ec4899', r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>

                </div>

                {/* History list */}
                {!loading && entries.length > 0 && (
                    <div>
                        <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1.05rem', fontWeight: '700', color: '#1e1b4b', marginBottom: '1rem' }}>
                            Past entries
                        </h3>
                        {[...entries].reverse().map((entry) => (
                            <div key={entry._id} style={{ background: 'white', borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '0.75rem', boxShadow: '0 2px 12px rgba(124,58,237,0.06)', borderLeft: `4px solid ${SEVERITY_COLORS[entry.severityRating]}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '700', color: '#1e1b4b', fontSize: '14px' }}>{formatDate(entry.weekOf)}</span>
                                    <span style={{ background: `${SEVERITY_COLORS[entry.severityRating]}15`, color: SEVERITY_COLORS[entry.severityRating], padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>
                                        Severity {entry.severityRating}/5
                                    </span>
                                </div>
                                {entry.behaviorsObserved?.length > 0 && (
                                    <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '0.25rem' }}>
                                        {entry.behaviorsObserved.join(', ')}
                                    </p>
                                )}
                                {entry.notes && (
                                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>{entry.notes}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Journal;
