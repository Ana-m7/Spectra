const JournalEntry = require('../models/JournalEntry');

exports.createEntry = async (req, res) => {
    try {
        const { childId, weekOf, behaviorsObserved, severityRating, notes } = req.body;

        if (!childId || !weekOf || severityRating === undefined) {
            return res.status(400).json({ message: 'childId, weekOf, and severityRating are required' });
        }

        const entry = await JournalEntry.create({
            childId,
            userId: req.user.userId,
            weekOf,
            behaviorsObserved: behaviorsObserved || [],
            severityRating,
            notes
        });
        res.status(201).json(entry);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const { childId } = req.params;
        const entries = await JournalEntry.find({ childId }).sort({ weekOf: 1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
